import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ChatSession from '../models/ChatSession';
import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios'
import { log } from 'console';
dotenv.config();

// Extend Request type to include userId
declare module 'express' {
  interface Request {
    userId?: string;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error: any) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Placeholder function to generate assistant response
async function generateResponse(question: string): Promise<string>  {
  const ans = await  axios.post('http://183.82.62.137:8000/query',{
      "query": question,
      "zilliz_api_key": process.env.ZILLIZ_API,
      "gemini_api_key": process.env.GEMINI_API
  
  })
  return ans.data.response;
}

const router = express.Router();

// Verify Token Route
router.get('/verify-token', authMiddleware, (req: Request, res: Response) => {
  res.json({ valid: true });
});

// Get Chat Sessions Route
router.get('/chat-sessions', authMiddleware, async (req: Request, res: Response) => {
  try {
    const sessions = await ChatSession.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat sessions' });
  }
});

// Create New Chat Session Route
router.post('/chat-sessions/ask', authMiddleware, async (req: Request, res: Response) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }
  try {
    const title = question.slice(0, 30);
    const newSession = new ChatSession({
      userId: req.userId,
      title,
      conversation: [{ role: 'user', message: question }],
    });
    const response = await generateResponse(question);
    newSession.conversation.push({ role: 'assistant', message: response });
    await newSession.save();
    res.json(newSession);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat session' });
  }
});

// Add Question to Existing Chat Session Route
router.post('/chat-sessions/:id/ask', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }
  try {
    const session = await ChatSession.findOne({ _id: id, userId: req.userId });
    if (!session) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    session.conversation.push({ role: 'user', message: question });
    const response = await generateResponse(question);
    session.conversation.push({ role: 'assistant', message: response });
    session.updatedAt = new Date();
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error updating chat session' });
  }
});
// Rename Chat Session
router.put('/chat-sessions/:id/rename', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { newTitle } = req.body;
  try {
    const session = await ChatSession.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title: newTitle },
      { new: true }
    );
    if (!session) {
      return res.status(404).json({ message: 'Session not found or not authorized' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error renaming session' });
  }
});

// Delete Chat Session
router.delete('/chat-sessions/:id', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await ChatSession.findOneAndDelete({ _id: id, userId: req.userId });
    if (!result) {
      return res.status(404).json({ message: 'Session not found or not authorized' });
    }
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting session' });
  }
});
// Create a new empty chat session
router.post('/chat-sessions', authMiddleware, async (req: Request, res: Response) => {
  try {
    const newSession = new ChatSession({
      userId: req.userId,
      title: 'New Chat',
      conversation: [],
    });
    await newSession.save();
    res.json(newSession);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat session' });
  }
});

// Existing route to create a session with an initial question
router.post('/chat-sessions/ask', authMiddleware, async (req: Request, res: Response) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }
  try {
    const newSession = new ChatSession({
      userId: req.userId,
      title: question.slice(0, 30),
      conversation: [{ question, response: 'Sample response' }], // Replace with actual response logic
    });
    await newSession.save();
    res.json(newSession);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat session' });
  }
});

// Add a question to an existing session
router.post('/chat-sessions/:id/ask', authMiddleware, async (req: Request, res: Response) => {
  const { question } = req.body;
  const { id } = req.params;
  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }
  try {
    const session = await ChatSession.findById(id);
    if (!session || session.userId.toString() !== req.userId) {
      return res.status(404).json({ message: 'Session not found' });
    }
    session.conversation.push({ question, response: 'Sample response' }); // Replace with actual response logic
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error updating chat session' });
  }
});

export default router;
import { PrismaClient, Users, Sessions, SessionChat } from '../../generated/prisma';

const client = new PrismaClient();

interface UserInput {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

async function createUser(user: UserInput): Promise<Users> {
  try {
    return await client.users.create({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
      },
    });
  } catch (error : any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

async function checkUserExists(username: string): Promise<boolean> {
  try {
    const user = await client.users.findUnique({
      where: { username },
    });
    return !!user;
  } catch (error :any) {
    throw new Error(`Failed to check user: ${error.message}`);
  }
}

async function getSessionTitlesByUser(userId: bigint): Promise<string[]> {
  try {
    const sessions = await client.sessions.findMany({
      where: { userId },
      select: { Title: true },
      orderBy: { TimeStamp: 'desc' },
    });
    return sessions.map(session => session.Title);
  } catch (error : any) {
    throw new Error(`Failed to fetch session titles: ${error.message}`);
  }
}
interface ChatEntry {
  question: string;
  answer: string;
}
async function getSessionChats(sessionId: bigint): Promise<ChatEntry[]> {
  try {
    const chats = await client.sessionChat.findMany({
      where: { Sid: sessionId },
      select: {
        Question: true,
        Answer: true,
      },
      orderBy : {TimeStamp : 'asc'}
    });
    return chats.map(chat => ({
      question: chat.Question,
      answer: chat.Answer,
    }));
  } catch (error :any) {
    throw new Error(`Failed to fetch session chats: ${error.message}`);
  }
}

export { client, createUser, checkUserExists, getSessionTitlesByUser, getSessionChats };
export type { UserInput, ChatEntry };
import { Schema, model } from 'mongoose';

const chatSessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  conversation: [
    {
      role: { type: String, enum: ['user', 'assistant'], required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update updatedAt on save
chatSessionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default model('ChatSession', chatSessionSchema);
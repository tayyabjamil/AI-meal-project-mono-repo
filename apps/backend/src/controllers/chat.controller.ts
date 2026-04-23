import { Request, Response } from 'express';
import { chatService } from '../services/chat.service';

export const sendMessage = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ success: false, message: 'message is required' });
    return;
  }

  const reply = await chatService.getAIResponse(message);
  res.json({ success: true, data: { reply } });
};

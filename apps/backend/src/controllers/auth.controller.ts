import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }

  // TODO: replace with real DB lookup + JWT
  res.json({
    success: true,
    data: {
      token: 'mock-jwt-token',
      user: { id: '1', name: 'Alex Johnson', email },
    },
  });
};

export const signup = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: 'Name, email and password are required' });
    return;
  }

  // TODO: replace with real user creation
  res.status(201).json({
    success: true,
    data: {
      token: 'mock-jwt-token',
      user: { id: '2', name, email },
    },
  });
};

export const forgotPassword = (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: 'Email is required' });
    return;
  }

  // TODO: send real reset email
  res.json({ success: true, message: `Reset link sent to ${email}` });
};

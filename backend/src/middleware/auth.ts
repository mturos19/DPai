import { Request, Response, NextFunction } from 'express';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement real authentication
  // For now, attach a dummy user
  req.user = { id: 'dummy-user-id' } as any;
  next();
}; 
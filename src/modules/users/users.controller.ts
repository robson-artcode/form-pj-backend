import UserService from './users.service';
import { Request, Response } from 'express';

class UsersController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = await UserService.createUser(data);
      return res.status(201).json(user);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new UsersController();

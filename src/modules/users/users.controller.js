import UserService from './users.service.js';

class UsersController {
  async create(req, res) {
    try {
      const data = req.body;
      const user = await UserService.createUser(data);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UsersController();

const UserService = require('../services/UserService.js');

const userService  = new UserService();

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await userService.store({ name, email, password });

      res.status(201).send(user);
    } catch(err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = UserController;
const UserService = require('../services/UserService.js');

const userService  = new UserService();

class UserController {
  static async store(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await userService.store({ name, email, password });

      res.status(201).send(user);
    } catch(err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async index(req, res) {
    try {
      const users = await userService.index();

      res.status(200).send(users);
    } catch(err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await userService.update({
        id,
        name,
        email,
        password,
      });

      res.status(200).send(user);
    } catch(err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.show({ id });

      res.status(200).send(user);
    } catch(err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await userService.delete({ id });

      res.status(204).send('User succesful deleted');
    } catch(err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = UserController;
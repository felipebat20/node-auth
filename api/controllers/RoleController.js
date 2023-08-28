const roleService = require('../services/RoleService');

class RoleController {
  static async store(req, res) {
    const { name, description } = req.body;

    try {
      const new_role = await roleService.createNewRole({ name, description });

      res.status(201).send(new_role);
    } catch (err) {
      res.status(err.status || 400).send({
        status: 'FAILED',
        data: {
          error: err.message || err,
        }
      });
    }
  }
}

module.exports = RoleController;
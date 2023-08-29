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

  static async index(req, res) {
    try {
      const roles = await roleService.getAllRoles();

      res.status(200).send(roles);
    } catch (err) {
      res.status(err.status || 400).send({
        status: 'FAILED',
        data: {
          error: err.message || err,
        }
      });
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const role = await roleService.getOneRole({ id });

      res.status(200).send(role);
    } catch (err) {
      res.status(err.status || 400).send({
        status: 'FAILED',
        data: {
          error: err.message || err,
        }
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const role = await roleService.updateRole({ id, name, description });

      res.status(200).send(role);
    } catch (err) {
      res.status(err.status || 400).send({
        status: 'FAILED',
        data: {
          error: err.message || err,
        }
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const role = await roleService.deleteRole({ id });

      res.status(200).send(role);
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
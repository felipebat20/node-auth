const { createPermission } = require('../services/PermissionService')

class PermissionController {
  static async store(req, res) {
    const { name, description } = req.body;

    try {
      const permission = await createPermission({ name, description });

      res.status(201).send(permission);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = PermissionController;

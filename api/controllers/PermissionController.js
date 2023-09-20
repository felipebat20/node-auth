const {
  createPermission,
  findAllPermissions,
  findPermissionById,
  deletePermission,
  updatePermission,
} = require('../services/PermissionService')

class PermissionController {
  static async store(req, res) {
    const { name, description } = req.body;

    try {
      const permission = await createPermission({ name, description });

      res.status(201).send(permission);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async index(req, res) {
    try {
      const permission = await findAllPermissions();

      res.status(201).send(permission);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async show(req, res) {
    const { id: permission_id } = req.params;

    console.log(permission_id);
    try {
      const permission = await findPermissionById({ id: permission_id });

      res.status(201).send(permission);
    } catch (err) {
      res.status(404).send(err.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const permission = await updatePermission({
        id,
        name,
        description,
      });

      res.status(200).send(permission);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      await deletePermission({ id });

      res.status(204).send();
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = PermissionController;

const SecurityService = require('../services/SecurityService');

class SecurityController {
  async store(req, res) {
    const { roles, permissions } = req.body;
    const { userId } = req;

    try {
      const acl = await SecurityService.createAcl({ roles, permissions, userId });

      res.status(201).send(acl);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  async storeRolePermissions(req, res) {
    const { roleId, permissions } = req.body;

    try {
      const rolePermissions = await SecurityService.createRolePermissions({ roleId, permissions });

      res.status(201).send(rolePermissions);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = new SecurityController();
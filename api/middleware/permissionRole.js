const db = require('../models');
const Sequelize = require('sequelize')

const permissionRoles = (permissions) => {
  return async (req, res, next) => {
    const { userId } = req;

    const user = await db.users.findOne({
      where: { id: userId },
      include: [
        {
          model: db.roles,
          as: 'user_role',
          attibutes: ['id', 'name'],
        },
      ],
    });

    if (! user) {
      return res.status(401).send({ message: 'unauthenticated' });
    }

    let listaRoleId = [];

    Object.values(user.user_role).map(role => listaRoleId.push(role.id));

    if (listaRoleId.length === 0) {
      return res.status(403).send({ message: 'unauthorized' });
    }

    const roles = await db.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: listaRoleId,
        }
      },
      include: [
        {
          model: db.permissions,
          as: 'role_permissions',
          attributes: ['id', 'name'],
        }
      ],
    });

    let hasPermission = false;

    roles.map(role => {
      hasPermission = role.role_permissions
        .map(permission => permission.name)
        .some(permission => permissions.includes(permission));
    });

    if (! hasPermission) {
      return res.status(403).send({ message: 'unauthorized' });
    }

    return next();
  }
}

module.exports = permissionRoles;
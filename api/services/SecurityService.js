const Sequelize = require('sequelize');

const db = require('../models');

class SecurityService {
  async createAcl(dto) {
    const user = await db.users.findOne({
      include: [
        {
          model: db.roles,
          as: 'user_role',
          attributes: ['id', 'name', 'description'],
        },
        {
          model: db.permissions,
          as: 'user_permission',
          attributes: ['id', 'name', 'description'],
        }
      ],
      where: { id: dto.userId },
    });

    if (! user) {
      throw new Error('User not found');
    }

    const roles = await db.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles,
        },
      },
    });

    const permissions = await db.permissions.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissions,
        },
      },
    });

    await user.removeUser_role(user.user_roles);
    await user.removeUser_permission(user.user_permissions);

    await user.addUser_role(roles);
    await user.addUser_permission(permissions);

    const new_user = await db.users.findOne({
      include: [
        {
          model: db.roles,
          as: 'user_role',
          attributes: ['id', 'name', 'description'],
        },
        {
          model: db.permissions,
          as: 'user_permission',
          attributes: ['id', 'name', 'description'],
        }
      ],
      where: { id: dto.userId },
    });

    return new_user;
  }

  async createRolePermissions(dto) {
    const { roleId, permissions } = dto;

    const role = await db.roles.findOne({
      where: { id: roleId },
      as: 'role_permissions',
      attributes: ['id', 'name', 'description'],
    });

    if (! role) {
      throw new Error('Role not found');
    }

    const permissionsRegistered = await db.permissions.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissions,
        },
      },
    });

    await role.removeRole_permissions(role.role_permissions);

    await role.addRole_permissions(permissionsRegistered);

    const new_role = await db.roles.findOne({
      include: [
        {
          model: db.permissions,
          as: 'role_permissions',
          attributes: ['id', 'name', 'description'],
        }
      ],
      where: { id: roleId },
    });


    return new_role;
  }
}

module.exports = new SecurityService();
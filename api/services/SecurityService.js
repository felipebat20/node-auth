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

    return user;
  }
}

module.exports = new SecurityService();
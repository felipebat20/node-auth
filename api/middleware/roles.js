const db = require('../models');

const roles = (roles) => {
  return async (req, res, next) => {
    const { userId } = req;

    const user = await db.users.findOne({
      where: { id: userId },
      include: [
        {
          model: db.roles,
          as: 'user_role',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (! user) {
      return res.status(401).send({ message: 'unauthenticated'})
    }

    const registeredRoles = user.user_role.map((role) => role.name).some(role => roles.includes(role));

    if (! registeredRoles) {
      return res.status(401).send({ message: 'User cannot access this role' });
    }

    return next();
  }
}

module.exports = roles;
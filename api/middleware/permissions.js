const db = require("../models");

const permissions = (permissions) => {
  return async (req, res, next) => {
    const { userId } = req;

    const user = await db.users.findOne({
      where: { id: userId },
      include: [
        {
          model: db.permissions,
          as: 'user_permission',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (! user) {
      return res.status(401).send({ message: 'unauthenticated' });
    }

    const registeredPermissions = user.user_permission
      .map((permission) => permission.name)
      .some((permission) => permissions.includes(permission));

    console.log(registeredPermissions);
    if (! registeredPermissions) {
      return res.status(403).send({ message: 'unauthorized' });
    }

    return next();
  }
}

module.exports = permissions;
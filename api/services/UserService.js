const db = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UserService {
  async store(dto) {
    const user = await db.users.findOne({
      where: { email: dto.email },
    });

    if (user) {
      throw new Error('This email has been taken');
    }

    try {
      const hash_password = await hash(dto.password, 8);

      const new_user = await db.users.create({
        id: uuid.v4(),
        name: dto.name,
        email: dto.email,
        password: hash_password,
      });

      return new_user;
    } catch (err) {
      throw new Error('Error on register user');
    }
  }

  async update({ id, name = '', email = '', password = '' }) {
    const user = await db.users.findOne({
      where: { id },
    });

    if (! user) {
      throw new Error('User not found');
    }

    try {
      if (name) {
        user.name = name;
      }

      if (email) {
        user.email = email;
      }

      if (password) {
        const hash_password = await hash(password, 8);
        user.password = hash_password;
      }

      await user.save();

      return await user.reload();
    } catch (err) {
      throw new Error('Error on register user');
    }
  }

  async index(dto) {
    const users = await db.users.findAll({
      include: [
        {
          model: db.roles,
          as: 'user_role',
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
        {
          model: db.permissions,
          as: 'user_permission',
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
      ],
    });

    return users;
  }

  async show({ id }) {
    const user = await db.users.findOne({
      where: { id },
      include: [
        {
          model: db.roles,
          as: 'user_role',
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
        {
          model: db.permissions,
          as: 'user_permission',
          attributes: ['id', 'name', 'description'],
          through: { attributes: [] },
        },
      ],
    });

    if (! user) {
      throw new Error('User not found');
    }

    return user;
  }

  async delete({ id }) {
    const user = await db.users.findOne({
      where: { id },
    });

    if (! user) {
      throw new Error('This email has been taken');
    }

    try {
      await db.users.destroy({ where: { id } });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = UserService;
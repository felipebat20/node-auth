require('dotenv/config');
const db = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class AuthService {
  async login(dto) {
    const user = await db.users.findOne({
      attibutes: ['id', 'email', 'password'],
      where: {
        email: dto.email,
      },
    });

    if (! user) {
      throw new Error('User not found');
    }

    const sameAs = await compare(dto.password, user.password);

    if (! sameAs) {
      throw new Error('Invalid password or email');
    }

    const accessToken = sign({
      id: user.id,
      email: user.email,
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400,
    });

    return { accessToken };
  }
}

module.exports = AuthService;
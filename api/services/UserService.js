const { database } = require('pg/lib/defaults');
const db = require('../models');

class UserService {
  async store(dto) {
    const user = await database.users.findOne({
      where: { email: dto.email },
    });

    if (user) {
      throw new Error('This email has been taken');
    }
  }
}

module.exports = UserService;
const { v4 } = require('uuid');

const db = require('../models');

const createPermission = async (dto) => {
	try {
		const permission = await db.permissions.create({
			id: v4(),
			name: dto.name,
			description: dto.description,
		});

		return permission;
	} catch (err) {
		throw new Error('Cannot create permission right now');
	}
}

module.exports = {
	createPermission,
};

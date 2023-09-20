const { v4 } = require('uuid');

const db = require('../models');

const createPermission = async (dto) => {
	try {
		const { name } = dto;

		const found_permission = await db.permissions.findOne({ where: { name } });

		if (found_permission) {
			throw new Error('Permission has been registered');
		}

		const permission = await db.permissions.create({
			id: v4(),
			name: dto.name,
			description: dto.description,
		});

		return permission;
	} catch (err) {
		throw new Error('Cannot create permission right now');
	}
};

const findAllPermissions = async(dto) => {
	const permissions = await db.permissions.findAll();

	return permissions;
}

const findPermissionById = async(dto) => {
	const { id } = dto;

	const permission = await db.permissions.findOne({ where: { id } });

	return permission;
}

const deletePermission = async(dto) => {
	const { id } = dto;
	const permission = await db.permissions.findOne({ where: { id } });

	if (! permission) {
		throw new Error('Permission not found');
	}

	try {
		await db.permissions.destroy({ where: { id } });
	} catch(err) {
		throw err;
	}
}

const updatePermission = async(dto) => {
	const { id } = dto;
	const permission = await db.permissions.findOne({ where: { id } });

	if (! permission) {
		throw new Error('Permission not found');
	}

	try {
		permission.name = dto.name;
		permission.description = dto.description;
		await permission.save();

		return await permission.reload();
	} catch (err) {
		throw err;
	}
}

module.exports = {
	createPermission,
	findAllPermissions,
	findPermissionById,
	deletePermission,
	updatePermission,
};

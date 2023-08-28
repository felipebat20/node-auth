const db = require("../models");
const uuid = 'uuid';

const createNewRole = async (dto) => {
  const role = db.roles.findOne({ where: { name: dto.name }});

  if (role) {
    throw new Error('Role has been registered!');
  }

  try {
    const new_role = await db.roles.create({
      id: uuid.v4(),
      name: dto.name,
      description: dto.description,
    });

    return new_role;
  } catch (err) {
    throw new Error('Error on register new role');
  }

  return new_role;
}

const getAllRoles = async (dto) => {
  const roles = await db.roles.findAll();

  return roles;
}

const getOneRole = async (dto) => {
  const { id } = dto;

  const role = await db.roles.findOne({ where: { id } });

  if (! role) {
    throw new Error('Role not found');
  }

  return role;
}

const updateRole = async (dto) => {
  const { id, name, description } = dto;

  const role = await db.roles.findOne({ where: { id } });

  if (! role) {
    throw new Error('Role not found');
  }

  if (name) {
    role.name = name;
  }

  if (description) {
    role.description = description;
  }

  await role.save();

  return await role.reload();
}

const deleteRole = async (dto) => {
  const { id } = dto;

  const role = await db.roles.findOne({ where: { id } });

  if (! role) {
    throw new Error('Role not found');
  }

  try {
    await db.roles.destroy({ where: { id } });
  } catch (err) {
    throw new Error(err.message);
  }

  return role;
}

module.exports = {
  createNewRole,
  getAllRoles,
  getOneRole,
  updateRole,
  deleteRole,
};
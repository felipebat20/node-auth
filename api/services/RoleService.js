const db = require("../models");

const createNewRole = async (new_role) => {
  const role = await db.roles.create({
    name: new_role.name,
    description: new_role.description,
  });

  return role;
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
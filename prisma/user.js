import prisma from "./prisma";

export const getAllUser = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async (email, name, birthYear) => {
  return await prisma.user.create({
    data: {
      email,
      name,
      birthYear,
    },
  });
};

export const updateUser = async (id, updateData) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: updateData,
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

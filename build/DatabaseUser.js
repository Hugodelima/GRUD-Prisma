"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByEmail = exports.login = exports.searchByName = exports.listAllUsers = exports.getUserById = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const fecharBanco = async () => {
    await prisma.$disconnect();
};
async function createUser(user) {
    const userIns = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
    });
    await fecharBanco();
    return userIns.id;
}
exports.createUser = createUser;
async function getUserById(userId) {
    const getUser = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    await fecharBanco();
    if (getUser) {
        return getUser;
    }
    else {
        return null;
    }
}
exports.getUserById = getUserById;
async function updateUser(user) {
    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
    });
    await fecharBanco();
}
exports.updateUser = updateUser;
async function deleteUser(userId) {
    await prisma.user.delete({
        where: {
            id: userId,
        },
    });
    await fecharBanco();
}
exports.deleteUser = deleteUser;
async function listAllUsers() {
    const users = await prisma.user.findMany();
    await fecharBanco();
    return users;
}
exports.listAllUsers = listAllUsers;
async function searchByName(nameToSerch) {
    const userList = await prisma.user.findMany({
        where: {
            name: {
                startsWith: nameToSerch
            }
        }
    });
    await fecharBanco();
    if (userList.length > 0) {
        return userList;
    }
    else {
        return null;
    }
}
exports.searchByName = searchByName;
async function login(email_login, password_login) {
    const user = await prisma.user.findUnique({
        where: {
            email: email_login,
            password: password_login,
        },
    });
    await fecharBanco();
    if (user) {
        return user;
    }
    else {
        return null;
    }
}
exports.login = login;
async function searchByEmail(email_login) {
    const getUser = await prisma.user.findUnique({
        where: {
            email: email_login
        }
    });
    await fecharBanco();
    return getUser;
}
exports.searchByEmail = searchByEmail;

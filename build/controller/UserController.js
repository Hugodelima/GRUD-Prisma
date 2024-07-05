"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const DatabaseUser_1 = require("../DatabaseUser");
class UserController {
    static async cadastrarUsuario(user) {
        const idInsercao = await (0, DatabaseUser_1.createUser)(user);
        return idInsercao;
    }
    static async listarTodosUsuarios() {
        const users = await (0, DatabaseUser_1.listAllUsers)();
        return users;
    }
    static async buscarUsuarioPorId(id) {
        const user = await (0, DatabaseUser_1.getUserById)(id);
        return user;
    }
    static async atualizarUsuario(user, nome, email, senha) {
        user.name = nome;
        user.email = email;
        user.password = senha;
        await (0, DatabaseUser_1.updateUser)(user);
    }
    static async excluirUsuario(id) {
        await (0, DatabaseUser_1.deleteUser)(id);
    }
    static async buscarPeloNome(nomeParaProcurar) {
        const arrayDeUsers = await (0, DatabaseUser_1.searchByName)(nomeParaProcurar);
        return arrayDeUsers;
    }
    static async efetuarLogin(email, password) {
        const usuario = await (0, DatabaseUser_1.login)(email, password);
        return usuario;
    }
    static async buscarUsuarioPeloEmail(email) {
        const usuario = await (0, DatabaseUser_1.searchByEmail)(email);
        return usuario;
    }
}
exports.UserController = UserController;

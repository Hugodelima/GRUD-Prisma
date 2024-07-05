"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = void 0;
const readLineSync = __importStar(require("readline-sync"));
const UserController_1 = require("../controller/UserController");
const ServiceView_1 = require("./ServiceView");
const ServiceController_1 = require("../controller/ServiceController");
class UserView {
    static async menuUsuario() {
        let op = '0';
        while (true) {
            console.log("0 - Opção de sair");
            console.log("1 - Cadastrar Usuário");
            console.log("2 - Listar Usuários");
            console.log("3 - Buscar Usuário");
            console.log("4 - Atualizar Usuário");
            console.log("5 - Excluir Usuário");
            console.log("6 - Buscar pelo nome");
            console.log("7 - Efetuar Autenticação");
            op = readLineSync.question(">>");
            switch (op) {
                case '0':
                    return;
                case '1':
                    const newUser = this.cadastrarView();
                    const usuarioJaTemEmail = await UserController_1.UserController.buscarUsuarioPeloEmail(newUser.email);
                    if (usuarioJaTemEmail) {
                        console.log("Já tem usuário cadastrado no banco com este e-mail");
                    }
                    else {
                        const newUserId = await UserController_1.UserController.cadastrarUsuario(newUser);
                        console.log(`Novo usuário criado com ID: ${newUserId}`);
                    }
                    break;
                case '2':
                    const usuarios = await UserController_1.UserController.listarTodosUsuarios();
                    this.listagemView(usuarios);
                    break;
                case '3':
                    const id = this.buscarUsuarioView(); //retornar o id
                    const usuario = await UserController_1.UserController.buscarUsuarioPorId(id); //busca o usuario[]
                    if (usuario) {
                        this.listagemView(usuario);
                    }
                    else {
                        console.log("Não foi encontrado usuário com este id");
                    }
                    break;
                case '4':
                    const id_atualizar = this.buscarUsuarioView(); //retornar o id
                    const usuario_atualizar = await UserController_1.UserController.buscarUsuarioPorId(id_atualizar); //busca o usuario
                    if (usuario_atualizar) {
                        const dadosAtuais = this.atualizarUsuarioView(); // solicitar os novos dados
                        const nome = dadosAtuais[0];
                        const email = dadosAtuais[1];
                        const senha = dadosAtuais[2];
                        const usuarioComEsteEmail = await UserController_1.UserController.buscarUsuarioPeloEmail(email);
                        if (usuarioComEsteEmail) {
                            console.log("Já tem usuário cadastrado no banco com este e-mail");
                        }
                        else {
                            await UserController_1.UserController.atualizarUsuario(usuario_atualizar, nome, email, senha); // atualiza o banco
                            console.log("Usuário atualizado com sucesso");
                        }
                    }
                    else {
                        console.log("não foi encontrado usuário com este id");
                    }
                    break;
                case '5': //------------------------------------------------------------------
                    const id_excluir = this.buscarUsuarioView(); //retornar o id
                    const usuario_excluir = await UserController_1.UserController.buscarUsuarioPorId(id_excluir); //busca o usuario
                    if (usuario_excluir) {
                        const validarRelacionamento = await ServiceController_1.ServiceController.listarTodosAtendimentos(id_excluir);
                        if (validarRelacionamento.length > 0) {
                            await this.removerRelacionamentoAtendimento(id_excluir);
                        }
                        else {
                            await UserController_1.UserController.excluirUsuario(id_excluir);
                            console.log("Usuário excluindo com sucesso");
                        }
                    }
                    else {
                        console.log("não foi encontrado usuário com este id");
                    }
                    break;
                case '6':
                    const nome_buscarPeloNome = this.buscarPeloNomeView();
                    const arrayDeUsers = await UserController_1.UserController.buscarPeloNome(nome_buscarPeloNome);
                    if (arrayDeUsers) {
                        this.listagemView(arrayDeUsers);
                    }
                    else {
                        console.log("Não foi encontrado pelo nome");
                    }
                    break;
                case '7':
                    const arrayDoInput = this.solicitarLoginView();
                    const email_login = arrayDoInput[0];
                    const senha_login = arrayDoInput[1];
                    const usuarioLogin = await UserController_1.UserController.efetuarLogin(email_login, senha_login);
                    const usuarioComEsteEmailLogin = await UserController_1.UserController.buscarUsuarioPeloEmail(email_login);
                    if (usuarioLogin) {
                        console.log("usuário autenticado, Indo para o menu atendimento...");
                        return ServiceView_1.AtendimentoView.menuAtendimento(usuarioLogin.id);
                    }
                    else if (usuarioComEsteEmailLogin) {
                        console.log("Dados não conferem");
                    }
                    else {
                        console.log("Email não existe");
                    }
                    break;
                case '8':
                    console.log("Saindo...");
                    return;
            }
        }
    }
    static listagemView(users) {
        console.table(users);
    }
    static cadastrarView() {
        const nome = readLineSync.question('Entre com o nome:');
        const email = readLineSync.question('Entre com o email:');
        const senha = readLineSync.question('Entre com a senha:');
        const newUser = { id: 0, name: nome, email: email, password: senha };
        return newUser;
    }
    static buscarUsuarioView() {
        const id = parseInt(readLineSync.question("Qual ID do usuário? "));
        return id;
    }
    static atualizarUsuarioView() {
        const nome = (readLineSync.question("Qual vai ser o novo nome? "));
        const email = (readLineSync.question("Qual vai ser o novo e-mail? "));
        const senha = (readLineSync.question("Qual vai ser a nova senha? "));
        return [nome, email, senha];
    }
    static buscarPeloNomeView() {
        const nome = (readLineSync.question("Qual vai ser o  nome? "));
        return nome;
    }
    static solicitarLoginView() {
        const email = (readLineSync.question("Qual é o e-mail? "));
        const senha = (readLineSync.question("Qual é a senha? "));
        return [email, senha];
    }
    static async removerRelacionamentoAtendimento(id) {
        const validarExclusao = (readLineSync.question("Foi identificado que este usuário tem atendimentos cadastrados, deseja excluir todos? (Y/N): "));
        if (validarExclusao === 'Y') {
            await ServiceController_1.ServiceController.removerAtendimentosDoUsuario(id);
            await UserController_1.UserController.excluirUsuario(id);
            console.log("Excluido o relacionamento e usuário com sucesso");
        }
        else if (validarExclusao === 'N') {
            return;
        }
        else {
            console.log("Tente novamente");
        }
    }
}
exports.UserView = UserView;

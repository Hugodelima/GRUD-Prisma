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
exports.AtendimentoView = void 0;
const readLineSync = __importStar(require("readline-sync"));
const ServiceController_1 = require("../controller/ServiceController");
const UserView_1 = require("../view/UserView");
class AtendimentoView {
    static async menuAtendimento(id_usuario) {
        let op = '0';
        while (true) {
            console.log("0 - Opção de sair");
            console.log("1 - Cadastrar Atendimento");
            console.log("2 - Listar Atendimentos");
            console.log("3 - Atualizar Atendimento");
            console.log("4 - Remover Atendimento");
            op = readLineSync.question(">>");
            switch (op) {
                case '0':
                    return UserView_1.UserView.menuUsuario();
                case '1':
                    const newService = this.cadastrarAtendimentoView(id_usuario);
                    const newServiceId = await ServiceController_1.ServiceController.cadastrarAtendimento(newService);
                    console.log(`Novo atendimento criado com ID: ${newServiceId}`);
                    break;
                case '2':
                    const atendimentos = await ServiceController_1.ServiceController.listarTodosAtendimentos(id_usuario);
                    this.listagemView(atendimentos);
                    break;
                case '3':
                    const id_atualizar = this.buscarAtendimentoView(); //retornar o id
                    const atendimento_atualizar = await ServiceController_1.ServiceController.buscarAtendimentoPorId(id_atualizar, id_usuario); //busca o usuario
                    if (atendimento_atualizar) {
                        const dadosAtuais = this.atualizarAtendimentoView(); // solicitar os novos dados
                        const nomeCliente = dadosAtuais[0];
                        const nomeEmpresa = dadosAtuais[1];
                        const descricao = dadosAtuais[2];
                        const status = dadosAtuais[3];
                        const data = dadosAtuais[4];
                        await ServiceController_1.ServiceController.atualizarAtendimento(atendimento_atualizar, nomeCliente, nomeEmpresa, descricao, data, status); // atualiza o banco
                    }
                    else {
                        console.log("Não foi encontrado atendimento");
                    }
                    break;
                case '4':
                    const id_excluir = this.buscarAtendimentoView(); //retornar o id
                    const atendimento_excluir = await ServiceController_1.ServiceController.buscarAtendimentoPorId(id_excluir, id_usuario);
                    if (atendimento_excluir) {
                        await ServiceController_1.ServiceController.removerAtendimento(id_excluir);
                        console.log("Atendimento excluindo com sucesso");
                    }
                    else {
                        console.log("não existe atendimento com este id");
                    }
                    break;
            }
        }
    }
    static listagemView(services) {
        console.table(services);
    }
    static cadastrarAtendimentoView(id_usuario) {
        const nomeCliente = readLineSync.question('Entre com o nome do cliente: ');
        const nomeEmpresa = readLineSync.question('Entre com o nome da empresa: ');
        const descricao = readLineSync.question('Informe a descrição do atendimento: ');
        const status = readLineSync.question('Informe o status do atendimento: ');
        const data = readLineSync.question("Informa a data do atendimento (DD/MM/YYYY): ");
        const newService = { customer_name: nomeCliente, company_name: nomeEmpresa, description: descricao, date: data, status: status, users_id: id_usuario };
        return newService;
    }
    static buscarAtendimentoView() {
        const id = parseInt(readLineSync.question("Qual ID do atendimento? "));
        return id;
    }
    static atualizarAtendimentoView() {
        const nomeCliente = readLineSync.question('Entre com o novo nome do cliente: ');
        const nomeEmpresa = readLineSync.question('Entre com o  novonome da empresa: ');
        const descricao = readLineSync.question('Informe a nova descrição do atendimento: ');
        const status = readLineSync.question('Informe o novo status do atendimento: ');
        const data = readLineSync.question("Informa a nova data do atendimento (DD/MM/YYYY): ");
        return [nomeCliente, nomeEmpresa, descricao, status, data];
    }
}
exports.AtendimentoView = AtendimentoView;

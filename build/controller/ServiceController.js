"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const DatabaseService_1 = require("../DatabaseService");
class ServiceController {
    static async cadastrarAtendimento(service) {
        const idInsercao = await (0, DatabaseService_1.createService)(service);
        return idInsercao;
    }
    static async listarTodosAtendimentos(usuarioId) {
        const services = await (0, DatabaseService_1.listAllService)(usuarioId);
        return services;
    }
    static async buscarAtendimentoPorId(id, userId) {
        const service = await (0, DatabaseService_1.getServiceById)(id, userId);
        return service;
    }
    static async atualizarAtendimento(service, nomeCliente, nomeEmpresa, descricao, data, status) {
        service.customer_name = nomeCliente;
        service.company_name = nomeEmpresa;
        service.description = descricao;
        service.date = data;
        service.status = status;
        await (0, DatabaseService_1.updateService)(service);
    }
    static async removerAtendimento(usuarioId) {
        await (0, DatabaseService_1.deleteService)(usuarioId);
    }
    static async removerAtendimentosDoUsuario(usuarioId) {
        await (0, DatabaseService_1.deleteServiceRelationship)(usuarioId);
    }
}
exports.ServiceController = ServiceController;

import { Customer_service } from '@prisma/client';
import {
    listAllService,
    createService,
    getServiceById,
    updateService,
    deleteService,
    deleteServiceRelationship
} from '../DatabaseService';

export class ServiceController{
    static async cadastrarAtendimento(service: Customer_service): Promise<number>{
        const idInsercao: number = await createService(service);
        return idInsercao;
    }

    static async listarTodosAtendimentos(usuarioId:number | undefined):Promise<Customer_service[]>{
        const services = await listAllService(usuarioId);
        return services;
    }
    static async buscarAtendimentoPorId(id:number, userId : number | undefined):Promise<Customer_service | null>{
        const service = await getServiceById(id, userId)
        return service
    }
    static async atualizarAtendimento(service:Customer_service, nomeCliente:string, nomeEmpresa:string, descricao:string, data:string, status:string){
        service.customer_name = nomeCliente
        service.company_name = nomeEmpresa
        service.description = descricao
        service.date = data
        service.status = status
        
        await updateService(service)
    }
    static async removerAtendimento(usuarioId:number){
        await deleteService(usuarioId)
    }
    static async removerAtendimentosDoUsuario(usuarioId:number){
        await deleteServiceRelationship(usuarioId)
    }
}


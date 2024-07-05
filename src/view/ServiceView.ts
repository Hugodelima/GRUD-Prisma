import { Customer_service } from '@prisma/client';
import * as readLineSync from 'readline-sync';
import { ServiceController } from '../controller/ServiceController';
import { UserView } from "../view/UserView";


export class AtendimentoView{
    static async menuAtendimento(id_usuario:number | undefined):Promise <void>{
        let op: string = '0';
        while (true) {
            console.log("0 - Opção de sair");
            console.log("1 - Cadastrar Atendimento");
            console.log("2 - Listar Atendimentos");
            console.log("3 - Atualizar Atendimento");
            console.log("4 - Remover Atendimento");
            op = readLineSync.question(">>");
            switch (op) {
                case '0':
                    return UserView.menuUsuario();
                case '1':
                    const newService: Customer_service = this.cadastrarAtendimentoView(id_usuario);
                    const newServiceId = await ServiceController.cadastrarAtendimento(newService);
                    console.log(`Novo atendimento criado com ID: ${newServiceId}`);
                    break;

                case '2':
                    const atendimentos: Customer_service[] = await ServiceController.listarTodosAtendimentos(id_usuario);
                    this.listagemView(atendimentos);
                    break;
                case '3':
                    const id_atualizar = this.buscarAtendimentoView(); //retornar o id
                    const atendimento_atualizar:Customer_service | null = await ServiceController.buscarAtendimentoPorId(id_atualizar, id_usuario) //busca o usuario

                    if (atendimento_atualizar){
                        const dadosAtuais = this.atualizarAtendimentoView() // solicitar os novos dados
                        const nomeCliente = dadosAtuais[0]
                        const nomeEmpresa = dadosAtuais[1]
                        const descricao = dadosAtuais[2]
                        const status = dadosAtuais[3]
                        const data = dadosAtuais[4]
                        await ServiceController.atualizarAtendimento(atendimento_atualizar, nomeCliente, nomeEmpresa, descricao, data, status) // atualiza o banco
                    }
                    else{
                        console.log("Não foi encontrado atendimento")
                    }   
                    break;
                case '4':
                    const id_excluir = this.buscarAtendimentoView(); //retornar o id
                    const atendimento_excluir:Customer_service | null = await ServiceController.buscarAtendimentoPorId(id_excluir ,id_usuario)

                    if(atendimento_excluir){
                        await ServiceController.removerAtendimento(id_excluir)
                        console.log("Atendimento excluindo com sucesso")
                    }else{
                        console.log("não existe atendimento com este id")
                    }
                    
                    break;
                    

        
            }
        }
    }
    static listagemView(services: Customer_service[] | Customer_service | null) {
        console.table(services);
    }
    static cadastrarAtendimentoView(id_usuario:number | undefined) {
        const nomeCliente: string = readLineSync.question('Entre com o nome do cliente: ');
        const nomeEmpresa: string = readLineSync.question('Entre com o nome da empresa: ');
        const descricao: string = readLineSync.question('Informe a descrição do atendimento: ');
        const status: string = readLineSync.question('Informe o status do atendimento: ');
        const data:string = readLineSync.question("Informa a data do atendimento (DD/MM/YYYY): ")

        const newService: Customer_service = { customer_name: nomeCliente, company_name: nomeEmpresa, description:descricao, date: data, status:status, users_id: id_usuario};
        return newService;
    }
    static buscarAtendimentoView(){
        const id = parseInt(readLineSync.question("Qual ID do atendimento? "))
        return id
    }
    static atualizarAtendimentoView(){
        const nomeCliente: string = readLineSync.question('Entre com o novo nome do cliente: ');
        const nomeEmpresa: string = readLineSync.question('Entre com o  novonome da empresa: ');
        const descricao: string = readLineSync.question('Informe a nova descrição do atendimento: ');
        const status: string = readLineSync.question('Informe o novo status do atendimento: ');
        const data:string = readLineSync.question("Informa a nova data do atendimento (DD/MM/YYYY): ")
        return [nomeCliente, nomeEmpresa, descricao, status, data]

    }

}    


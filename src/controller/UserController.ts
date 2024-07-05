import { User } from '@prisma/client';
import {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    listAllUsers,
    searchByName,
    login,
    searchByEmail
} from '../DatabaseUser';

export class UserController {

    static async cadastrarUsuario(user: User): Promise<number>{
        const idInsercao: number = await createUser(user);
        return idInsercao;
    }

    static async listarTodosUsuarios():Promise<User[]>{
        const users = await listAllUsers();
        return users;
    }
    
    static async buscarUsuarioPorId(id:number):Promise<User | null>{
        const user = await getUserById(id)
        return user
    }
    static async atualizarUsuario(user:any, nome:string, email:string, senha:string){
        user.name = nome
        user.email = email
        user.password = senha
        await updateUser(user)
    }

    static async excluirUsuario(id:number){
        await deleteUser(id)
    }
    static async buscarPeloNome(nomeParaProcurar:string):Promise <User[] | null>{
        const arrayDeUsers = await searchByName(nomeParaProcurar)
        return arrayDeUsers
    }

    static async efetuarLogin(email:string, password:string):Promise<User | null>{
        const usuario = await login(email,password)
        return usuario
    }

    static async buscarUsuarioPeloEmail(email:string):Promise<User | null>{
        const usuario = await searchByEmail(email)
        return usuario
    }

}
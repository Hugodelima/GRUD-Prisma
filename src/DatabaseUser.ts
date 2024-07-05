import { PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()



const fecharBanco = async() =>{
    await prisma.$disconnect();
}

async function createUser(user: User): Promise<number> {
    const userIns = await prisma.user.create({
        data:{
            name: user.name,
            email: user.email,
            password: user.password,
        },  
    })
    await fecharBanco();
    return userIns.id;
}

async function getUserById(userId: number): Promise<User | null> {
    const getUser = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })
    await fecharBanco();
    if (getUser){
        return getUser;
    }else{
        return null
    }
    
}

async function updateUser(user: User): Promise<void> {
    await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
    })
    await fecharBanco();
}

async function deleteUser(userId: number): Promise<void> {
    await prisma.user.delete({
        where: {
          id: userId,
        },
    })
    await fecharBanco();
}

async function listAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany()
    await fecharBanco();
    return users;
}

async function searchByName(nameToSerch:string):Promise <User[] | null>{
    const userList = await prisma.user.findMany({
        where:{
            name: {
                startsWith: nameToSerch
            }
        }
    })
    await fecharBanco();
    if (userList.length > 0){
        return userList
    }else{
        return null
    }
    
}

async function login(email_login:string, password_login:string) {
    const user = await prisma.user.findUnique({
        where:{
            email: email_login,
            password:password_login,

        },
    })
    await fecharBanco();
    if (user){
        return user
    }else{
        return null
    }
    
}


async function searchByEmail(email_login:string) {
    const getUser = await prisma.user.findUnique({
        where: {
          email: email_login
        }
      })
    await fecharBanco();
    return getUser
}

export { createUser, updateUser, deleteUser, getUserById, listAllUsers, searchByName, login, searchByEmail};

import { PrismaClient, Customer_service } from '@prisma/client'
const prisma = new PrismaClient()



const fecharBanco = async() =>{
    await prisma.$disconnect();
}


async function createService(service: Customer_service): Promise<number> {
    const servceIns = await prisma.customer_service.create({
        data:{
            customer_name: service.customer_name,
            company_name: service.company_name,
            description: service.description,
            date: service.date,
            status: service.status,
            users_id: service.users_id,
        },  
    })
    await fecharBanco();
    return servceIns.id;
}

async function listAllService(users_id: number | undefined): Promise<Customer_service[]> {
    const services = await prisma.customer_service.findMany({
        where:{
            users_id: users_id
        }
    })
    await fecharBanco();
    return services;
}

async function getServiceById(serviceId: number,userId:number | undefined): Promise<Customer_service | null> {
    const getService= await prisma.customer_service.findUnique({
        where: {
          id: serviceId,
          users_id: userId

        }
      })
    await fecharBanco();
    if (getService){
        return getService;
    }else{
        return null
    }
}

async function updateService(service: Customer_service): Promise<void> {
    await prisma.customer_service.update({
        where: {
          id: service.id,
        },
        data:{
            customer_name: service.customer_name,
            company_name: service.company_name,
            description: service.description,
            date: service.date,
            status: service.status,
            users_id: service.users_id,
        },  
    })
    await fecharBanco();
}
async function deleteService(serviceId: number): Promise<void> {
    await prisma.customer_service.delete({
        where: {
          id: serviceId,
        },
    })
    await fecharBanco();
}
async function deleteServiceRelationship(serviceId: number): Promise<void> {

    await prisma.customer_service.deleteMany({
        where: {
            users_id: serviceId,
        }
    })
    await fecharBanco();
}

export { listAllService, createService, getServiceById, updateService, deleteService, deleteServiceRelationship};

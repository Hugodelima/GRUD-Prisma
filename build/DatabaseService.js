"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceRelationship = exports.deleteService = exports.updateService = exports.getServiceById = exports.createService = exports.listAllService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const fecharBanco = async () => {
    await prisma.$disconnect();
};
async function createService(service) {
    const servceIns = await prisma.customer_service.create({
        data: {
            customer_name: service.customer_name,
            company_name: service.company_name,
            description: service.description,
            date: service.date,
            status: service.status,
            users_id: service.users_id,
        },
    });
    await fecharBanco();
    return servceIns.id;
}
exports.createService = createService;
async function listAllService(users_id) {
    const services = await prisma.customer_service.findMany({
        where: {
            users_id: users_id
        }
    });
    await fecharBanco();
    return services;
}
exports.listAllService = listAllService;
async function getServiceById(serviceId, userId) {
    const getService = await prisma.customer_service.findUnique({
        where: {
            id: serviceId,
            users_id: userId
        }
    });
    await fecharBanco();
    if (getService) {
        return getService;
    }
    else {
        return null;
    }
}
exports.getServiceById = getServiceById;
async function updateService(service) {
    await prisma.customer_service.update({
        where: {
            id: service.id,
        },
        data: {
            customer_name: service.customer_name,
            company_name: service.company_name,
            description: service.description,
            date: service.date,
            status: service.status,
            users_id: service.users_id,
        },
    });
    await fecharBanco();
}
exports.updateService = updateService;
async function deleteService(serviceId) {
    await prisma.customer_service.delete({
        where: {
            id: serviceId,
        },
    });
    await fecharBanco();
}
exports.deleteService = deleteService;
async function deleteServiceRelationship(serviceId) {
    await prisma.customer_service.deleteMany({
        where: {
            users_id: serviceId,
        }
    });
    await fecharBanco();
}
exports.deleteServiceRelationship = deleteServiceRelationship;

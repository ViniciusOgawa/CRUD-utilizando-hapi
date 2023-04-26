const UserService = require('../services/userService');

const create = async (request, h) => {
    try {
        const user = await UserService.createUser(request.payload);
        return h.response(user).code(201);
    } catch (error) {
        return h.response({ message: error.message }).code(400);
    }
};

const authenticate = async (request, h) => {
    try {
        const user = await UserService.authenticateUser(request.payload);
        return h.response(user).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(401);
    }
};

const list = async (request, h) => {
    const users = await UserService.listUsers();
    return h.response(users).code(200);
};

const get = async (request, h) => {
    try {
        const user = await UserService.getUserById(request.params.id);
        return h.response(user).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(404);
    }
};

const update = async (request, h) => {
    try {
        const user = await UserService.updateUser(request.params.id, request.payload);
        return h.response(user).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(404);
    }
};

const remove = async (request, h) => {
    try {
        const user = await UserService.deleteUser(request.params.id);
        return h.response().code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(404);
    }
};

module.exports = {
    create,
    authenticate,
    list,
    get,
    update,
    remove
};

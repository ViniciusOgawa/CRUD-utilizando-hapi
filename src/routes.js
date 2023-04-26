const UserController = require('./controllers/userController');
const AuthMiddleware = require('./middlewares/authMiddleware');

module.exports = [
    {
        method: 'POST',
        path: '/users',
        handler: UserController.create,
        config: {
            pre: [
                { method: AuthMiddleware.checkEmailExists, assign: 'user' }
            ]
        }
    },
    {
        method: 'POST',
        path: '/users/authenticate',
        handler: UserController.authenticate
    },
    {
        method: 'GET',
        path: '/users',
        handler: UserController.list,
        config: {
            pre: [
                { method: AuthMiddleware.verifyToken, assign: 'token' }
            ]
        }
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: UserController.get,
        config: {
            pre: [
                { method: AuthMiddleware.verifyToken, assign: 'token' },
                { method: AuthMiddleware.checkUserExists, assign: 'id' }
            ]
        }
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: UserController.update,
        config: {
            pre: [
                { method: AuthMiddleware.verifyToken, assign: 'token' },
                { method: AuthMiddleware.checkUserExists, assign: 'id' },
                { method: AuthMiddleware.checkEmailExists, assign: 'user' }
            ]
        }
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: UserController.remove,
        config: {
            pre: [
                { method: AuthMiddleware.verifyToken, assign: 'token' },
                { method: AuthMiddleware.checkUserExists, assign: 'id' }
            ]
        }
    }
];

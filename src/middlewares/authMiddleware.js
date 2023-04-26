const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Boom = require('@hapi/boom');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = async (request, h) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        request.user = decoded;
        return h.continue;
    } catch (error) {
        throw Boom.unauthorized('Authorization header is missing');
    }
};

const checkEmailExists = async (request, h) => {
    const { email } = request.payload;
    const user = await User.findOne({ where: { email } });

    if (user) {
        throw Boom.conflict('Email already exists');
    }

    return h.continue;
};

const checkUserExists = async (request, h) => {
    const { id } = request.params;
    const user = await User.findByPk(id);

    if (!user) {
        throw Boom.notFound('User not found');
    }

    return h.continue;
};

module.exports = { verifyToken, checkEmailExists, checkUserExists };

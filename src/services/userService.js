const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Boom = require('@hapi/boom');
const userSchema = require('../schemas/userSchema')
dotenv.config();

const createUser = async (data) => {
    const { error, value } = userSchema.createUserSchema.validate(data);
    if (error) {
        throw Boom.badRequest(error.message);
    }

    const { name, email, password } = value;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user);
    return { user, token };
};

const authenticateUser = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user);
    return { user, token };
};

const listUsers = async () => {
    const users = await User.findAll();
    return users;
};

const getUserById = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const updateUser = async (id, data) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('User not found');
    }

    const { error, value } = userSchema.updateUserSchema.validate(data);

    if (error) {
        throw Boom.badRequest(error.message);
    }

    const { name, email, password } = value;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    await user.update({ name, email, password: hashedPassword });

    const updatedUser = await getUserById(id);
    return updatedUser;
};

const deleteUser = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('User not found');
    }

    await user.destroy();
    return user;
};

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    return token;
};

module.exports = {
    createUser,
    authenticateUser,
    listUsers,
    getUserById,
    updateUser,
    deleteUser
};

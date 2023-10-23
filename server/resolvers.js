const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userSchema'); // Import your user model
require('dotenv').config();

const SECRET = process.env.SECRET;

const resolvers = {
    Query: {
        getUsers: async (_, __, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            return User.find();
        },
        getUser: async (_, { id }) => User.findById(id),
    },
    Mutation: {
        createUser: async (_, { username, email, password }, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            return await user.save();
        },
        updateUser: async (_, { id, username, email, password }, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            const user = await User.findById(id);
            if (username) user.username = username;
            if (email) user.email = email;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }
            return await user.save();
        },
        deleteUser: async (_, { id }, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            return User.findByIdAndRemove(id);
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('No such user found');
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
            return {
                token,
                user,
            };
        },
    },
};

module.exports = resolvers;

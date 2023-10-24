const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userSchema');
const Job = require('./JobSchema'); // Import your job schema
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
        getJobs: async (_, __, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            return Job.find();
        },
        getJob: async (_, { id }) => Job.findById(id),
        getJobsByUserId: async (_, { id }) => Job.find({ user_id: id }),
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
        createJob: async (_, { title, company, location, description, requirements, user_id },context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            const job = new Job({ title, company, location, description, requirements, user_id });
            return await job.save();
        },
        updateJob: async (_, { id, title, company, location, description, requirements }, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            const job = await Job.findById(id);
            if (title) job.title = title;
            if (company) job.company = company;
            if (location) job.location = location;
            if (description) job.description = description;
            if (requirements) job.requirements = requirements;
            return await job.save();
        },
        deleteJob: async (_, { id }, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            return Job.findByIdAndRemove(id);
        },
    },
};

module.exports = resolvers;

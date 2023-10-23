const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userSchema')
require('dotenv').config();

const SECRET = process.env.SECRET;

class UserService {
    async getUsers() {
        return await User.find();
    }

    async getUser(id) {
        return await User.findById(id);
      }

    async createUser({ username, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        try {
            return await user.save();
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user.");
        }
    }

    async loginUser({ username, password }) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('No such user found');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        return jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    }

    async updateUser(id, { username, email, password }) {
        const user = await User.findById(id);
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        return await user.save();
    }

    async deleteUser(id) {
        return await User.findByIdAndRemove(id);
    }
}

module.exports = new UserService();
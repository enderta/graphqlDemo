const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db.config');

const SECRET = 'secret';

class UserService {
    async getUsers() {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }

    async getUserById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    async createUser({username, email, password}) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        return result.rows[0];
    }

    async loginUser({username, password}) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            throw new Error('No such user found');
        }
        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        return jwt.sign({id: user.id}, SECRET, { expiresIn: '1h' });
    }

    async updateUser(id, {username, email}) {
        const result = await pool.query('UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *', [username, email, id]);
        return result.rows[0];
    }

    async deleteUser(id) {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
    async getUserJobs(id) {
        const result = await pool.query('SELECT * FROM jobs WHERE user_id = $1', [id]);
        return result.rows;
    }

}

module.exports = new UserService();
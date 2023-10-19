const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db.config');

const SECRET = 'secret';

class UserService {
    async getJobs() {
        const result = await pool.query('SELECT * FROM jobs');
        return result.rows;
    }
    async getJobById(id) {
        const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
        return result.rows[0];

    }
    async createJob({title, company, location, description, requirements}) {
        const result = await pool.query('INSERT INTO jobs (title, company, location, description, requirements) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, company, location, description, requirements]);
        return result.rows[0];
    }
    async updateJob(id, {title, company, location, description, requirements}) {
        const result = await pool.query('UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, requirements = $5 WHERE id = $6 RETURNING *', [title, company, location, description, requirements, id]);
        return result.rows[0];
    }
    async deleteJob(id) {
        const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
    async getJobsByUserId(id) {
        const result = await pool.query('SELECT * FROM jobs WHERE user_id = $1', [id]);
        return result.rows;
    }



}

module.exports = new UserService();


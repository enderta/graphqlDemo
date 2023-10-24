const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Job = require('./jobSchema');
require('dotenv').config();

const SECRET = process.env.SECRET;

class JobService {
    async getAllJobs() {
        return await Job.find();
    }

    async getJobById(id) {
        return await Job.findById(id);
    }

    async createJob({ title, company, location, description, requirements }) {
        const job = new Job({
            title,
            company,
            location,
            description,
            requirements,
        });
        try {
            return await job.save();
        } catch (error) {
            console.error("Error creating job:", error);
            throw new Error("Failed to create job.");
        }
    }

    async updateJob(id, { title, company, location, description, requirements }) {
        const job = await Job.findById(id);
        if (title) job.title = title;
        if (company) job.company = company;
        if (location) job.location = location;
        if (description) job.description = description;
        if (requirements) job.requirements = requirements;
        return await job.save();
    }

    async deleteJob(id) {
        return await Job.findByIdAndRemove(id);
    }
}

module.exports = new JobService();

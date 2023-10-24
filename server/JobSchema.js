const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    description: String,
    requirements: String,
    is_applied: { type: Boolean, default: false },
    posted_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User collection
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

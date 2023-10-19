const userService = require('./users.service');
const jobService= require('./job.service.js');

const resolvers = {
    Query: {
        users: () => userService.getUsers(),
        user: (parent, args) => userService.getUserById(args.id),
        jobs: () => jobService.getJobs(),
        job: (parent, args) => jobService.getJobById(args.id),
    },
    User: {
        jobs: (user) => jobService.getJobsByUserId(user.id)
    },
    Job: {
        user: (job) => userService.getUserById(job.user_id)
    },
    Mutation: {
        createUser: (parent, args) => userService.createUser(args),
        loginUser: (parent, args) => userService.loginUser(args),
        updateUser: (parent, args) => userService.updateUser(args.id, args),
        deleteUser: (parent, args) => userService.deleteUser(args.id),
        createJob: (parent, args) => jobService.createJob(args),
        updateJob: (parent, args) => jobService.updateJob(args.id, args),
        deleteJob: (parent, args) => jobService.deleteJob(args.id),
    },
};

module.exports = resolvers;
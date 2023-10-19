const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        jobs: [Job!]   
    }

    type Job {
        id: ID!
        title: String!
        company: String!
        location: String!
        description: String!
        requirements: String!
        is_applied: Boolean!
        posted_at: String!
        updated_at: String!
        user_id: ID!
        user: User
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    input JobInput {
        title: String!
        company: String!
        location: String!
        description: String!
        requirements: String!
        is_applied: Boolean!
        posted_at: String!
        updated_at: String!
        user_id: ID!
    }

    type Query {
        users: [User!]
        user(id: ID!): User
        jobs: [Job!]
        job(id: ID!): Job
    }

    type Mutation {
        createUser(input: UserInput!): User
        loginUser(username: String!, password: String!): String
        updateUser(id: ID!, input: UserInput): User
        deleteUser(id: ID!): User
        createJob(input: JobInput!): Job
        updateJob(id: ID!, input: JobInput): Job
        deleteJob(id: ID!): Job
    }
`;

module.exports = typeDefs;
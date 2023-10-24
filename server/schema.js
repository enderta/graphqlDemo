const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Job {
    id: ID!
    title: String!
    company: String!
    location: String!
    description: String!
    requirements: String!
    is_applied: Boolean
    posted_at: String
    updated_at: String
    user_id: ID!
  }

  type Query {
    getJobs: [Job]
    getJob(id: ID!): Job
    getJobsByUserId(id: ID!): [Job]
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createJob(title: String!, company: String!, location: String!, description: String!, requirements: String!, user_id: ID!): Job
    updateJob(id: ID!, title: String, company: String, location: String, description: String, requirements: String): Job
    deleteJob(id: ID!): Job
    createUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): User
    login(email: String!, password: String!): AuthData
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String
  }

  type AuthData {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;

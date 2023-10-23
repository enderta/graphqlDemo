const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const User = require('./server/userSchema');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define your GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      return await User.create({ username, email, password });
    },
  },
};

// Create the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
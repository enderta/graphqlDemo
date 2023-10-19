const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,

});

const app = express();
const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
}
startServer().then(r => console.log('Server started!'));

app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
)
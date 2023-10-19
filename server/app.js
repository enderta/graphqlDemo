const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const SECRET = 'secret'; // replace YOUR_SECRET_KEY with your actual secret key
const jwt = require('jsonwebtoken');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: ({req}) => {
        const token = req.headers.authorization;
        const user = token ? jwt.verify(token.replace('Bearer ', ''), SECRET) : null;
        return {user};
    }
});

const app = express();
const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
}
startServer().then(r => console.log('Server started!'));

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
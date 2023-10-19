const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./cyf.schema');
const resolvers = require('./cyf.resolver');
const cors = require('cors');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    cors: false, // Disable built-in CORS
});


const app = express();
app.use(cors(
    {
        //all orgin and methods allowed
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
        
    }
));    

const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app }); // This line is important
};

startServer().then(() => console.log('Server started!'));

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./cyf.schema");
const resolvers = require("./cyf.resolver");
const cors = require("cors");

const server = new ApolloServer({
  typeDefs, //it contains the schema for queries and mutations
  resolvers, //it connects the schema and resolver
  introspection: true, // enables introspection of the schema meaning we can query it on the front end
  cors: false, // Disable built-in CORS
});

const app = express();
app.use(
  cors({
    //all orgin and methods allowed
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app }); //connect apollo server to express
};

startServer().then(() => console.log("Server started!"));

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

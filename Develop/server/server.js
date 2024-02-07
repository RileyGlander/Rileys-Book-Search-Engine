const express = require('express');
const { ApolloServer} = require('@apollo/server')
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloSever = async () => {
  await server.start();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleWare(server, {
  constext: authMiddlewate
}))

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
}

//Here we call the async function to start the server
startApolloSever();
/* eslint linebreak-style: ["error","windows"] */
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const product = require('./product.js');

const resolvers = {
  Query: {
    productList: product.productList,
    product: product.getProduct,
  },
  Mutation: {
    productAdd: product.productAdd,
    productUpdate: product.productUpdate,
    productDelete: product.remove
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}
module.exports = { installHandler };
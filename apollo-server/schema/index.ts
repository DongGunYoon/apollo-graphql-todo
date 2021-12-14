const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    todos:[Todo]
  }
  type Todo{
    _id: ID
    name: String
    comment: String
    completed: Boolean
    createdAt: Date
  }
`;

module.exports = typeDefs;
const { gql } = require('apollo-server-express');

const typeDefs = `
  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth    
    addUser(username: String!, email: String!, password: String!): Auth
    
    removeBook(bookId: ID!): User
  }

  type User {
    _id: ID!
    username: String
    email: String
    bookCount: String
    savedBooks: String
  }
  
  

 



  type Auth {
   token: ID!
   user: User
  }

  

  
`;

module.exports = typeDefs;

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($profileId: ID!, $book: String!) {
    saveBook(profileId: $profileId, book: $book) {
      _id
      name
      books
    }
  }
`
export const REMOVE_BOOK = gql`
mutation removeBook($book: String!) {
    removeBook(skill: $book) {
      _id
      name
      books
    }
  }
`;
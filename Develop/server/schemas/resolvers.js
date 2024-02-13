const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          // This uses the parameter to find the matching class in the collection
          return User.findOne({ _id: context.user._id }).populate('thoughts');
        }
        throw AuthenticationError;
      },
    },
    // Create the functions that fulfill the mutations defined in `typeDefs.js`
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { description }, context) => {
        if (context.user) {
          const Book = await Book.create({
            description,
            authors: context.user.username,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { book: bookSchema._id } }
          );
  
          return Book;
        }
        throw AuthenticationError;
        ('You need to be logged in!');
      },

      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const book = await Book.findOneAndDelete({
            _id: bookId,
            authors: context.user.username,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { books: book._id } }
          );
  
          return book;
        }
        throw AuthenticationError;
      },
      }

    };
    
    module.exports = resolvers;
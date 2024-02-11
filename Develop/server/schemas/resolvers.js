const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('thoughts');
        }
        throw AuthenticationError;
      },
    },
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
          const bookSchema = await Book.create({
            description,
            authors: context.user.username,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { books: bookSchema._id } }
          );
  
          return bookSchema;
        }
        throw AuthenticationError;
        ('You need to be logged in!');
      },
      }

    };
    
    module.exports = resolvers;
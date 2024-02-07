const { User, bookSchema } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (User, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('books');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
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
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
    //   saveBook: async (parent, { username, email, password }) => {
    //     const user = await User.create({ username, email, password });
    //     const token = signToken(user);
    //     return { token, user };
      },
      removeBook: async (parent, { bookId }) => {
        return bookSchema.findOneAndDelete({ _id: bookId });
      },
  };

module.exports = resolvers;
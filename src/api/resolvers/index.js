const path = require("path");
const fsPromises = require("fs/promises");
const {
  fileExists,
  readJsonFile,
  deleteFile,
  getDirectoryFileNames,
} = require("../../utils/fileHandling");
const { GraphQLError, printType } = require("graphql");
const crypto = require("crypto");
const axios = require("axios").default;

exports.resolvers = {
  Query: {
    getAllBooks: async (_) => {
      let bookData = [];

      try {
        const response = await axios.get(process.env.BOOK_URI);
        console.log(response.data);
        bookData = response.data;
      } catch (error) {
        console.log(error);
        return new GraphQLError("Något gick fel");
      }
      return bookData;
    },
  },
  Mutation: {
    addBook: async (_, args) => {
      const { title, rating, author, genre, url } = args.input

      const newBook = {
        id: crypto.randomUUID(),
        title,
        rating,
        author,
        genre, 
        url
      }

      try {
        const endpoint = process.env.BOOK_URI
        const response = await axios.post(endpoint, 
          { 
            data: [newBook]
          },
          {
            headers: {
              'Accept-Encoding': 'gzip,deflate,compress',
            }
          })
        
      } catch(error) {
        console.log(error)
        return new GraphQLError('Kunde inte skapa bok')
      }

      return newBook
    }
  }
};

/**
 * type Mutation {
    addBook(input: addBookInput!): Books
}

input addBookInput {
    title: String!
    rating: String
    author: String
    genre: String
    url: String!
} 
 */

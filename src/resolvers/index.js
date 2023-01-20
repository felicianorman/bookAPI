const path = require("path");
const fsPromises = require("fs/promises");
const {
  fileExists,
  readJsonFile,
  deleteFile,
  getDirectoryFileNames,
} = require("../utils/fileHandling");
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
};

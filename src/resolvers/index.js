const path = require("path");
const fsPromises = require("fs/promises");
const { fileExists, readJsonFile } = require("../utils/fileHandling");
const { GraphQLError } = require("graphql");
const crypto = require("node:crypto");

exports.resolvers = {
    Query: {
        getBookById: async (_, args) => {
            const bookId = args.bookId;

            const bookFilePath = path.join(__dirname, `./../data/projects/${bookId}.json`);

            const bookExists = await fileExists(bookFilePath);
            if(!bookExists) return new GraphQLError('Den boken existerar inte');

            const bookData = await fsPromises.readFile(bookFilePath, {
                encoding: "utf-8"
            });

            const data = JSON.parse(bookData);
            return data;
        }
    }
}
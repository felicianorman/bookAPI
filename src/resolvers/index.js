const path = require("path");
const fsPromises = require("fs/promises");
const { fileExists, readJsonFile } = require("../utils/fileHandling");
const { GraphQLError } = require("graphql");
const crypto = require("node:crypto");
const { read } = require("fs");

exports.resolvers = {
  Query: {
    getBookById: async (_, args) => {
      const bookId = args.bookId;

      const bookFilePath = path.join(
        __dirname,
        `./../data/projects/${bookId}.json`
      );

      const bookExists = await fileExists(bookFilePath);
      if (!bookExists) return new GraphQLError("Den boken existerar inte");

      const bookData = await fsPromises.readFile(bookFilePath, {
        encoding: "utf-8",
      });

      const data = JSON.parse(bookData);
      return data;
    },
    getAllBooks: async (_, args) => {
      const booksDirectory = path.join(__dirname, `../data/projects/`);

      const books = await fsPromises.readdir(booksDirectory);
      const promises = [];
      books.forEach((fileName) => {
        const filePath = path.join(booksDirectory, fileName);
        promises.push(readJsonFile(filePath));
      });

      const bookData = await Promise.all(promises);
      return bookData;
    },
  },
  Mutation: {
    createBook: async (_, args) => {
      //Verify name
      if (args.name.lenght === 0)
        return new GraphQLError("Bok namnet måste vara minst 1 bokstav");

      //Unikt id
      const newBook = {
        id: crypto.randomUUID(),
        name: args.name,
        author: args.author,
        genre: args.genre,
        description: args.description || "",
        finished: args.finished
      };

      let filePath = path.join(
        __dirname,
        `../data/projects/${newBook.id}.json`
      );

      let idExists = true;

      //Kontrollerar om boken existerar
      //Om den existerar, generera ett randomiserat ID
      while (idExists) {
        const exists = await fileExists(filePath);
        console.log(exists, newBook.id);

        if (exists) {
          newBook.id = crypto.randomUUID();
          filePath = path.join(
            __dirname,
            `../data/projects/${newBook.id}.json`
          );
        }
        idExists = exists;
      }

      //Skapar fil för nya boken
      await fsPromises.writeFile(filePath, JSON.stringify(newBook));

      //Returnerar vår respons
      return newBook;
    },
    updateBook: async (_, args) => {
        //Hämtar parametrar
        const { id, finished } = args;

        //Skapar filepath till boken
        let filePath = path.join(__dirname, `../data/projects/${id}.json`);

        //Kollar om boken vi vill ändra existerar
        const bookExists = await fileExists(filePath);
        if(!bookExists) return new GraphQLError("Den boken existerar inte");

        //Skapar updateBook
        const updateBook = {
            id,
            boolean
        }

        //Skriver över den gamla filen med den nya
        await fsPromises.writeFile(filePath, JSON.stringify(updateBook));

        //Returnerar uppdaterade objektet
        return {
            id: id,
            finished: true
        }

    }
  },
};

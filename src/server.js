require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { resolvers } = require("./resolvers");
const { loadFiles } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const path = require("path");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

const port = process.env.PORT || 5000;

async function run() {
  try {
    //loadFiles läser av vår schema.graphQL och lagrar i variabeln typeDefs
    const typeDefs = await loadFiles(path.join(__dirname, "./schema.graphql"));

    //här tar vi våra resolvers (all logik) och schemagraphQL och gör om till ett
    //schema som apollo kan använda för att starta sin server
    const schema = makeExecutableSchema({
      typeDefs: typeDefs,
      resolvers: resolvers,
    });

    //Skapar vår server
    const server = new ApolloServer({ schema: schema });

    //startar vår server
    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(port, () => {
      console.log(`Server ready at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();

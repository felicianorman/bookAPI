require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { resolvers } = require("../resolvers");
const { loadFiles } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const path = require("path");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
import cors from "cors";
export default httpServer;

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);
app.use(express.static(path.join(__dirname, "public")));
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
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    //Skapar vår server
    const server = new ApolloServer(app, httpServer, { schema: schema });

    //startar vår server
    await server.start();
    server.applyMiddleware({ app });
    app.use("/graphql", expressMiddleware(server));

    app.listen(port, () => {
      console.log(`Server ready at http://localhost:${port}`);

      startApolloServer(app, httpServer);


    });
  
  } catch (error) {
    console.log(error);
  }
}

run();

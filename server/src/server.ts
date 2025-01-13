import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares";
import problemRoutes from "./routes/problemRoutes";
import mongoose from "mongoose";
import AppConfig from "./config/app";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { problemResolver } from "./graphql/resolvers/problemResolver";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { testcaseResolver } from "./graphql/resolvers/testcaseResolver";

mongoose.connect(AppConfig.MONGO_URI);

const app = express();

// Define schema and resolvers

// Load all GraphQL schema files from the directory
const typesArray = loadFilesSync(path.join(__dirname, './graphql/schemas'), { extensions: ['graphql'] });

// Merge all schema files into a single typeDefs
const typeDefs = mergeTypeDefs(typesArray);

const resolvers = {
  Query: {
    ...problemResolver.Query,
    ...testcaseResolver.Query,
  },

  Mutation: {
    ...problemResolver.Mutation,
    ...testcaseResolver.Mutation,
  }
};

/* app default middlewares */
app.use(cors());
app.use(express.json());

/* routes */
app.use("/api", problemRoutes);

(async () => {
    // Create an Apollo Server instance
    const server = new ApolloServer({ typeDefs, resolvers });
    
    await server.start();
    app.use("/api/graphql", expressMiddleware(server));

    /* custom middlewares */
    app.use(notFound);
    app.use(errorHandler);

})();
export default app;

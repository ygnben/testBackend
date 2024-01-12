// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { schema } from "./schema";

// const server = new ApolloServer({ schema });

// const startServer = async () => {
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });
//   console.log(`🚀  Server ready at: ${url}`);
// };
// startServer();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";
import { prisma } from "./db";
import jwt from "jsonwebtoken";
// import { resolvers } from "./resolvers";

const server = new ApolloServer({
  schema,
  // resolvers,
});

const getUser = async (token: string) => {
  // Decode your token to get the user id
  const decoded = jwt.decode(token);
  console.log("🚀 ~ getUser ~ decoded:", decoded);

  // const userId = ;
  // const user = prisma.user.findUnique({})
  // return userId
};

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const token = req.headers.authorization || "";
      console.log("🚀 ~ context: ~ token:", token);
      const user = await getUser(token);

      return { user };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
};
startServer();

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
// import jwt from "jsonwebtoken";
import * as jose from "jose";
// import { resolvers } from "./resolvers";

import { GraphQLError } from "graphql";

import { jwtDecode } from "jwt-decode";

import jwt from "jsonwebtoken";

const server = new ApolloServer({
  schema,
  // resolvers,
});

const getUser = async (token: string) => {
  // Decode your token to get the user id
  // const decoded = jwt.decode(token);
  // return userId;
  // const secret = jose.base64url.decode(
  //   "zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI"
  // );
  // const { payload, protectedHeader } = await jose.jwtVerify(token);
  // console.log(protectedHeader);
  // console.log(payload);
  if (token) {
    const token1 = token.replace("Bearer ", "");
    console.log("🚀 ~ getUser ~ token1:", token1);
    const SECRET = "process.env.VITE_TOKEN_SECRET";
    // const { payload } = jose.decodeJwt(token1);
    const decoded = jwt.verify(token1, SECRET);
    const obj = decoded;

    const userId = (obj as any).user.id;
    // const obj2 = {
    //   id: userId,
    // };
    // console.log(userId);
    return userId;
  }
  // const secret = jose.base64url.decode(SECRET);
  // const decoded = jwtDecode(token1);

  // console.log("🚀 ~ getUser ~ decoded:", decoded);

  // const { payload } = await jose.jwtDecrypt(token1, secret);

  // const { payload } = await jose.jwtDecrypt(
  //   token1,
  //   new TextEncoder().encode(SECRET)
  // );

  // // string json = jose.jwtVerify(token1);
  // console.log(payload);

  // return { payload };
};

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    // context: async ({ req, res }) => {
    //   const token = req.headers.authorization || "";
    //   // console.log("🚀 ~ context: ~ token:", token);
    //   const user = await getUser(token);

    //   return { user };
    // },

    context: async ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || "";
      console.log("🚀 ~ context: ~ token:", token);

      // try to retrieve a user with the token
      // let user;
      // if (token) {
      //   user = getUser(token);
      // }
      const user = await getUser(token);
      console.log("🚀 ~ context: ~ user:", user);
      // optionally block the user
      // we could also check user roles/permissions here
      // if (!user)
      //   // throwing a `GraphQLError` here allows us to specify an HTTP status code,
      //   // standard `Error`s will have a 500 status code by default
      //   throw new GraphQLError("User is not authenticated", {
      //     extensions: {
      //       code: "UNAUTHENTICATED",
      //       http: { status: 401 },
      //     },
      //   });

      // add the user to the context

      return { user };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
};
startServer();

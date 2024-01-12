import { builder } from "../builder";
import { prisma } from "../db";
import * as jose from "jose";

async function createJsonWebToken(iss: string, sub: any, secret: string) {
  const header = {
    alg: "HS256", // Token generation algorithm
    typ: "JWT",
  };

  const payload = {
    iss: iss,
    sub: sub,
    exp: Math.round(Date.now() / 1000) + 60, // token is valid for 60 seconds
  };

  return await new jose.SignJWT(payload)
    .setProtectedHeader(header)
    .sign(new TextEncoder().encode(secret));
}

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeString("username"),
    password: t.exposeString("password"),
    token: t.exposeString("token", { nullable: true }),
    shopCart: t.relation("shopCart"),
    // messages: t.relation("messages"),
    // token: t.relation("token"),

    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});

// // By unique identifier
// const user = await prisma.user.findUnique({
//   where: {
//     email: 'elsa@prisma.io',
//   },
// })

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query) => {
      return prisma.user.findMany({ ...query });
    },
  })
);

// builder.queryField("user", (t) =>
//   t.prismaField({
//     type: "User",
//     resolve: async (query) => {
//       return prisma.user.findUnique({
//         where: {
//           name: test,
//         },
//       });
//     },
//   })
// );
builder.mutationField("login", (t) =>
  t.prismaField({
    type: "User",
    args: {
      name: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      const user = await prisma.user.findUnique({
        where: { username: args.name },
      });

      if (!user) {
        throw new Error("No such user found");
      }

      // Here you should check if the passwords match
      // This is a placeholder, replace it with your actual password checking logic
      const passwordIsValid = args.password === user.password;

      if (!passwordIsValid) {
        throw new Error("Invalid password");
      }
      // else {
      await createJsonWebToken(
        "the issuer",
        user,
        "process.env.VITE_TOKEN_SECRET"
      ).then((token) => {
        user.token = token;
        console.log("🚀 ~ file: User.ts:96 ~ ).then ~ user.token:", user.token);
        // user.save();
      });
      // }
      console.log("🚀 ~ file: User.ts:96 ~ ).then ~ user.token:", user.token);
      return user;
    },
  })
);

builder.mutationField("signUp", (t) =>
  t.prismaField({
    type: "User",
    args: {
      // name: t.arg.string({ required: true }),
      // email: t.arg.string({ required: true }),
      username: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      const res = await prisma.user.create({
        data: {
          // name: args.name,
          // email: args.email,
          username: args.username,
          password: args.password,
          // ShopCart: { create: {} },
        },
      });
      await prisma.shopCart.create({ data: { userId: res.id } });
      return res;
    },
  })
);

// builder.mutationField("signUp", (t) =>
//   t.prismaField({
//     type: "User",
//     nullable: true,
//     args: {
//       // name: t.arg.string({ required: true }),
//       // email: t.arg.string({ required: true }),
//       username: t.arg.string({ required: true }),
//       password: t.arg.string({ required: true }),
//     },
//     resolve: async (_query, _root, args) => {
//       const { id } = prisma.user.create({
//         data: {
//           // name: args.name,
//           // email: args.email,
//           username: args.username,
//           password: args.password,
//           // ShopCart: { create: {} },
//         },
//       });

//       prisma.shopCart.create({ data: { userId: id } });
//     },
//   })
// );

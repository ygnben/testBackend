import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    password: t.exposeString("password"),
    // messages: t.relation("messages"),

    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query) => {
      return prisma.user.findMany({ ...query });
    },
  })
);

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

      return user;
    },
  })
);

builder.mutationField("createOneUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      name: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      username: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          username: args.username,
          password: args.password,
        },
      });
    },
  })
);

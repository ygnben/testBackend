import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    // messages: t.relation("messages"),
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

builder.mutationField("createOneUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      return prisma.user.create({
        data: {
          name: args.name,
        },
      });
    },
  })
);

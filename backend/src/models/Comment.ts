import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Comment", {
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeID("userId"),
    content: t.exposeString("content"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});

builder.queryField("Comment", (t) =>
  t.prismaField({
    type: ["Comment"],
    args: {
      bookId: t.arg.int({ required: true }),
    },
    resolve: async (query, _root, args, contextValue) => {
      // const shopCart = await prisma.shopCart.findFirst({
      //   where: { userId: contextValue.user },
      // });
      // console.log({ ...query });
      return prisma.comment.findMany({
        where: { bookId: args.bookId },
      });
    },
  })
);

builder.mutationField("createOneComment", (t) =>
  t.prismaField({
    type: "Comment",
    args: {
      bookId: t.arg.int({ required: true }),
      content: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args, contextValue) => {
      return prisma.comment.create({
        data: {
          userId: contextValue.user,
          bookId: args.bookId,
          content: args.content,
        },
      });
    },
  })
);

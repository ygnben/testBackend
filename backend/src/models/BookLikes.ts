import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("BookLikes", {
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeID("userId"),
    bookId: t.exposeID("bookId"),
    book: t.relation("book"),
  }),
});

builder.queryField("likeItems", (t) =>
  t.prismaField({
    type: ["BookLikes"],
    resolve: async (query, _root, _args, contextValue) => {
      // const shopCart = await prisma.shopCart.findFirst({
      //   where: { userId: contextValue.user },
      // });
      // console.log({ ...query });
      return prisma.bookLikes.findMany({
        where: { userId: contextValue.user },
      });
    },
  })
);

builder.mutationField("addLike", (t) =>
  t.prismaField({
    type: "BookLikes",
    args: {
      // shopCartId: t.arg.int({ required: true }),
      // userId: t.arg.int({ required: true }),
      bookId: t.arg.int({ required: true }),
    },
    resolve: async (_query, _root, args, contextValue) => {
      // console.log("🚀 ~ resolve: ~ contextValue:", typeof contextValue.user);

      return prisma.bookLikes.create({
        data: {
          userId: contextValue.user,
          // userId: args.userId,
          bookId: args.bookId,
        },
      });
    },
  })
);

builder.mutationField("deleteLike", (t) =>
  t.prismaField({
    type: "BookLikes",
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _root, { id }) => {
      return prisma.bookLikes.delete({ where: { id } });
    },
  })
);
// builder.mutationField("createOneMessage", (t) =>
//   t.prismaField({
//     type: "Message",
//     args: {
//       userId: t.arg.int({ required: true }),
//       body: t.arg.string({ required: true }),
//     },
//     resolve: async (_query, _root, args) => {
//       return prisma.message.create({
//         data: {
//           body: args.body,
//           userId: args.userId,
//         },
//       });
//     },
//   })
// );

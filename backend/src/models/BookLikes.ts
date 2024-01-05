import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("BookLikes", {
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeID("userId"),
    bookId: t.exposeID("bookId"),
  }),
});

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

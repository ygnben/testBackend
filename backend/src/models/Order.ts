import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Order", {
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeID("userId"),
    totalAmount: t.exposeFloat("totalAmount"),
    items: t.exposeField("items", {
      type: "OrderItem",
      list: true,
    }),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
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

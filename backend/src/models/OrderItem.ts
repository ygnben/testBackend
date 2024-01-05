import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("OrderItem", {
  fields: (t) => ({
    id: t.exposeID("id"),
    orderId: t.exposeID("orderId"),
    productId: t.exposeID("productId"),
    quantity: t.exposeInt("quantity"),
    totalPrice: t.exposeFloat("totalPrice"),
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

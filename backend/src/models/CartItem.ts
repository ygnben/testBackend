import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("CartItem", {
  fields: (t) => ({
    id: t.exposeID("id"),

    qty: t.exposeInt("qty"),
    book: t.relation("book"),
    shopcart: t.relation("shopCart"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});

builder.mutationField("addToCart", (t) =>
  t.prismaField({
    type: "CartItem",
    args: {
      qty: t.arg.int({ required: true }),
      // shopCartId: t.arg.int({ required: true }),
      bookId: t.arg.int({ required: true }),
    },
    resolve: async (_query, _root, args, contextValue: any) => {
      // const shopCart = await prisma.shopCart.findUnique({
      //   where: { id: contextValue },
      // });
      // if (!shopCart) {
      //   throw new Error("Shopping cart not found");
      // }
      return prisma.cartItem.create({
        data: {
          qty: args.qty,
          shopCartId: 4,
          bookId: args.bookId,
        },
      });
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

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
builder.queryField("cartItems", (t) =>
  t.prismaField({
    type: ["CartItem"],
    resolve: async (query, _root, _args, contextValue) => {
      const shopCart = await prisma.shopCart.findFirst({
        where: { userId: contextValue.user },
      });
      console.log({ ...query });
      return prisma.cartItem.findMany({ where: { shopCartId: shopCart?.id } });
    },
  })
);

builder.mutationField("addToCart", (t) =>
  t.prismaField({
    type: "CartItem",
    args: {
      qty: t.arg.int({ required: true }),
      // shopCartId: t.arg.int({ required: true }),
      bookId: t.arg.int({ required: true }),
    },
    resolve: async (_query, _root, args, contextValue) => {
      // console.log("🚀 ~ resolve: ~ contextValue:", typeof contextValue.user);

      const shopCart = await prisma.shopCart.findFirst({
        where: { userId: contextValue.user },
      });
      console.log("🚀 ~ resolve: ~ shopCart:", shopCart?.id);
      if (!shopCart) {
        throw new Error("Shopping cart not found");
      }
      return prisma.cartItem.create({
        data: {
          qty: args.qty,
          shopCartId: shopCart?.id,
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

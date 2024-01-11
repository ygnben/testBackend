import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("ShopCart", {
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeID("userId"),
  }),
});

builder.mutationField("createCart", (t) =>
  t.prismaField({
    type: "ShopCart",
    args: {
      userId: t.arg.int({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      return prisma.shopCart.create({
        data: {
          userId: args.userId,
        },
      });
    },
  })
);

builder.mutationField("addItem", (t) =>
  t.prismaField({
    type: "ShopCart",
    args: {
      userId: t.arg.int({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      return prisma.shopCart.create({
        data: {
          // body: args.body,
          userId: args.userId,
          create,
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

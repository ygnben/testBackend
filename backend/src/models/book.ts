import { builder } from "../builder";
import { prisma } from "../db";

// id        Int         @id @default(autoincrement())
// title     String
// desc      String?
// img       String
// catagory  String
// price     Int
builder.prismaObject("Book", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    desc: t.exposeString("desc", { nullable: true }),
    img: t.exposeString("img"),
    catagory: t.exposeString("catagory"),
    price: t.exposeInt("price"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
    }),
  }),
});

builder.mutationField("createOneMessage", (t) =>
  t.prismaField({
    type: "Message",
    args: {
      userId: t.arg.int({ required: true }),
      body: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      return prisma.message.create({
        data: {
          body: args.body,
          userId: args.userId,
        },
      });
    },
  })
);

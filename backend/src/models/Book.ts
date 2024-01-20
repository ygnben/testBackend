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
    // catagory: t.exposeString("catagory"),
    // price: t.exposeInt("price"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
    }),
  }),
});

// builder.queryField("Books", (t) =>
//   t.prismaField({
//     type: ["Book"],
//     resolve: async (query) => {
//       return prisma.book.findMany({ ...query });
//     },
//   })
// ),

builder.queryFields((t) => ({
  books: t.prismaField({
    type: ["Book"],
    resolve: async (query) => {
      return prisma.book.findMany({ ...query });
    },
  }),

  book: t.prismaField({
    type: "Book",
    nullable: true,
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _, args) => {
      return prisma.book.findUnique({
        where: {
          id: args.id,
        },
        ...query,
      });
    },
  }),
  searchBooks: t.prismaField({
    type: ["Book"],
    nullable: true,
    args: {
      title: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      return prisma.book.findMany({
        // where: {
        //   id: args.id,
        // },
        // ...query,
        where: {
          title: {
            contains: args.title,
            mode: "insensitive", // case-insensitive
          },
        },
      });
    },
  }),
}));

// builder.queryField("Book", (t) =>
//   t.prismaField({
//     type: "Book",
//     args:{
//       id: t.arg.int({ required: true }),
//     }
//     resolve: async (query,_,args) => {
//       return prisma.book.findUnique({
//         where: {
//           id: args.id,
//         },
//       });
//     },
//   })
// );

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

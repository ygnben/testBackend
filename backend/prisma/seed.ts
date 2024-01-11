import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Delete all `User` and `Message` records
  await prisma.user.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.bookLikes.deleteMany({});
  await prisma.shopCart.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.comment.deleteMany({});

  // (Re-)Create dummy `User` and `Message` records
  await prisma.user.create({
    data: {
      username: "test",
      password: "test",
    },
  });

  await prisma.book.create({
    data: {
      title: "test",
      desc: "test",
      img: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      catagory: "test",
      price: 10,
    },
  });

  await prisma.book.create({
    data: {
      title: "test2",
      desc: "test2",
      img: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      catagory: "test2",
      price: 120,
    },
  });
  // await prisma.user.create({
  //   data: {
  //     name: "Ryan",
  //     messages: {
  //       create: [
  //         {
  //           body: "A Note for Ryan",
  //         },
  //         {
  //           body: "Another note for Ryan",
  //         },
  //       ],
  //     },
  //   },
  // });
}

main().then(() => {
  console.log("Data seeded...");
});

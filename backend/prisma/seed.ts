import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// import fetch from "node-fetch";

// import fetch from "node-fetch";

async function main() {
  const fetch = require("node-fetch");

  // Delete all `User` and `Message` records
  // await prisma.user.deleteMany({});
  // await prisma.book.deleteMany({});
  // await prisma.bookLikes.deleteMany({});
  // await prisma.shopCart.deleteMany({});
  // await prisma.order.deleteMany({});
  // await prisma.comment.deleteMany({});

  // (Re-)Create dummy `User` and `Message` records
  // await prisma.user.create({
  //   data: {
  //     username: "test",
  //     password: "test",
  //   },
  // });

  let bookTitles: string[] = [
    "javascript",
    "html",
    "css",
    "react",
    "java",
    "python",
    "sql",
    "graphql",
  ];
  let books: any[] = [];
  for (const bookTitle of bookTitles) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`
    );

    const data = await response.json();
    books.push(data);
  }

  // await prisma.book.create({
  //   data: {
  //     title: "java",
  //     desc: "test",
  //     img: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  //     catagory: "test",
  //     price: 10,
  //   },
  // });
  let parsedBooks: any[] = [];
  for (const diffType of books) {
    // console.log("🚀 ~ main ~ books:", diffType.items);
    // parsedBooks = diffType.items.map((book: any) => {
    //   return {
    //     title: book.volumeInfo.title,
    //     // authors: book.volumeInfo.authors,
    //     desc: book.volumeInfo.description,
    //     img: book.volumeInfo.imageLinks?.thumbnail,
    //     // other fields...
    //   };
    // });

    parsedBooks.push(
      diffType.items.map((book: any) => {
        return {
          title: book.volumeInfo.title,
          // authors: book.volumeInfo.authors,
          desc: book.volumeInfo.description,
          img: book.volumeInfo.imageLinks?.thumbnail,
          // other fields...
        };
      })
    );

    // console.log(parsedBooks);
  }
  console.log(typeof parsedBooks);
  for (const data of parsedBooks) {
    await prisma.book.createMany({
      data,
    });
  }
  // await prisma.book.createMany({
  //   data: parsedBooks,
  // });

  // await prisma.book.create({
  //   data: {
  //     title: "html",
  //     desc: "test2",
  //     img: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  //     catagory: "test2",
  //     price: 120,
  //   },
  // });
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

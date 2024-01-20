const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=javascript`);
const books = await response.json();

const parsedBooks = books.items.map(book => {
    return {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      // other fields...
    };
  });


  
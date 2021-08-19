import React, { useState } from "react";
import { graphql, useQuery } from "@apollo/react-hooks";
import { GET_ONE_BOOK } from "../../utils/queries";
import { useRouter } from "next/router";
import Link from "next/link";

const Book = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const bookData = useQuery(GET_ONE_BOOK, {
    variables: { id: router.query.id },
  });

  const displayBook = () => {
    if (bookData.loading) return <p>Loading Books...</p>;
    else if (bookData.error) return <p>Error in fetching Books</p>;
    else if (bookData.data.book) {
      const book = bookData.data.book;
      return (
        <div>
          <p>Title : {book.name}</p>
          <p>Genre : {book.genre}</p>
          <p>Author : {book.author.name}</p>
          <p onClick={() => setOpen(!open)}>
            See other Books of {book.author.name}
          </p>
          {open &&
            book.author.books
              .filter((book) => book.id !== router.query.id)
              .map((book) => (
                <Link href={`/book/${book.id}`} key={book.id}>
                  <div
                    style={{
                      border: "1px solid black",
                      cursor: "pointer",
                      margin: "10px 0",
                    }}
                  >
                    <p>{book.name}</p>
                    <p>{book.genre}</p>
                  </div>
                </Link>
              ))}
        </div>
      );
    }
  };

  return (
    <div>
      <p>Book #{router.query.id}</p>
      {displayBook()}
    </div>
  );
};

export default Book;

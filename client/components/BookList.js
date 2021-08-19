import React, { useEffect } from "react";
import { GET_BOOKS } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";

const BookList = () => {
  const bookData = useQuery(GET_BOOKS);

  useEffect(() => {
    displayBook();
  }, []);

  const displayBook = () => {
    if (bookData.loading) return <p>Loading Books...</p>;
    else if (bookData.error) return <p>Error in fetching Books</p>;
    else if (bookData.data.books) {
      return bookData.data.books.map((book) => (
        <Link href={`/book/${book.id}`} key={book.id}>
          <div
            style={{
              border: "1px solid black",
              cursor: "pointer",
              margin: "10px 0",
            }}
          >
            <p>{book.id}</p>
            <p>{book.name}</p>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
          </div>
        </Link>
      ));
    }
  };

  return (
    <div>
      <p>Book List</p>
      {displayBook()}
    </div>
  );
};

export default BookList;

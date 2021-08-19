import React, { useEffect } from "react";
import { GET_BOOKS, DELETE_ONE_BOOK } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";

const BookList = () => {
  const bookData = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_ONE_BOOK);

  const deleteBookHandler = (id) => {
    deleteBook({
      variables: { id },
      refetchQueries: [{ query: GET_BOOKS }],
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(JSON.stringify(err, null, 2)));
  };
  const displayBook = () => {
    if (bookData.loading) return <p>Loading Books...</p>;
    else if (bookData.error) return <p>Error in fetching Books</p>;
    else if (bookData.data.books) {
      return bookData.data.books.map((book) => (
        <div
          key={book.id}
          style={{
            width: "500px",
            border: "1px solid black",
            margin: "10px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{book.id}</p>
          <p>{book.name}</p>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "100px",
            }}
          >
            <Link href={`/book/${book.id}`}>
              <p style={{ cursor: "pointer" }}>See detail</p>
            </Link>
            <p
              onClick={() => deleteBookHandler(book.id)}
              style={{ cursor: "pointer" }}
            >
              Delete
            </p>
          </div>
        </div>
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

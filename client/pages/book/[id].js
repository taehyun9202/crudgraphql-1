import React, { useState } from "react";
import { graphql, useMutation, useQuery } from "@apollo/react-hooks";
import { GET_BOOKS, GET_ONE_BOOK, UPDATE_BOOK } from "../../utils/queries";
import { useRouter } from "next/router";
import Link from "next/link";

const initialForm = { name: "", genre: "", authorId: "" };
const Book = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(initialForm);

  const [updateBook] = useMutation(UPDATE_BOOK);
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
          <p style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.genre) return null;
    updateBook({
      variables: {
        id: router.query.id,
        name: form.name,
        genre: form.genre,
        authorId: bookData.data.book.author.id,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(JSON.stringify(err, null, 2)));

    router.push("/");
  };

  const editBook = () => {
    if (bookData.loading) return <p>Loading Books...</p>;
    else if (bookData.error) return <p>Error in fetching Books</p>;
    else if (bookData.data.book) {
      const book = bookData.data.book;
      return (
        <form>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => handleChange(e)}
            placeholder={book.name}
          />
          <input
            type="text"
            name="genre"
            value={form.genre}
            onChange={(e) => handleChange(e)}
            placeholder={book.genre}
          />
          {/* <input
            type="text"
            name="authorId"
            value={form.authorId}
            onChange={(e) => handleForm(e)}
            placeholder={book.author.name}
          /> */}
          <p onClick={() => handleSubmit()}>Update</p>
        </form>
      );
    }
  };

  return (
    <div>
      <p>Book #{router.query.id}</p>
      {edit ? editBook() : displayBook()}

      <p style={{ cursor: "pointer" }} onClick={() => setEdit(!edit)}>
        {edit ? "Back" : "Edit"}
      </p>
    </div>
  );
};

export default Book;

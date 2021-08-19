import React, { useState } from "react";
import { GET_Authors, ADD_BOOK, GET_BOOKS } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/react-hooks";
const Addbook = () => {
  const authorData = useQuery(GET_Authors);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addBook] = useMutation(ADD_BOOK);

  const addBookHandler = () => {
    console.log(name, genre, authorId);
    const newBook = { name, genre, authorId };
    addBook({
      variables: { name: name, genre: genre, authorId: authorId },
      refetchQueries: [{ query: GET_BOOKS }],
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(JSON.stringify(err, null, 2)));
  };

  const displayAuthor = () => {
    if (authorData.loading) return <p>Loading authors...</p>;
    else if (authorData.error) return <p>Error in fetching authors</p>;
    else if (authorData.data.authors)
      return (
        authorData &&
        authorData.data.authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))
      );
  };
  return (
    <div>
      <p>Add Book</p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="add name"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="add genre"
      />
      <select onChange={(e) => setAuthorId(e.target.value)}>
        <option disabled selected>
          Select Author
        </option>
        {displayAuthor()}
      </select>
      <button type="submit" onClick={() => addBookHandler()}>
        Add Book
      </button>
    </div>
  );
};

export default Addbook;

import { gql, useQuery } from "@apollo/react-hooks";

// export const getAuthorsQuery = gql`
//   {
//     authors {
//       name
//       age
//       id
//     }
//   }
// `;

export const GET_Authors = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

// export const getBooksQuery = gql`
//   {
//     books {
//       name
//       genre
//       id
//     }
//   }
// `;

export const GET_BOOKS = gql`
  {
    books {
      name
      genre
      id
      author {
        name
        age
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      author {
        name
        id
      }
    }
  }
`;

// export const ADD_BOOK = gql`
//   mutation {
//     addBook(name: "Lsdfsdfena", genre: "sdfsdf", authorId: "sdhfkjsdhfkjs") {
//       name
//       genre
//       authorId
//     }
//   }
// `;

// export const addBookMuation = gql`;
//   {
//     mutation {
//       addBook(name: "", genre: "", authorId: "") {
//         id
//         name
//         genre
//       }
//     }
//   }
// `;

export const GET_ONE_BOOK = gql`
  query ($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`;

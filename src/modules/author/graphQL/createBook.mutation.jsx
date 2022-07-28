import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $authorId: Float!) {
    createBook(input: { title: $title, authorId: $authorId }) {
      id
      title
      author {
        id
        fullName
      }
    }
  }
`;

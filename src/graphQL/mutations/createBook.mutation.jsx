import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $authorId: Number!) {
    createBook(input: { title: $ftitle, authorId: $authorId }) {
      id
      title
      author {
        id
        fullName
      }
    }
  }
`;

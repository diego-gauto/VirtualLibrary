import { gql } from "@apollo/client";

export const DELETE_BOOK = gql`
  mutation deleteBook($id: Int!) {
    deleteBookById(input: { bookId: $id })
  }
`;

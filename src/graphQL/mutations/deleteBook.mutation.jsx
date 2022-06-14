import { gql } from "@apollo/client";

export const DELETE_BOOK = gql`
  mutation deleteBook($id: Float!) {
    deleteBookById(input: { bookId: $id })
  }
`;

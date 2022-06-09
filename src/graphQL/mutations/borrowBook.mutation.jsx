import { gql } from "@apollo/client";

export const BORROW_BOOK = gql`
  mutation borrowBook($bookId: Float!, $userId: Float!) {
    borrowBook(input: { bookId: $bookId, userId: $userId })
  }
`;

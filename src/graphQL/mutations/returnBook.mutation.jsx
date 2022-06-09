import { gql } from "@apollo/client";

export const RETURN_BOOK = gql`
  mutation borrowBook($bookId: Float!, $userId: Float!) {
    returnBook(input: { bookId: $bookId, userId: $userId })
  }
`;

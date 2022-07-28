import { gql } from "@apollo/client";

export const BOOK = gql`
  query bookById($id: Float!) {
    getBookById(input: { bookId: $id }) {
      id
      title
      isOnLoan
      returnBookDate
      author {
        id
        fullName
      }
    }
  }
`;

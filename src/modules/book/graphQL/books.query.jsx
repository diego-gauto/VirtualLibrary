import { gql } from "@apollo/client";

export const BOOKS = gql`
  query {
    getAllBooks {
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

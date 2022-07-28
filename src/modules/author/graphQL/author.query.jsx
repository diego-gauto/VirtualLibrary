import { gql } from "@apollo/client";

export const AUTHOR = gql`
  query authorById($id: Float!) {
    getAuthorById(input: { id: $id }) {
      id
      fullName
      books {
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
  }
`;

import { gql } from "@apollo/client";

export const USER = gql`
  query user($id: Float!) {
    getUser(input: { userId: $id }) {
      id
      fullName
      email
      nBooks
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

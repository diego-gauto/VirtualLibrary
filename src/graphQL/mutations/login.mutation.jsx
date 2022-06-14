import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        id
        fullName
        email
        nBooks
        books {
          id
          title
          isOnLoan
          author {
            fullName
            id
          }
          borrowBookDate
          returnBookDate
        }
      }
      jwt
    }
  }
`;

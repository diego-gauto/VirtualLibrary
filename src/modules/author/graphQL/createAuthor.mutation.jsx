import { gql } from "@apollo/client";

export const CREATE_AUTHOR = gql`
  mutation createAuthor($fullName: String!) {
    createAuthor(input: { fullName: $fullName }) {
      id
      fullName
      books {
        id
        title
      }
    }
  }
`;

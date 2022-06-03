import { gql } from "@apollo/client";

export const AUTHORS = gql`
  query {
    getAllAuthors {
      id
      fullName
      books {
        id
        title
      }
    }
  }
`;

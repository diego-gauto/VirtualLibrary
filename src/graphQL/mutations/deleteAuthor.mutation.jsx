import { gql } from "@apollo/client";

export const DELETE_AUTHOR = gql`
  mutation deleteAuthor($id: Float!) {
    deleteAuthorById(input: { id: $id })
  }
`;

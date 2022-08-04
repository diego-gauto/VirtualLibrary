import React from "react";
import UserInfo from "./components/userInfo";
import { USER } from "./graphQL/user.query";
import { useQuery } from "@apollo/client";
import { Container } from "react-bootstrap";
import BooksList from "../../components/bookList.component";
import { restoreUser } from "./utils/restoreUser";

const User = () => {
  const user = restoreUser();

  const { loading, error, data } = useQuery(USER, {
    variables: { id: user.id },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>`Error! ${error.message}`</div>;

  const userInfo = data.getUser;

  return (
    <Container>
      <div>
        <UserInfo
          username={userInfo.fullName}
          email={userInfo.email}
          nBooks={userInfo.books.length}
        />
      </div>
      <div>
        <h5>Your taken books:</h5>
        <BooksList books={userInfo.books} />
      </div>
    </Container>
  );
};

export default User;

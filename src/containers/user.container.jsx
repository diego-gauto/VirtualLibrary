import UserProfileCard from "../components/userProfile.component";
import BookCard from "../components/bookCard.component";
import { USER } from "../graphQL/queries/user.query";
import { useQuery } from "@apollo/client";
import { AUTH } from "../constants";

const UserContainer = () => {
  const restoreUser = () => {
    const user = localStorage.getItem(AUTH.user);
    let decodedUser = {};
    if (user) {
      decodedUser = JSON.parse(user);
    }
    return decodedUser;
  };

  const user = restoreUser();

  const { loading, error, data } = useQuery(USER, {
    variables: { id: user.id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) return `Error! ${error.message}`;

  const userInfo = data.getUser;
  console.log(userInfo);
  return (
    <>
      <div>
        <UserProfileCard
          username={userInfo.fullName}
          nBooks={userInfo.books.length}
        />
      </div>
      <div className="row px-2">
        {userInfo.books.map((book) => {
          return (
            <BookCard
              key={book.id}
              book={book}
              //              hasReturn={hasReturn}
              //              setHasReturn={setHasReturn}
            />
          );
        })}
      </div>
    </>
  );
};

export default UserContainer;

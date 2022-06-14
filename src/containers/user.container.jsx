import UserProfileCard from "../components/userProfile.component";
import { useUserContext } from "../context/user.context";
import BookCard from "../components/bookCard.component";
import { USER } from "../graphQL/queries/user.query";
import { useQuery } from "@apollo/client";

const UserContainer = () => {
  const { user } = useUserContext();
  //const [hasReturn, setHasReturn] = useState(true);

  // useEffect(() => {}, [hasReturn]);
  // console.log(hasReturn);

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
          nBooks={userInfo.nBooks}
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

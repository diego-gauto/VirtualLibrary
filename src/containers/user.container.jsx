import UserProfileCard from "../components/userProfile.component";
import { useUserContext } from "../context/user.context";
import BookCard from "../components/bookCard.component";

const UserContainer = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <>
      <div>
        <UserProfileCard username={user.fullName} nBooks={user.nBooks} />
      </div>
      <div className="row px-2">
        {user.books.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </div>
    </>
  );
};

export default UserContainer;
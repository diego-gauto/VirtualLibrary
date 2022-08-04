import React from "react";
import { useNavigate } from "react-router-dom";

const AuthorRow = ({ author }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/author/${author.id}`);
  };

  return (
    <>
      <tr className="pointer" onClick={handleClick}>
        <td>{author.fullName}</td>
        <td>{author.books.length}</td>
      </tr>
    </>
  );
};

export default AuthorRow;

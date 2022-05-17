import React from "react";
import { events } from "../../store";

const Comment = ({ userId, text, remove, commentId, dateOfCreation }) => {

  const { users } = events

  const getAuthorUserName = (id) => {
    const user = users.find((x) => x.id === id);
    return (user && user.username) || "Unknown Author";
  };

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      {userData.id === userId ? (
        <div className="input">
          <div className="comment__username">
            <label>{getAuthorUserName(userId)} {new Date(dateOfCreation).toLocaleString()}</label>
            <div style={{cursor: 'pointer', color: 'red'}} onClick={() => {remove(commentId)}}>Удалить</div>
          </div>
          <p>{text}</p>
        </div>
      ) : (
        <div className="input">
          <label>{getAuthorUserName(userId)} </label>
          <p>{text}</p>
        </div>
      )}
    </>
  );
};
export default Comment;

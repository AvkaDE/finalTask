import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { events } from "../../store";
import Comment from "./comment";

const Comments = observer(({ id }) => {

  const userData = JSON.parse(localStorage.getItem("userData"));

  const [comment, setComment] = useState({
    taskId: `${id}`,
    userId: `${userData.id}`,
    text: "",
    dateOfCreation: new Date(),
  });

  const [comments, setComments] = useState([]);

  const textAreaRef = useRef()

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = () => {
    events.addComment(comment).then(() => {
      textAreaRef.current.value = ''
      events.fetchComments(id).then((data) => setComments(data));
    });
  };

  const handleDelete = (commentId) => {
    events.deleteComment(commentId).then(() => {
      events.fetchComments(id).then((data) => setComments(data));
    });
  };

  useEffect(() => {
    if (id) {
      events.fetchComments(id).then((data) => setComments(data));
    }
  }, [id]);

  return (
    <section className="task__comments">
      <div className="input__container">
        <div className="input">
          <label>Комментарии (1)</label>
          <textarea
            name="text"
            rows="4"
            placeholder="Текст комментария"
            className="form__item comment__text"
            ref={textAreaRef}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="success__button">
            Добавить комментарий
          </button>
        </div>
        {comments.map((x) => (
          <Comment
            text={x.text}
            userId={x.userId}
            remove={handleDelete}
            commentId={x.id}
            dateOfCreation={x.dateOfCreation}
          />
        ))}
      </div>
    </section>
  );
});
export default Comments;

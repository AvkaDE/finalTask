import React, { useEffect, useState } from "react";
import low from "../../img/Low.svg";
import high from "../../img/High.svg";
import middle from "../../img/Mid.svg";
import { ReactComponent as MenuIcon } from "../../img/Icon.svg";
import { events } from "../../store";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const Event = ({ data: { type, title, assignedId, status, rank, id } }) => {
  const checkStatus = (status) => {
    switch (status) {
      case "inProgress":
        return (
          <td className="tasks__status__table">
            <label className="status at__work">В работе</label>
          </td>
        );
      case "testing":
        return (
          <td className="tasks__status__table">
            <label className="status at__work">Тестирование</label>
          </td>
        );
      case "complete":
        return (
          <td className="tasks__status__table">
            <label className="status done">Сделано</label>
          </td>
        );
      default:
        return (
          <td className="tasks__status__table">
            <label className="status open">Открыто</label>
          </td>
        );
    }
  };

  const { users } = events;

  const checkPriority = (priority) => {
    switch (priority) {
      case "high":
        return (
          <td className="tasks__priority__table priority__high">
            <img src={high} alt="" className="priority"></img>Высокий
          </td>
        );
      case "medium":
        return (
          <td className="tasks__priority__table priority__middle">
            <img src={middle} alt="" className="priority"></img>Средний
          </td>
        );
      default:
        return (
          <td className="tasks__priority__table priority__low">
            <img src={low} alt="" className="priority"></img>Низкий
          </td>
        );
    }
  };

  const [buttonState, setButtonState] = useState(false);

  const getUserName = (id) => {
    const user = users.find((x) => x.id === id);
    return (user && user.username) || "Unknown";
  };

  const location = useLocation();

  const checkPage = () => {
    if (location.pathname.split("/")[1] === "user") return true;
  };

  const changeStatus = async (status) => {
    await events.patchTaskStatus(id, status)
    events.fetchTasks()
  }

  const checkForPatch = (status) => {
    switch (status) {
      case "complete":
        return (
          <li onClick={() => changeStatus('opened')}>Переоткрыть</li>
        );
      case "testing":
        return (
          <>
            <li onClick={() => changeStatus('complete')}>Сделано</li>
            <li onClick={() => changeStatus('opened')}>Переоткрыть</li>
          </>
        );
      case "inProgress":
        return (
          <>
            <li onClick={() => changeStatus('testing')}>На тестирование</li>
            <li onClick={() => changeStatus('opened')}>Переоткрыть</li>
            <li onClick={() => changeStatus('complete')}>Сделано</li>
          </>
        );
      default:
        return (
          <>
            <li onClick={() => changeStatus('inProgress')}>Взять в работу</li>
            <li onClick={() => changeStatus('complete')}>Сделано</li>
          </>
        );
    }
  };

  const handleDelete = (id) => {
    events.deleteTask(id);
  };

  return (
    <>
      <tr>
        <td className="tasks__type__table">
          {type === "bug" ? (
            <div className="type__icon error__icon">
              <div className="ellipse" />
            </div>
          ) : (
            <div className="type__icon task__icon">
              <div className="ellipse" />
            </div>
          )}
        </td>
        <td className="tasks__name__table">
          <Link style={{ textDecoration: "none" }} to={`/task/${id}`}>
            {title}
          </Link>
        </td>
        <td className="tasks__username__table">{getUserName(assignedId)}</td>
        {checkStatus(status)}
        {checkPriority(rank)}
        {checkPage() ? (
          ""
        ) : (
          <td className="table__button__table">
            <div
              className={`event__button ${buttonState ? "active" : ""}`}
              onClick={() => setButtonState(!buttonState)}
            >
              <ul className="button-modal">
                <li>
                  <Link
                    style={{ textDecoration: "none", fontSize: 12 }}
                    to={`/taskedit/${id}`}
                  >
                    Редактировать
                  </Link>
                </li>
                <li
                  style={{ textDecoration: "none", fontSize: 12, color: "red" }}
                  onClick={() => handleDelete(id)}
                >
                  Удалить
                </li>
                {checkForPatch(status)}
              </ul>
              <MenuIcon fill={buttonState ? "white" : "#7B61FF"} />
            </div>
          </td>
        )}
      </tr>
    </>
  );
};
export default Event;

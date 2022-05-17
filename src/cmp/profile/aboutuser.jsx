import { React, useEffect, useState } from "react";
import ModalWindow from "../ui/modal/modal";
import { events } from "../../store";
import Event from "../table/event";
import { Link } from "react-router-dom";
import Pagination from "../pagination/pagination";

const Aboutuser = ({ id }) => {
  const [modal, setModal] = useState(false);

  const { users } = events;

  const [assignedTasks, setAssignedTasks] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
    total: 0,
  });
  const {page, limit, total} = pagination

  const getUserName = (id) => {
    const user = users.find((x) => x.id === id);
    return (user && user.username) || "Unknown User";
  };

  const userData = JSON.parse(localStorage.getItem("userData"));

  const checkAccess = (id) => {
    if (userData.id === `${id}`) return true;
  };

  const [user, setUser] = useState({
    id: userData.id,
    login: userData.login,
    username: userData.username,
    about: userData.about,
    photoUrl: userData.photoUrl,
    password: userData.password,
  });

  useEffect(() => {
    if (id) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      events.getUser(id).then((result) => {
        setUser({ ...result, password: userData.password });
      });
      events.getAssignedTasks(id, pagination.page).then((res) => {
        const { data, page, limit, total } = res || {};
        setAssignedTasks(data || []);
        setPagination({ page, limit, total });
      });
    }
  }, [id, pagination.page]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    events.editUser(user);
  };

  const onPageChange = (index) => {
    if (index < 0 || Math.ceil(pagination.total / pagination.limit) <= index)
      return;
    
    events.getAssignedTasks(id, index).then((res) => {
      const { data, page, limit, total } = res || {};
      setAssignedTasks(data || []);
      setPagination({ page, limit, total });
    });
  };

  return (
    <>
      <ModalWindow
        visible={modal}
        user={user}
        setVisible={setModal}
        handleSubmit={handleSubmit}
        onChange={handleChange}
      />
      <div className="card__wrapper">
        <div className="card__header">
          <h1>{getUserName(id)}</h1>
          <div className="card__header__buttons">
            {checkAccess(id) ? (
              <>
                <Link
                  to="/create"
                  state={{ assignedId: userData.id }}
                  className="cancel__button"
                >
                  Добавить задачу
                </Link>
                <button
                  onClick={() => setModal(true)}
                  className="primary__button"
                >
                  Редактировать
                </button>
              </>
            ) : (
              <Link
                to="/create"
                state={{ assignedId: id }}
                className="cancel__button"
              >
                Добавить задачу
              </Link>
            )}
          </div>
        </div>
        <div className="board card__board">
          <form className="create__form">
            <section className="task__info">
              <div className="input__container">
                <div className="avatar__wrapper">
                  <img className="avatar" src={user.photoUrl}></img>
                </div>
                <div className="input">
                  <label>О себе</label>
                  <p>{user.about}</p>
                </div>
              </div>
            </section>
            <section className="user__tasks__wrapper">
              <div className="input__container description__container">
                <div className="input description__container">
                  <label>Задачи</label>
                  <div className="table__wrapper users__table__wrapper">
                    <table className="tasks main__table">
                      <tbody>
                        {assignedTasks.map((x) => (
                          <Event data={x} key={x.id} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    page={page}
                    itemsPerPage={limit}
                    total={total}
                    onChange={onPageChange}
                  />
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};
export default Aboutuser;

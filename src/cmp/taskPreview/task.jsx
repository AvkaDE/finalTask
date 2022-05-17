import { observer } from "mobx-react-lite";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { events } from "../../store";
import ModalWindow from "../ui/modal/modal";
import Comments from "./comments";

const Task = observer(({ id }) => {
  const [showModal, setShowModal] = useState(false);

  const { users } = events;
  const navigate = useNavigate()

  const getAssignedUserName = (id) => {
    const user = users.find((x) => x.id === id);
    return (user && user.username) || "Unknown Worker";
  };

  const getAuthorUserName = (id) => {
    const user = users.find((x) => x.id === id);
    return (user && user.username) || "Unknown Author";
  };

  const [item, setItem] = useState({
    id: "",
    userId: "",
    assignedId: "",
    title: "",
    description: "",
    type: "",
    dateOfCreation: "",
    dateOfUpdate: "",
    timeInMinutes: 0,
    status: "",
    rank: "",
  });

  useEffect(() => {
    if (id) {
      events.getEvent(id).then((result) => {
        setItem(result);
      });
    }
  }, [id]);

  const transformPriority = (priority) => {
    if (priority === "medium") return "Средний";
    if (priority === "low") return "Низкий";
    return "Высокий";
  };

  const handleSelectChange = () => {
    events.getEvent(id).then((result) => {
      setItem(result);
    });
  };

  const handleDelete = (id) => {
    events.deleteTask(id)
    navigate('/')
  }

  const changeStatus = async (status) => {
    await events.patchTaskStatus(item.id, status)
    events.fetchTasks()
    events.getEvent(id).then((result) => {
      setItem(result);
    });
  }

  const checkForPatch = (status) => {
    switch (status) {
      case "complete":
        return (
          <button onClick={() => changeStatus('opened')} style={{cursor: 'pointer'}} className="cancel__button">Переоткрыть</button>
        );
      case "testing":
        return (
          <>
            <button onClick={() => changeStatus('complete')} style={{cursor: 'pointer'}} className="cancel__button">Сделано</button>
            <button onClick={() => changeStatus('opened')} style={{cursor: 'pointer'}} className="cancel__button">Переоткрыть</button>
          </>
        );
      case "inProgress":
        return (
          <>
            <button onClick={() => changeStatus('testing')} style={{cursor: 'pointer'}} className="cancel__button">На тестирование</button>
            <button onClick={() => changeStatus('opened')} style={{cursor: 'pointer'}} className="cancel__button">Переоткрыть</button>
            <button onClick={() => changeStatus('complete')} style={{cursor: 'pointer'}} className="cancel__button">Сделано</button>
          </>
        );
      default:
        return (
          <>
            <button onClick={() => changeStatus('inProgress')} style={{cursor: 'pointer'}} className="cancel__button">Взять в работу</button>
            <button onClick={() => changeStatus('complete')} style={{cursor: 'pointer'}} className="cancel__button">Сделано</button>
          </>
        );
    }
  };

  const checkStatus = (status) => {
    switch (status) {
      case "inProgress":
        return (
          <div className="tasks__status__table">
            <label className="status at__work">В работе</label>
          </div>
        );
      case "testing":
        return (
          <div className="tasks__status__table">
            <label className="status at__work">Тестирование</label>
          </div>
        );
      case "complete":
        return (
          <div className="tasks__status__table">
            <label className="status done">Сделано</label>
          </div>
        );
      default:
        return (
          <div className="tasks__status__table">
            <label className="status open">Открыто</label>
          </div>
        );
    }
  };

  function formatTime(minutes) {
    const days = (minutes % 1440 === 0) ? Math.round(minutes / 1440) :  Math.floor(minutes / 1440)
    minutes = minutes - days * 1440
    const hours = (minutes % 60 === 0) ? Math.round(minutes / 60) : Math.floor(minutes / 60)
    const mins = minutes - hours * 60
    
    let daysSuffix = 'ень', hoursSuffix = ''
    
    if (days > 1 && days < 5) {
      daysSuffix = 'ня'
    }
    else if (days !== 1) { 
      daysSuffix = 'ней'
    }
    
    if (hours > 1 && hours < 5) {
      hoursSuffix = 'а'
    }
    else if (hours !== 1) { 
      hoursSuffix = 'ов'
    }
    
    return `${days} д${daysSuffix}, ${hours} час${hoursSuffix}, ${mins} минут`
  }

  return (
    <>
      <ModalWindow
        visible={showModal}
        setVisible={setShowModal}
        item={item}
        onChange={handleSelectChange}
      />
      <div className="card__wrapper">
        <div className="card__header">
          <h1 style={{display: 'flex', alignItems: 'center', gap: 10}}>{item.title} {checkStatus(item.status)}</h1>
          <div className="card__header__buttons">
            {checkForPatch(item.status)}
            <Link to={`/taskedit/${item.id}`} className="primary__button">Редактировать</Link>
            <button 
            onClick={() => handleDelete(item.id)}
            style={{cursor: 'pointer'}} 
            className="delete__button">
              Удалить
            </button>
          </div>
        </div>
        <div className="board card__board">
          <div className="create__form">
            <section className="task__info">
              <div className="input__container">
                <div className="input">
                  <label>Исполнитель</label>
                  <p>{getAssignedUserName(item.assignedId)}</p>
                </div>
                <div className="input">
                  <label>Автор задачи</label>
                  <p>{getAuthorUserName(item.userId)}</p>
                </div>
                <div className="input">
                  <label>Тип запроса</label>
                  <p>{item.type === "task" ? "Задача" : "Ошибка"}</p>
                </div>
                <div className="input">
                  <label>Приоритет</label>
                  <p>{transformPriority(item.rank)}</p>
                </div>
                <div className="input">
                  <label>Дата создания</label>
                  <p>{new Date(item.dateOfCreation).toLocaleString()}</p>
                </div>
                <div className="input">
                  <label>Дата изменения</label>
                  <p>{new Date(item.dateOfUpdate).toLocaleString()}</p>
                </div>
                <div className="input">
                  <label>Затрачено времени</label>
                  <p>{formatTime(item.timeInMinutes)}</p>
                </div>
              </div>
              <button
                className="primary__button"
                onClick={() => setShowModal(true)}
              >
                Сделать запись о работе
              </button>
            </section>
            <section className="task__description">
              <div className="input__container description__container">
                <div className="input description__container">
                  <label>Описание</label>
                  <p>{item.description}</p>
                </div>
              </div>
            </section>
            <Comments id={id} />
          </div>
        </div>
      </div>
    </>
  );
});
export default Task;

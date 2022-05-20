import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import SelectInput from "../ui/select/selectInput";
import { events } from "../../store/";
import { observer } from "mobx-react-lite";

const Create = observer(({ isEdit, id }) => {
  const { users } = events;

  const taskType = [
    { title: "Задача", value: "task" },
    { title: "Ошибка", value: "bug" },
  ];

  const priorityType = [
    { title: "Низкий", value: "low" },
    { title: "Средний", value: "medium" },
    { title: "Высокий", value: "high" },
  ];

  const location = useLocation()

  const history = useNavigate();

  const locationState = location.state || {}

  const userData = JSON.parse(localStorage.getItem("userData"));

  const [item, setItem] = useState({
    userId: userData.id,
    assignedId: locationState.assignedId || "",
    title: "",
    description: "",
    status: "opened",
    type: "",
    rank: "",
    timeInMinutes: 0,
  });

  useEffect(() => {
    if (isEdit) {
      events.getEvent(id)
        .then((event) => {
          setItem(event)
        })
    }
  }, [id, isEdit])

  const handleSelectChange = (name, value) => {
    setItem({ ...item, [name]: value });
  };

  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    setItem({ ...item, [name]: value });
  };

  const createTask = (evt) => {
    evt.preventDefault();
    events.addTask(item);
    history('/');
  };

  return (
    <div className="card__wrapper">
      <div className="card__header">
        <h1>{ isEdit ? 'Редактирование' : 'Создание' }</h1>
        <div className="card__header__buttons">
          <button onClick={createTask} className="primary__button">
            Сохранить
          </button>
          <button className="default__button">Отмена</button>
        </div>
      </div>
      <div className="board card__board">
        <form className="create__form">
          <section className="task__info">
            <div className="input__container">
              <div className="input">
                <label>Исполнитель</label>
                <SelectInput
                  name="assignedId"
                  params={users.map(x => ({ title: x.username, value: x.id }))}
                  str={"Выберите пользователя"}
                  value={item.assignedId}
                  zTitle={7}
                  zContent={6}
                  onChange={handleSelectChange}
                />
              </div>
              <div className="input">
                <label>Тип запроса</label>
                <SelectInput
                  name="type"
                  params={taskType}
                  str={"Выберите тип запроса"}
                  value={item.type}
                  zTitle={5}
                  zContent={4}
                  onChange={handleSelectChange}
                />
              </div>
              <div className="input">
                <label>Приоритет</label>
                <SelectInput
                  name="rank"
                  params={priorityType}
                  str={"Выберите приоритет запроса"}
                  value={item.rank}
                  zTitle={3}
                  zContent={2}
                  onChange={handleSelectChange}
                  />
              </div>
            </div>
          </section>
          <section className="task__description">
            <div className="input__container description__container">
              <div className="input">
                <label>Название</label>
                <input
                  defaultValue={item.title}
                  onChange={handleFieldChange}
                  name="title"
                  type="text"
                  className="form__item"
                ></input>
              </div>
              <div className="input description__container">
                <label>Описание</label>
                <textarea
                  defaultValue={item.description}
                  onChange={handleFieldChange}
                  name="description"
                  rows="20"
                  cols="10"
                  className="form__item input__description"
                ></textarea>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
});
export default Create;

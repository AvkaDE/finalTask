import React, { useState } from "react";
import { useLocation } from "react-router";
import { events } from "../../../store";
import SelectInput from "../select/selectInput";
import cl from "./modal.module.css";

const ModalWindow = ({  user, visible, setVisible, onChange, item, handleSubmit }) => {
  const rootClasses = [cl.modalWindow];
  if (visible) {
    rootClasses.push(cl.active);
  }

  const userData = JSON.parse(localStorage.getItem("userData"));

  const selectData = [
    { title: "Дни", value: 1 },
    { title: "Часы", value: 2 },
    { title: "Минуты", value: 3 },
  ];

  const calculateTime = (value, timeInMinutes) => {
    if (value === 1) {
      return timeInMinutes * 1440;
    } else if (value === 2) {
      return timeInMinutes * 60;
    } else if (value === 3) {
      return timeInMinutes;
    }
  };

  const [timeValue, setTimeValue] = useState({
    timeInMinutes: 0,
    value: 0,
  });

  const [workTime, setWorkTime] = useState({
    timeInMinutes: 0,
    comment: "",
    currentUser: userData.id,
  });

  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    setWorkTime({ ...workTime, [name]: value });
  };

  const handleTimeValue = (evt) => {
    const { name, value } = evt.target;
    setTimeValue({ ...timeValue, [name]: Number(value)});
    setWorkTime({ ...workTime, timeInMinutes: calculateTime(timeValue.value, Number(value))});
  };

  const handleSelectChange = (name, value) => {
    setTimeValue({ ...timeValue, [name]: value });
    setWorkTime({ ...workTime, timeInMinutes: calculateTime(value, timeValue.timeInMinutes)});
  };

  const submitWorkTime = (e) => {
    e.preventDefault()
    events.patchWorkTime(item.id, workTime).then(() => {
      onChange()
    })
    setVisible(false)
  }

  const location = useLocation();

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={cl.modalWindowContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cl.modal__container}>
          <div className={cl.modal__title}>
            {location.pathname.split('/')[1] === 'user'
              ? "Редактирование пользователя"
              : "Запись о работе"}
          </div>
          <div className={cl.modal__body}>
            <div className={cl.form__container}>
              <form className={cl.form__body}>
                {location.pathname.split("/")[1] === "task" ? (
                  <>
                    <div className={cl.select__input}>
                      <label>Затраченное время</label>
                      <input
                        name="timeInMinutes"
                        placeholder="Введите затраченное время"
                        className="form__item"
                        type="number"
                        onChange={handleTimeValue}
                      />
                    </div>
                    <div className={cl.select__input}>
                      <label>Единица измерения</label>
                      <SelectInput
                        name="value"
                        params={selectData}
                        str={"Выберите единицы измерения"}
                        onChange={handleSelectChange}
                        value={timeValue.value}
                      />
                    </div>
                    <div className={cl.select__input}>
                      <label>Комментарий</label>
                      <textarea
                        name="comment"
                        className="form__item input__description"
                        style={{ height: 76, resize: "none" }}
                        onChange={handleFieldChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={cl.select__input}>
                      <label>Имя пользователя</label>
                      <input
                        name="username"
                        placeholder="Введите имя пользователя"
                        className="form__item"
                        type="text"
                        defaultValue={user.username}
                        onChange={onChange}
                      />
                    </div>
                    <div className={cl.select__input}>
                      <label>URL фотографии</label>
                      <input
                        name="photoUrl"
                        placeholder="Введите URL"
                        className="form__item"
                        type="text"
                        defaultValue={user.photoUrl}
                        onChange={onChange}
                      />
                      <label>О себе</label>
                    </div>
                    <div className={cl.select__input}>
                      <textarea
                        name="about"
                        className="form__item input__description"
                        style={{ height: 76, resize: "none" }}
                        defaultValue={user.about}
                        onChange={onChange}
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
          <div className={cl.modal__buttons}>
            {location.pathname.split("/")[1] === "task" ? (
              <button onClick={submitWorkTime} className="primary__button">
                Добавить
              </button>
            ) : (
              <button onClick={handleSubmit} className="primary__button">
                Сохранить
              </button>
            )}
            <button
              className="default__button"
              onClick={() => setVisible(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalWindow;

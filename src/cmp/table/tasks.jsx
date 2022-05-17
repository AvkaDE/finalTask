import { React } from "react";
import { events } from "../../store";
import Pagination from "../pagination/pagination";
import Event from "./event";
import FilterTable from './filter'

const Tasks = ({ tasks, pagination: {page, limit, total} }) => {

  const onPageChange = (index) => {
    if (index < 0 || Math.ceil(total / limit) <= index) return
    events.fetchTasks(index)
  }

  return (
    <>
      <div className="card__wrapper">
        <div className="card__header">
          <h1>Задачи</h1>
          <button
            onClick={() => window.location.assign("/create")}
            className="primary__button"
          >
            Добавить задачу
          </button>
        </div>
        <div className="board card__board">
          <FilterTable />
          <div className="table__wrapper main__table__wrapper">
            <table className="tasks main__table">
              <tbody>
                {tasks.map(x => (
                  <Event data={x} key={x.id}/>
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
    </>
  );
};
export default Tasks;

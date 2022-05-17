import { React, useEffect, useState } from "react";
import { events } from "../../store";
import Pagination from "../pagination/pagination";
import User from "./user";

const Users = () => {

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
    total: 0,
  });
  const {page, limit, total} = pagination

  const [users, setUsers] = useState([])

  useEffect(() => {
      events.postUsers(page).then((res) => {
        const { data, page, limit, total } = res || {};
        setUsers(data || []);
        setPagination({ page, limit, total });
      });
  }, [page]);

  const onPageChange = (index) => {
    if (index < 0 || Math.ceil(total / limit) <= index)
      return;
    
    events.postUsers(index).then((res) => {
      const { data, page, limit, total } = res || {};
      setUsers(data || []);
      setPagination({ page, limit, total });
    });
  };

  return (
    <div className="card__wrapper">
      <div className="card__header">
        <h1>Пользователи</h1>
      </div>
      <div className="board card__board">
        <div className="table__wrapper users__table__wrapper">
          <table className="tasks">
            <tbody>
              {users.map((user) => (
                <User {...user} key={user.id} />
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
  );
};
export default Users;

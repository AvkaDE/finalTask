import React from "react";

const Pagination = ({ page, itemsPerPage, total, onChange }) => {
  const pageNumbers = [];

  const firstItemNum = page * itemsPerPage, 
  lastItemNum = (page + 1) * itemsPerPage

  for (let i = 1; i <= Math.ceil(total / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination__buttons">
        <button 
          className={`${page > 0 ? 'cancel' : 'disabled'}__button`}
          type="button"
          onClick={() => onChange(page - 1)}
        >
          Назад
        </button>
        {pageNumbers.map(n => (
          <button 
          key={n} 
          className={`page__num ${page + 1 === n ? 'active' : ''}`}
          type="button"
          onClick={() => onChange(n - 1)}>{n}</button>
        ))}
        <button 
          className={`${(page === Math.ceil(total / itemsPerPage - 1)) || total === 0 ? 'disabled' : 'cancel'}__button`}
          type="button"
          onClick={() => onChange(page + 1)}
        >
          Вперёд
        </button>
      </div>
      <label>Показано {total === 0 ? 0 : firstItemNum + 1} - {lastItemNum > total ? total : lastItemNum} из {total}</label>
    </div>
  );
};
export default Pagination;

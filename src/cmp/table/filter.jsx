import React, { useState } from 'react';
import { events } from '../../store';
import SelectCheckbox from '../ui/select/selectCheckbox';

const FilterTable = () => {

  const { users } = events

  const typeData = [
    {title: 'Ошибка', value: 'bug'},
    {title: 'Задача', value: 'task'},
  ]

  const usernameData = users.map(n => ({
    title: n.username , value: n.id
  }))

  const statusData = [
    {title: 'Открыто', value: 'opened'},
    {title: 'В работе', value: 'inProgress'},
    {title: 'Тестируется', value: 'testing'},
    {title: 'Сделано', value: 'complete'},
  ]

  const priorityData = [
    {title: 'Низкий', value: 'low'},
    {title: 'Средний', value: 'medium'},
    {title: 'Высокий', value: 'high'},
  ]

  const [searchQuery, setSearchQuery] = useState('')

  const checkboxChange = (name, values) => {
    events.changeFilter(name, values)
  }

  const searchQueryChange = (value) => {
    events.changeFilter('query', value)
    setSearchQuery(value)
  }

  const filterSubmit = (e) => {
    e.preventDefault()
    events.fetchTasks(0)
  }
    
    return (
        <form action="" className="tasks__filter">
          <div className="tasks__type__filter">
          <SelectCheckbox name="type" str={'Тип'} data={typeData} key="typeCheckBox" onChangeValues={checkboxChange}/>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => searchQueryChange(e.target.value)}
            placeholder="Название задачи"
            className={`form__item tasks__name__filter ${searchQuery ? 'active' : ''}`}
            type="text"
          />
          <div className="tasks__username__filter">
          <SelectCheckbox 
          name="assignedUsers" str={'Пользователь'} data={usernameData} key="userCheckBox" onChangeValues={checkboxChange}/>
          </div>
          <div className="tasks__status__filter">
          <SelectCheckbox name="status" str={'Статус'} data={statusData} key="statusCheckBox" onChangeValues={checkboxChange}/>
          </div>
          <div className="tasks__priority__filter">
          <SelectCheckbox name="rank" str={'Приоритет'} data={priorityData} key="rankCheckBox" onChangeValues={checkboxChange}/>
          </div>
          <button type="submit" className="primary__button table__button" onClick={filterSubmit}>
            Применить
          </button>
        </form>
    )
}
export default FilterTable;
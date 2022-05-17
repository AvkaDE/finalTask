import { React } from "react";
import logo from "../../img/Logo.svg"
import { NavLink, useLocation, Link } from "react-router-dom";
import { events } from "../../store";

const Header = () => {
  const location = useLocation();

  const isTasksActive =
    location.pathname === "/" ||
    location.pathname === "/task" ||
    location.pathname === "/create";

  const isUsersActive =
    location.pathname === "/users" || location.pathname === "/user";

  const handleExit = (evt) => {
    evt.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  const hide = location.pathname === "/login";

  const { users } = events

  const currentUserData = (id) => {
    const user = users.find(x => x.id === id)
    return user;
  }

  const userData = JSON.parse(localStorage.getItem('userData'))

  const id = localStorage.getItem('id')

  const getUserName = (id) => {
    const user = users.find((x) => x.id === id);
    return (user && user.username) || "Unknown User";
  };

  return (
    <header className="header">
      {hide ? (
        <>
          <div className="logo">
            <NavLink to="/">
              <img src={logo}></img>
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div className="logo">
            <NavLink to="/">
              <img src={logo}></img>
            </NavLink>
          </div>
          <nav className="nav">
            <ul>
              <li>
                <NavLink to="/" className={`${isTasksActive ? "active" : ""}`}>
                  Задачи
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className={`${isUsersActive ? "active" : ""}`}
                >
                  Пользователи
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="user__profile">
            <div className="username">{userData.username}</div>
            <div className="dropdown">
              <a href="#" className="user__menu">
                <img className="userpic" src={userData.photoUrl} alt='avatar'></img>
              </a>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <NavLink to={`/user/${userData.id}`}>Посмотреть профиль</NavLink>
                  </li>
                  <li>
                    <Link
                      onClick={handleExit}
                      to="/login"
                      className="logout__link"
                    >
                      Выйти из системы
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
export default Header;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./cmp/pages/loginpage";
import Mainpage from "./cmp/pages/mainpage";
import Taskpage from "./cmp/pages/taskpage";
import Createpage from "./cmp/pages/createpage";
import Userspage from "./cmp/pages/userspage";
import Aboutuserpage from "./cmp/pages/aboutuserpage";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { events } from "./store/index";
import Editpage from "./cmp/pages/editpage";
import { Navigate } from "react-router";


const App = observer(() => {

  useEffect(() => {
    events.fetchTasks();
    events.fetchUsers();
  });

  const isAuth = localStorage.getItem('isAuth')
  return (

    <BrowserRouter>
      <Routes>
        {isAuth
          ?
          <>
            <Route path="/" element={<Mainpage />} exact />
            <Route path={`/task/:id`} element={<Taskpage />} exact />
            <Route path={`/taskedit/:id`} element={<Editpage />} exact />
            <Route path="/users" element={<Userspage />} exact />
            <Route path={`/user/:id`} element={<Aboutuserpage />} exact />
            <Route path={`/create`} element={<Createpage />} exact />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </>
          :
          <>
            <Route path="/login" element={<Loginpage />} exact />
            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />
          </>
        }
      </Routes>
    </BrowserRouter>


  );
})

export default App;

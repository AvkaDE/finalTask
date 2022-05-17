import { observer } from "mobx-react-lite";
import { React } from "react";
import { events } from "../../store";
import Header from "../header/header";
import Tasks from "../table/tasks.jsx";

const Mainpage = observer(() => {
  const { tasks, pagination } = events;

  return (
    <>
      <Header />
      <Tasks tasks={tasks} pagination={pagination} />
    </>
  );
});
export default Mainpage;

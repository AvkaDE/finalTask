import { observer } from "mobx-react-lite";
import { React } from "react";
import Header from "../header/header";
import Users from "../usersList/users";


const Userspage = observer(() => {

  return (
    <>
      <Header />
      <Users />
    </>
  );
});
export default Userspage;

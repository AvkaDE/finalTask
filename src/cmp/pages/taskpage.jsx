import { React } from "react";
import { useParams } from "react-router";
import Header from "../header/header";
import Task from "../taskPreview/task";

const Taskpage = () => {

    const params = useParams()

    return (
      <>
        <Header />
        <Task id={params.id}/>
      </>
    );
  }

export default Taskpage;

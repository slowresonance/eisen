import { React } from "react";

const Undo = ({
  tasks,
  setTasks,
  deletedTask,
  deletedTaskType,
  setDeletedTaskType,
}) => {
  const undo = () => {
    if (deletedTaskType === "") return;

    const updatedTasks = JSON.parse(JSON.stringify(tasks));
    updatedTasks[deletedTaskType].push(deletedTask);

    setTasks(updatedTasks);
    setDeletedTaskType("");
  };

  return (
    <div id="undo">
      <div id="undo-text">Task deleted</div>
      <div id="undo-link" onClick={undo}>
        Undo⮌
      </div>
    </div>
  );
};

export default Undo;

import React from "react";
import Task from "./Task";

const Cell = ({ cell, setCells, tasks, setTasks, setTaskTarget }) => {
  const handleTaskHandler = (e) => {
    setTaskTarget(cell.type);
  };

  return (
    <div className="cell">
      <div className="cell-head">
        <div className="title">{cell.title}</div>
        <div
          tabIndex="0"
          className="add-task"
          id={cell.type}
          onClick={handleTaskHandler}
          onKeyPress={(e) => e.key === "Enter" && handleTaskHandler(e)}
        >
          + Add new task
        </div>
      </div>
      <div className="cell-body">
        {tasks
          .filter((task) => task.type === cell.type)
          .map((task) => (
            <Task
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              key={task.id}
            ></Task>
          ))}
      </div>
    </div>
  );
};

export default Cell;

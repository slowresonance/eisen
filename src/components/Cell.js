import { React } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

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
      <Droppable droppableId={cell.type}>
        {(provided) => (
          <div
            className="cell-body"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks[cell.type].map((task, index) => (
              <Task
                task={task}
                taskType={cell.type}
                tasks={tasks}
                setTasks={setTasks}
                key={task.id}
                index={index}
              ></Task>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Cell;

import { React, useState } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Cell = ({
  cell,
  cells,
  setCells,
  tasks,
  setTasks,
  setTaskTarget,
  setDeletedTask,
  setDeletedTaskType,
}) => {
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState(cell.title);

  const handleTaskHandler = (e) => {
    setTaskTarget(cell.type);
  };

  const updateTitles = () => {
    setCells(
      cells.map((c) => {
        if (c === cell) {
          return { ...c, title: title };
        } else {
          return c;
        }
      })
    );
  };

  const handleEditBlur = (e) => {
    setToggle(true);
    updateTitles();
  };

  const handleEditExit = (e) => {
    if (e.key === "Escape" || e.key === "Tab") {
      setToggle(true);
      setTitle(cell.title);
      e.preventDefault();
      e.stopPropagation();
    }
    if (e.key === "Enter") {
      setToggle(true);
      updateTitles();
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="cell">
      <div className="cell-head">
        {toggle ? (
          <div
            className="title"
            onDoubleClick={() => {
              setToggle(!toggle);
            }}
          >
            {cell.title}
          </div>
        ) : (
          <input
            autoFocus
            type="text"
            spellCheck="false"
            autoComplete="chrome-off"
            className="edit-text edit-title"
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onKeyDown={handleEditExit}
            onBlur={handleEditBlur}
          />
        )}
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
                setDeletedTask={setDeletedTask}
                setDeletedTaskType={setDeletedTaskType}
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

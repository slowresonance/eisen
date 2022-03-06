import { React, useState } from "react";
import Checkbox from "./Checkbox";

const Task = ({ task, tasks, setTasks }) => {
  const [toggle, setToggle] = useState(true);
  const [content, setContent] = useState(task.content);

  const handleDelete = () => {
    if (task.done === false) return;
    setTasks(tasks.filter((item) => item.id !== task.id));
  };

  const updateTodos = () => {
    setTasks(
      tasks.map((item) => {
        if (item.id === task.id) {
          return {
            ...item,
            content: content,
          };
        }
        return item;
      })
    );
  };

  const handleEditBlur = (e) => {
    setToggle(true);
    updateTodos();
  };

  const handleEditExit = (e) => {
    if (e.key === "Escape") {
      setToggle(true);
      setContent(task.content);
      e.preventDefault();
      e.stopPropagation();
    }
    if (e.key === "Enter") {
      setToggle(true);
      updateTodos();
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      id={task.id}
      className={`task ${task.done && "completed"}`}
      // onKeyPress={(e) => e.key === "Enter" && handleCompleted}
    >
      <Checkbox task={task} tasks={tasks} setTasks={setTasks}></Checkbox>
      {toggle ? (
        <span
          tabIndex="0"
          className="task-content"
          onClick={handleDelete}
          onDoubleClick={() => {
            setToggle(!toggle);
          }}
        >
          {content}
        </span>
      ) : (
        <input
          autoFocus
          type="text"
          spellCheck="false"
          autoComplete="chrome-off"
          className="edit-task"
          defaultValue={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={handleEditExit}
          onBlur={handleEditBlur}
        />
      )}
    </div>
  );
};

export default Task;

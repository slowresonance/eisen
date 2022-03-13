import { React, useState } from "react";
import Checkbox from "./Checkbox";
import { Draggable } from "react-beautiful-dnd";

const Task = ({
  taskType,
  task,
  tasks,
  setTasks,
  setDeletedTask,
  setDeletedTaskType,
  index,
}) => {
  const [toggle, setToggle] = useState(true);
  const [content, setContent] = useState(task.content);

  const deleteTask = () => {
    const updatedTasks = JSON.parse(JSON.stringify(tasks));

    setDeletedTask(task);
    setDeletedTaskType(taskType);

    updatedTasks[taskType] = tasks[taskType].filter(
      (item) => item.id !== task.id
    );
    setTasks(updatedTasks);
    setTimeout(function () {
      setDeletedTaskType("");
    }, 10000);
  };

  const handleDelete = () => {
    if (task.done === false) return;
    deleteTask();
  };

  const updateTasks = () => {
    if (content === "") {
      return deleteTask();
    }

    const updatedTasks = JSON.parse(JSON.stringify(tasks));

    updatedTasks[taskType] = tasks[taskType].map((item) => {
      if (item.id === task.id) {
        return {
          ...item,
          content: content,
        };
      }
      return item;
    });

    setTasks(updatedTasks);
  };

  const handleEditBlur = (e) => {
    setToggle(true);
    updateTasks();
  };

  const handleEditExit = (e) => {
    if (e.key === "Escape" || e.key === "Tab") {
      setToggle(true);
      setContent(task.content);
      e.preventDefault();
      e.stopPropagation();
    }
    if (e.key === "Enter") {
      setToggle(true);
      updateTasks();
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          id={task.id}
          className={`task ${taskType} ${task.done ? "done" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}

          // onKeyPress={(e) => e.key === "Enter" && handleCompleted}
        >
          <Checkbox
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            taskType={taskType}
          ></Checkbox>
          {toggle ? (
            <span
              tabIndex="0"
              className={`task-content`}
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
              className="edit-text"
              defaultValue={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              onKeyDown={handleEditExit}
              onBlur={handleEditBlur}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;

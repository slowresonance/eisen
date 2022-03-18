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

  const parseContent = () => {
    return { __html: parseSecret() };
  };

  const parseSecret = () => {
    const message = task.content;
    const flag = message[0] === "" ? 1 : 0;
    const result = message.split(/~(.*?)~/) || [];
    const html = result.reduce((acc, val, index) => {
      if (val === "") return acc;
      if ((index + flag) % 2 === 0) {
        return acc.concat(val);
      } else {
        return acc.concat(`<span class="secret">${val}</span>`);
      }
    });
    console.log(html);
    return html;
  };

  parseSecret();

  const deleteTask = () => {
    const updatedTasks = JSON.parse(JSON.stringify(tasks));

    setDeletedTask(task);
    setDeletedTaskType(taskType);

    updatedTasks[taskType] = tasks[taskType].filter(
      (item) => item.id !== task.id
    );
    setTasks(updatedTasks);
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

  const handleEditBlur = () => {
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
              onKeyDown={(e) => {
                e.key === "Enter" &&
                  (task.done === false ? setToggle(!toggle) : deleteTask());
              }}
              dangerouslySetInnerHTML={parseContent()}
            ></span>
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

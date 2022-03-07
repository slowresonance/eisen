import React from "react";

const Checkbox = ({ task, taskType, tasks, setTasks }) => {
  const handleCompleted = () => {
    let updatedTasks = Object.assign({}, tasks);

    updatedTasks[taskType] = tasks[taskType].map((item) => {
      if (item.id === task.id) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });

    setTasks(updatedTasks);
  };

  return (
    <span className="checkbox">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        tabIndex="0"
        onClick={handleCompleted}
      >
        {task.done ? (
          <polyline points="20 6 9 17 4 12"></polyline>
        ) : (
          <circle cx="12" cy="12" r="7"></circle>
        )}
      </svg>
    </span>
  );
};

export default Checkbox;

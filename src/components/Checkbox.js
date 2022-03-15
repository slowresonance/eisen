import { React, useEffect, useState } from "react";

const Checkbox = ({ task, taskType, tasks, setTasks }) => {
  const [checkboxChange, updateCheckboxChange] = useState(false);
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
    updateCheckboxChange(!checkboxChange);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const updatedTasks = JSON.parse(JSON.stringify(tasks));
    for (let cell in tasks) {
      let notdone = [];
      let done = [];

      tasks[cell].forEach((task) => {
        if (task.done === false) {
          notdone.push(task);
        } else {
          done.push(task);
        }
      });

      updatedTasks[cell] = [...notdone, ...done];
    }
    setTasks(updatedTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxChange]);

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
        onKeyDown={(e) => {
          e.key === "Enter" && handleCompleted();
        }}
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

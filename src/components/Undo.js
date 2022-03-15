import { React, useRef, useEffect } from "react";

const Undo = ({
  tasks,
  setTasks,
  deletedTask,
  deletedTaskType,
  setDeletedTaskType,
}) => {
  const undoRef = useRef();

  useEffect(() => {
    if (deletedTaskType !== "") {
      undoRef.current.focus();
    }
  }, [deletedTaskType]);

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
      <div
        id="undo-link"
        onClick={undo}
        tabIndex="0"
        ref={undoRef}
        onKeyDown={(e) => {
          e.key === "Enter" && undo();
        }}
      >
        Undo
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.22604 14V12.618H7.51073C9.16643 12.618 10.4282 12.2508 11.2961 11.5165C12.164 10.7821 12.598 9.70053 12.598 8.27182C12.598 6.84311 12.164 5.76156 11.2961 5.02718C10.4282 4.2928 9.16643 3.92561 7.51073 3.92561H2.94421V2.54363H7.51073C9.51359 2.54363 11.0959 3.03767 12.2575 4.02575C13.4192 5.00048 14 6.41583 14 8.27182C14 10.1278 13.4192 11.5498 12.2575 12.5379C11.0959 13.5126 9.51359 14 7.51073 14H4.22604ZM4.22604 6.44921L0 3.22461L4.22604 0V6.44921Z"
            fill="#EEEEEE"
          />
        </svg>
      </div>
    </div>
  );
};

export default Undo;

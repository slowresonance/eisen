import React, { useEffect, useState } from "react";

function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

const Menu = ({
  setTasks,
  setCells,
  divider,
  taskTarget,
  deletedTaskType,
  exportTasks,
}) => {
  const [toggle, setToggle] = useState(false);

  const getFile = (event) => {
    const input = event.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0]);
    }
  };

  const placeFileContent = (file) => {
    readFileContent(file)
      .then((content) => {
        let [tasks, cells, theme] = content.split(divider);
        setTasks(JSON.parse(tasks));
        setCells(JSON.parse(cells));
        localStorage.setItem("theme", theme);
      })
      .catch((error) => console.log(error));
  };

  const flip = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (taskTarget !== "" || deletedTaskType !== "") {
      setToggle(false);
    }
  }, [taskTarget, deletedTaskType]);

  return (
    <div id="menu-container">
      <div id="menu" className={!toggle ? "visually-hidden" : ""}>
        <div id="import">
          <label>
            <input
              type="file"
              style={{ display: "none" }}
              id="file-input"
              onChange={getFile}
            />
            Import
          </label>
        </div>
        <div id="export" onClick={exportTasks}>
          Export
        </div>
        <div id="star">
          <a
            href="https://github.com/mohanvpatta/eisen"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L11.472 5.93691L17 6.73344L13 10.5741L13.944 16L9 13.4369L4.056 16L5 10.5741L1 6.73344L6.528 5.93691L9 1Z"
                fill="#777777"
                stroke="#777777"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
      <div id="menu-toggle" onClick={flip}>
        {!toggle ? (
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="#777777"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 7L7 1L1 7"
              stroke="#777777"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Menu;

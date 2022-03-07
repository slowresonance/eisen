import { useEffect, useRef, useState, Fragment } from "react";
import "./App.css";
import Cell from "./components/Cell";
import Input from "./components/Input";
import { DragDropContext } from "react-beautiful-dnd";

const retrieveData = () => {
  if (localStorage.getItem("matrixbeta")) {
    return JSON.parse(localStorage.getItem("matrixbeta"));
  } else {
    return { "cell-1": [], "cell-2": [], "cell-3": [], "cell-4": [] };
  }
};

function App() {
  const [cells, setCells] = useState(defaultCells);
  const [tasks, setTasks] = useState(retrieveData());
  const [taskTarget, setTaskTarget] = useState("");
  const inputRef = useRef();

  console.log(tasks);

  useEffect(() => {
    if (taskTarget !== "") {
      inputRef.current.focus();
    }
  }, [taskTarget]);

  useEffect(() => {
    localStorage.setItem("matrixbeta", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.target.value = "";
        setTaskTarget("");
      }
      if (e.altKey) {
        switch (e.code) {
          case "Digit1":
            setTaskTarget("cell-1");
            break;
          case "Digit2":
            setTaskTarget("cell-2");
            break;
          case "Digit3":
            setTaskTarget("cell-3");
            break;
          case "Digit4":
            setTaskTarget("cell-4");
            break;
          default:
            return;
        }
      }
    });
  }, []);

  const handleOnDragEnd = (result) => {
    console.log(result);
  };

  return (
    <Fragment>
      <div id="matrix">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {cells.map((cell) => (
            <Cell
              cell={cell}
              setCells={setCells}
              tasks={tasks}
              setTasks={setTasks}
              setTaskTarget={setTaskTarget}
              key={cell.type}
            ></Cell>
          ))}
        </DragDropContext>
      </div>
      {taskTarget !== "" ? (
        <Input
          cells={cells}
          tasks={tasks}
          setTasks={setTasks}
          inputRef={inputRef}
          taskTarget={taskTarget}
          setTaskTarget={setTaskTarget}
        ></Input>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default App;

const defaultCells = [
  { type: "cell-1", title: "Do it" },
  { type: "cell-2", title: "Schedule it" },
  { type: "cell-3", title: "Automate it" },
  { type: "cell-4", title: "Delete it" },
];

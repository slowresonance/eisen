import React from "react";

const Input = ({
  cells,
  tasks,
  setTasks,
  inputRef,
  taskTarget,
  setTaskTarget,
}) => {
  const randID = (length) => {
    return [...Array(length)]
      .map((_) => ((Math.random() * 36) | 0).toString(36))
      .join(``)
      .toUpperCase();
  };

  const handleInput = (e) => {
    if (e.key !== "Enter") return;
    if (e.target.value === "") return;

    const contentPipe = [];
    const tasksPipe = [];

    if (e.target.value.includes("||")) {
      e.target.value.split("||").forEach((task) => {
        contentPipe.push(task);
      });
    } else {
      contentPipe.push(e.target.value);
    }

    console.log(contentPipe);

    contentPipe.forEach((content) => {
      tasksPipe.push({
        id: randID(6),
        content: content,
        type: taskTarget,
        done: false,
      });
    });

    setTasks([...tasks, ...tasksPipe]);

    e.target.value = "";
    setTaskTarget("");
  };

  const genPlaceholder = () => {
    const placeholder = cells.find((data) => data.type === taskTarget).title;
    return `@${placeholder.toLowerCase().replace(" ", "-")}`;
  };

  return (
    <div id="input-container">
      <input
        autoFocus
        id="task-input"
        type="text"
        spellCheck="false"
        autoComplete="chrome-off"
        ref={inputRef}
        placeholder={genPlaceholder()}
        onKeyPress={handleInput}
      />
    </div>
  );
};

export default Input;

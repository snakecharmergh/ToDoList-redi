import React, { useState } from "react";

function TodoList() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  // enables us to see the text when we write in the input field
  function handelInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function addTask() {
    if (newTask !== "") {
      // setTasks((task=>[...tasks, newTask]));
      setTasks((Tasks) => [...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function handleCheckboxChange(index) {
    // index is the one of the task we want to tick while i is the index of each task in the tasks list
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function editTask(index) {
    // if (editingIndex === index) {
    //   const updatedTasks = tasks.map((task, i) =>
    //     i === index ? { ...task, text: editedText } : task
    //   );
    //   setTasks(updatedTasks);
    //   setEditingIndex(null);
    //   setEditedText("");
    // } else {
    //   setEditingIndex(index);
    //   setEditedText(tasks[index].text);
    // }

    const isEditing = editingIndex === index;
    // if the current task is being edited, it updates the task, otherwise, it starts the editing process.
    if (isEditing) {
      setTasks(
        tasks.map((task, i) =>
          i === index ? { ...task, text: editedText } : task
        )
      );
      setEditingIndex(null);
      setEditedText("");
    } else {
      setEditingIndex(index);
      setEditedText(tasks[index].text);
    }
  }

  function deleteTask(index) {
    // index is the one of the task we want to delete while i is the index of each task in the tasks list
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="add-input">
        <input
          type="text"
          placeholder="Add a task ..."
          value={newTask}
          onChange={handelInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              className="check-task"
              checked={task.completed}
              onChange={() => handleCheckboxChange(index)} //we use an arrow function here because the function has an argument other than the event itself=> the function is called immediatly. To prevent that, we use an arrow function ()=>
            />

            {editingIndex === index ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editTask(index);
                  }
                }}
              />
            ) : (
              // <span className="text">{task}</span>
              <span className={`text ${task.completed ? "completed" : ""}`}>
                {task.text}
              </span>
            )}

            <button className="edit-button" onClick={() => editTask(index)}>
              {editingIndex === index ? "✔️" : "📝"}
            </button>

            <button className="delete-button" onClick={() => deleteTask(index)}>
              🗑
            </button>

            <button
              className="move-button-up"
              onClick={() => moveTaskUp(index)}
            >
              👆
            </button>

            <button
              className="move-button-down"
              onClick={() => moveTaskDown(index)}
            >
              👇
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;

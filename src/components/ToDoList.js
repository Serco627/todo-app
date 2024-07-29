import React from "react";
import useLocalStorageState from "use-local-storage-state";
import "./TodoList.css"; // Importiere die CSS-Datei

export default function TodoList() {
  const [todos, setTodos] = useLocalStorageState("todos", {
    defaultValue: [],
  });
  const [newTodo, setNewTodo] = useLocalStorageState("newTodo", {
    defaultValue: "",
  });
  const [dueDate, setDueDate] = useLocalStorageState("dueDate", {
    defaultValue: "",
  });
  const [priority, setPriority] = useLocalStorageState("priority", {
    defaultValue: "medium",
  });

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([
      ...todos,
      { text: newTodo, completed: false, dueDate, priority },
    ]);
    setNewTodo("");
    setDueDate(""); // Setze das Fälligkeitsdatum zurück
    setPriority("medium"); // Setze die Priorität zurück
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const removeAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>Todo List</h1>
      </header>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="todo-input"
          placeholder="Add a new todo..."
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="todo-date-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="todo-priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTodo} className="todo-button">
          Add
        </button>
      </div>
      <div className="todo-info">
        <span className="todo-count">Total Todos: {todos.length}</span>
        <button onClick={removeAllTodos} className="todo-clear-button">
          Delete All
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <div className="todo-main">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              {todo.completed && (
                <button
                  onClick={() => removeTodo(index)}
                  className="todo-delete-button"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="todo-details">
              <span className="todo-date">{todo.dueDate}</span>
              <span className={`todo-priority ${todo.priority}`}>
                {todo.priority}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newTodo, setNewTodo] = useState("");
  const [language, setLanguage] = useState("pt");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (newTodo.trim() === "") return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), name: newTodo, complete: false },
    ]);
    setNewTodo("");
    setFilter("all");
  }

  function toggleTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }

  function clearCompletedTodos() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.complete));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.complete;
    if (filter === "pending") return !todo.complete;
    return true;
  });

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <div className="app-container">
      <h1>
        {language === "pt" ? "Lista de Tarefas" : "To-do List"}
        <button onClick={toggleLanguage} className="language-button">
          {language === "pt" ? "🇧🇷" : "🇬🇧"}
        </button>
      </h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder={
          language === "pt" ? "Adicionar nova tarefa..." : "Add a new task..."
        }
      />
      <button className="add-button" onClick={addTodo}>
        {language === "pt" ? "Adicionar" : "Add"}
      </button>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>
          {language === "pt" ? "Todas" : "All"}
        </button>
        <button onClick={() => setFilter("completed")}>
          {language === "pt" ? "Concluídas" : "Completed"}
        </button>
        <button onClick={() => setFilter("pending")}>
          {language === "pt" ? "Pendentes" : "Pending"}
        </button>
      </div>

      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />

      <button className="clear-button" onClick={clearCompletedTodos}>
        {language === "pt" ? "Limpar Concluídas" : "Clear Completed"}
      </button>
    </div>
  );
}

export default App;

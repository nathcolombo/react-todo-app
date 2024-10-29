import React from "react";

export default function Todo({ todo, toggleTodo }) {
  return (
    <li>
      <div className="todo-item">
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => toggleTodo(todo.id)}
        />
        <span
          style={{
            textDecoration: todo.complete ? "line-through" : "none",
            fontFamily: "Kalam",
            fontWeight: "400",
            fontSize: "1.5rem",
          }}
        >
          {todo.name}
        </span>
      </div>
    </li>
  );
}

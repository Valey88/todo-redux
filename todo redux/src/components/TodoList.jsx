import React from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
const TodoList = () => {
  const todo = useSelector((state) => state.todo.todo);
  return (
    <ul>
      {todo.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;

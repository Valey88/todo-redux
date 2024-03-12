import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodoServer, toggleTodo } from "../store/todoSlice";
const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          dispatch(toggleTodo(id));
        }}
      />
      <span>{title}</span>
      <button onClick={() => dispatch(deleteTodoServer(id))}>delete</button>
    </li>
  );
};

export default TodoItem;

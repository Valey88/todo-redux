import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, fetchTodo } from "./store/todoSlice";
import "./App.css";
import TodoList from "./components/TodoList";
import InputFilds from "./components/InputFilds";

function App() {
  const [title, setTitle] = useState("");
  const { status, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const addTask = () => {
    dispatch(addNewTodo(title));
    setTitle("");
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <div className="app">
      <InputFilds title={title} setTitle={setTitle} addTask={addTask} />
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <TodoList />
    </div>
  );
}
export default App;

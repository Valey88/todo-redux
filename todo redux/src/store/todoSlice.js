import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk(
  "todo/fetchTodo",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=15"
      );

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoServer = createAsyncThunk(
  "todo/deleteTodoServer",

  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("cant delete todo");
      }
      dispatch(deleteTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "todo/togleTodo",
  async (id, { rejectWithValue, dispatch, getState }) => {
    const todo = getState().todo.todo.find((todo) => todo.id === id);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Cotent-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("cant toggle_checkbox todo");
      }

      dispatch(changeCheckbox({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todo/addNewTodo",
  async (text, { rejectWithValue, dispatch }) => {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error("cant addTodo todo");
      }

      const data = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todo.push(action.payload);
    },
    deleteTodo(state, action) {
      state.todo = state.todo.filter((todo) => todo.id !== action.payload.id);
    },
    changeCheckbox(state, action) {
      const checkboxed = state.todo.find(
        (todo) => todo.id === action.payload.id
      );
      checkboxed.completed = !checkboxed.completed;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.status = "success";
      state.todo = action.payload;
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(deleteTodoServer.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(toggleTodo.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(addNewTodo.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

const { addTodo, deleteTodo, changeCheckbox } = todoSlice.actions;

export default todoSlice.reducer;

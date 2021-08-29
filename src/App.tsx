import React, { useState } from "react";
import { Box, Center, Stack } from "@chakra-ui/react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Sort from "./components/Sort";
import TodoList from "./components/TodoList";
import { TodoItem } from "./types/types";

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  return (
    <Center flexDir="column">
      <Stack direction="column">
        <TodoForm todos={todos} setTodos={setTodos} />
        <Sort />
        {todos.length > 0 ? (
          <TodoList todos={todos} setTodos={setTodos} />
        ) : null}
      </Stack>
    </Center>
  );
}

export default App;

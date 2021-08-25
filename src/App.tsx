import React, { useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Sort from "./components/Sort";
import TodoList from "./components/TodoList";
import { TodoItem } from "./types/types";

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  return (
    <Center flexDir="column">
      <TodoForm todos={todos} setTodos={setTodos} />
      <Sort />
      <TodoList todos={todos} />
    </Center>
  );
}

export default App;

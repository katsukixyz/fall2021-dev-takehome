import { Box } from "@chakra-ui/react";
import React from "react";
import { TodoItem } from "../types/types";

interface TodoListProps {
  todos: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return <Box />;
};

export default TodoList;

import React from "react";
import {
  Box,
  Checkbox,
  Flex,
  Stack,
  StackDivider,
  Tag,
  Text,
} from "@chakra-ui/react";
import { TodoItem } from "../types/types";
import dayjs from "dayjs";

interface TodoListProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  filteredTodos: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  filteredTodos,
}) => {
  const changeChecked = (completed: boolean, id: number) => {
    const indexToChange = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    const newTodoItem = {
      ...todos[indexToChange],
      completed: !completed,
    };
    newTodos[indexToChange] = newTodoItem;
    setTodos(newTodos);
  };

  return (
    <Stack
      direction="column"
      w={1000}
      spacing="3"
      borderRadius="8"
      p="6"
      boxShadow="0 7px 30px -10px rgba(150,170,180,0.5);"
      divider={<StackDivider borderColor="gray.300" />}
    >
      {filteredTodos.map(({ id, title, dueDate, tagList, completed }) => (
        <Box key={id}>
          <Flex justifyContent="space-between">
            <Checkbox
              isChecked={completed}
              onChange={() => changeChecked(completed, id)}
              colorScheme="purple"
            >
              {title}
            </Checkbox>
            <Text>{dayjs(dueDate).format("MM/DD/YYYY")}</Text>
          </Flex>
          <Stack direction="row" mt="1">
            {tagList.map((tag, i) => (
              <Tag key={i} size="md" borderRadius="full">
                {tag}
              </Tag>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default TodoList;

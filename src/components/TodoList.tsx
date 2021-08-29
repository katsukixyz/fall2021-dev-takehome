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
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const changeChecked = (completed: boolean, listIndex: number) => {
    const newTodos = [...todos];
    const newTodoItem = {
      ...todos[listIndex],
      completed: !completed,
    };
    newTodos[listIndex] = newTodoItem;
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
      {todos.map(({ title, dueDate, tagList, completed }, i: number) => (
        <Box key={i}>
          <Flex justifyContent="space-between">
            <Checkbox
              isChecked={completed}
              onChange={() => changeChecked(completed, i)}
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

import React, { useMemo, useState } from "react";
import { Box, Center, Stack } from "@chakra-ui/react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Sort, { FilterProps } from "./components/Sort";
import TodoList from "./components/TodoList";
import { TodoItem } from "./types/types";
import dayjs from "dayjs";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [sortDate, setSortDate] = useState(false);
  const [sortCompleted, setSortCompleted] = useState(false);
  const [filterTags, setFilterTags] = useState<FilterProps[]>([]);

  const filteredTodos = useMemo(() => {
    let intermediateFilteredTodos = [...todos];
    if (filterTags.length > 0) {
      intermediateFilteredTodos = intermediateFilteredTodos.filter((todo) =>
        filterTags.every((filterTag) => todo.tagList.includes(filterTag.value))
      );
    }
    if (sortDate) {
      intermediateFilteredTodos = intermediateFilteredTodos.sort(
        (a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix()
      );
    }
    if (sortCompleted) {
      intermediateFilteredTodos = intermediateFilteredTodos.sort(
        (a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0)
      );
    }
    return intermediateFilteredTodos;
  }, [sortDate, sortCompleted, filterTags, todos]);

  return (
    <Center flexDir="column">
      <Stack direction="column">
        <TodoForm todos={todos} setTodos={setTodos} />
        <Sort
          todos={todos}
          sortDate={sortDate}
          setSortDate={setSortDate}
          sortCompleted={sortCompleted}
          setSortCompleted={setSortCompleted}
          filterTags={filterTags}
          setFilterTags={setFilterTags}
        />
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            setTodos={setTodos}
            filteredTodos={filteredTodos}
          />
        ) : null}
      </Stack>
    </Center>
  );
};

export default App;

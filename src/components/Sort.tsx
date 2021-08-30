import React, { useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { TodoItem } from "../types/types";
import Select from "react-select";

export interface FilterProps {
  label: string;
  value: string;
}

interface SortProps {
  todos: TodoItem[];
  sortDate: boolean;
  setSortDate: React.Dispatch<React.SetStateAction<boolean>>;
  sortCompleted: boolean;
  setSortCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  filterTags: FilterProps[];
  setFilterTags: React.Dispatch<React.SetStateAction<FilterProps[]>>;
}

const Sort: React.FC<SortProps> = ({
  todos,
  sortDate,
  setSortDate,
  sortCompleted,
  setSortCompleted,
  filterTags,
  setFilterTags,
}) => {
  const tagOptions = useMemo(() => {
    const setOptions: Set<string> = todos.reduce((acc, cur) => {
      for (const tag of cur.tagList) {
        acc.add(tag);
      }
      return acc;
    }, new Set<string>());

    return Array.from(setOptions).map((tag) => ({
      label: tag,
      value: tag,
    }));
  }, [todos]);

  return (
    <Flex
      justify="space-between"
      p="6"
      w={1000}
      borderRadius="6"
      boxShadow="0 7px 30px -10px rgba(150,170,180,0.5);"
    >
      <Stack direction="row" w="50%" align="center">
        <Text fontWeight="medium">Sort by: </Text>
        <Stack direction="row">
          <Text>Date</Text>
          <Switch
            colorScheme="purple"
            onChange={() => setSortDate(!sortDate)}
          />
        </Stack>
        <Stack direction="row">
          <Text>Completed</Text>
          <Switch
            colorScheme="purple"
            onChange={() => setSortCompleted(!sortCompleted)}
          />
        </Stack>
      </Stack>
      <Box w="50%">
        <Select
          isMulti
          isClearable
          value={filterTags}
          onChange={(tagArr) => setFilterTags([...tagArr])}
          closeMenuOnSelect={false}
          placeholder="Filter by tags..."
          options={tagOptions}
        />
      </Box>
    </Flex>
  );
};

export default Sort;

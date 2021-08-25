import React, { useRef, useState } from "react";
import { TodoItem } from "../types/types";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Stack,
} from "@chakra-ui/react";

interface TodoFormProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  return (
    <Box
      w={1000}
      mt="6"
      p="6"
      borderRadius="8"
      boxShadow="0 7px 30px -10px rgba(150,170,180,0.5);"
    >
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {(props) => (
          <Form>
            <Field name="title">
              {({ field, form }: any) => {
                console.log(field);
                return (
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input {...field} />
                  </FormControl>
                );
              }}
            </Field>

            <FormLabel mt="2">Tags</FormLabel>
            <Stack direction="row">
              <Input
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                placeholder="Add a tag"
              />
              <Button
                onClick={() => {
                  const newTags = [...tags];
                  newTags.push(tagInput);
                  setTags(newTags);
                  setTagInput("");
                }}
              >
                Add
              </Button>
            </Stack>

            <Stack spacing={4} direction="row">
              {tags.map((tag, i) => (
                <Tag key={i} size="md" borderRadius="full">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      const newTags = [...tags];
                      newTags.splice(i, 1);
                      setTags(newTags);
                    }}
                  />
                </Tag>
              ))}
            </Stack>
            <Field name="dueDate">
              {({ field, form }: any) => (
                <FormControl isRequired>
                  <FormLabel>Due date</FormLabel>
                  <Input {...field} placeholder="MM/DD/YYYY" />
                </FormControl>
              )}
            </Field>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TodoForm;

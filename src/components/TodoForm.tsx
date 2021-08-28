import React, { useRef, useState } from "react";
import { TodoItem } from "../types/types";
import { Formik, Form, Field, FieldInputProps, FormikState } from "formik";
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
  FormErrorMessage,
} from "@chakra-ui/react";

interface TodoFormProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const validateDate = (value: string) => {
    const regExp = /(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/](19|20)\d\d/;
    if (!regExp.test(value)) {
      return "Please enter a valid date in the format MM/DD/YYYY";
    }
  };

  const addTag = () => {
    const newTags = [...tags];
    newTags.push(tagInput);
    setTags(newTags);
    setTagInput("");
  };

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
        onSubmit={(values) => {
          const formValues = {
            ...values,
            tags: tags,
          };
        }}
      >
        {(props) => (
          <Form>
            <Field name="title">
              {({ field }: { field: FieldInputProps<string> }) => (
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} id="title" value={field.value || ""} />
                </FormControl>
              )}
            </Field>

            <FormLabel mt="2">Tags</FormLabel>
            <Stack direction="row" mb="2">
              <Input
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                placeholder="Add a tag"
              />
              <Button
                onClick={() => {
                  tagInput && addTag();
                }}
              >
                Add
              </Button>
            </Stack>

            <Stack spacing={2} direction="row" mb="2">
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

            <Field name="dueDate" validate={validateDate}>
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikState<{ title: string; dueDate: string }>;
              }) => (
                <FormControl
                  isRequired
                  isInvalid={
                    form.errors.dueDate !== undefined && form.touched.dueDate
                  }
                >
                  <FormLabel>Due date</FormLabel>
                  <Input
                    {...field}
                    id="dueDate"
                    value={field.value || ""}
                    placeholder="MM/DD/YYYY"
                  />
                  <FormErrorMessage>{form.errors.dueDate}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button colorScheme="purple" type="submit" mt="2">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TodoForm;

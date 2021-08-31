import React, { forwardRef, useRef, useState } from "react";
import { TodoItem } from "../types/types";
import { Formik, Form, Field, FieldInputProps, FormikState } from "formik";
import DatePicker from "react-datepicker";
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

const DateInput = forwardRef(
  ({ onClick, value, onChange }: any, ref: React.Ref<HTMLInputElement>) => (
    <Input
      ref={ref}
      id="dueDate"
      isReadOnly
      value={value}
      onChange={onChange}
      onClick={onClick}
      placeholder="MM/DD/YYYY"
    />
  )
);

const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  const [tagInput, setTagInput] = useState("");
  const [dateInput, setDateInput] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);

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
        initialValues={{ title: "" }}
        onSubmit={(values: { title: string }, { resetForm }) => {
          const formValues = {
            ...values,
            id: todos.length,
            dueDate: dateInput!,
            tagList: tags,
            completed: false,
          };
          const newTodos = [...todos];
          newTodos.push(formValues);
          setTodos(newTodos);

          //reset form values
          resetForm();
          setTagInput("");
          setTags([]);
          setDateInput(null);
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

            <Field name="dueDate">
              {() => (
                <FormControl isRequired>
                  <FormLabel>Due date</FormLabel>
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    selected={dateInput}
                    customInput={<DateInput />}
                    onChange={(date) => setDateInput(date! as Date)}
                  />
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

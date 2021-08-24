import React, { useState } from "react";
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

const TodoForm: React.FC = () => {
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
              {({ field, form }: any) => (
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <FormLabel mt="2">Tags</FormLabel>
            <Input />

            <Stack spacing={4} direction="row">
              <Tag size="md" borderRadius="full">
                <TagLabel>Tag</TagLabel>
                <TagCloseButton onClick={(joe) => console.log(joe)} />
              </Tag>
            </Stack>
            <Field name="dueDate">
              {({ field, form }: any) => (
                <FormControl isRequired>
                  <FormLabel>Due date</FormLabel>
                  <Input {...field} placeholder="MM/DD/YYYY" />
                </FormControl>
              )}
            </Field>
            <Button type="submit">Add</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TodoForm;

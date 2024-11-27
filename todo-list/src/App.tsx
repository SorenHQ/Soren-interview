import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

/**
 * This is the initial todo state.
 * Instead of loading this data on every reload,
 * we should save the todo state to local storage,
 * and restore on page load. This will give us
 * persistent storage.
 */

function App() {
  const [initialData, setTodo] = useState<Todo[]>([
    {
      id: uuid(),
      label: "Buy groceries",
      checked: false,
    },
    {
      id: uuid(),
      label: "Reboot computer",
      checked: false,
    },
    {
      id: uuid(),
      label: "Ace CoderPad interview",
      checked: true,
    },
  ]);
  const [todos, setTodos] = useState<Todo[]>(initialData);

  const addTodo = useCallback((label: string) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
      },
      ...prev,
    ]);
  }, []);

  const handleChange = useCallback((checked: boolean, id: string) => {
    // handle the check/uncheck logic
    const nextCounters = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = checked;
        return todo;
      } else {
        // The rest haven't changed
        return todo;
      }
    });
    setTodo(nextCounters);
  }, []);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem {...todo} onChange={handleChange} />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;

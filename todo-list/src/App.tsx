import React, { useCallback, useEffect, useState } from "react";
import { sortArrayByBoolean } from "./utils/sort";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";
import { setStore, readStore } from "./utils/store";
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
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((label: string) => {
    setTodos((prev) => {
      let newTodo = [
        {
          id: uuid(),
          label,
          checked: false,
        },
        ...prev,
      ];
      setStore(newTodo, "todos");
      return newTodo;
    });
  }, []);

  const handleChange = useCallback(
    (checked: boolean, id: string) => {
      // handle the check/uncheck logic
      const modifiedTodos = todos.filter((todo) => {
        if (todo.id === id) {
          todo.checked = checked;
          return todo;
        } else {
          // The rest haven't changed
          return todo;
        }
      });
      const sorted = sortTodos(modifiedTodos);
      setTodos(sorted);
      setStore(sorted, "todos");
    },
    [todos]
  );
  const sortTodos = (unsorted: Todo[]): Todo[] => {
    const sorted = sortArrayByBoolean<Todo>(unsorted, "checked", true);
    return sorted;
  };
  const populatePage = () => {
    const initData: Todo[] = [
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
    ];
    const previousTodos = readStore<Todo>("todos");

    if (previousTodos.length !== 0) {
      const sorted = sortTodos(previousTodos);
      setTodos(sorted);
    } else {
      setStore(initData, "todos");
      setTodos(initData);
    }
  };
  useEffect(() => {
    populatePage();
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

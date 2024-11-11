"use client"
import Image from "next/image";
import styles from './page.module.css'
import AddTodo from "@/component/AddTodo";
import TodoFilter from "@/component/TodoFilter";
import TodoList from "@/component/TodoList";
import { useState } from "react";
import { Todo } from "@/types";

const App = function () {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState('all')
  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  const getFilteredTodos = () => {
    switch (filter) {
      case 'all': return todos
      case 'completed': return todos.filter(todo => todo.completed)
      case 'active': return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }

  return (
    <>
      <h1>TodoList</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={getFilteredTodos()} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      <TodoFilter setFilter={setFilter} />
    </>
  )
}

export default App
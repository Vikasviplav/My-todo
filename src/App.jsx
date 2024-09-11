import { useEffect, useState } from 'react'
import './App.css'
import { TodoContextProvider } from './contexts/todoContext'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {

  const [todoList, setTodoList] = useState([])

  const addTodo = (todo) => {
    setTodoList((prev) => {
      return [...prev, { id: Date.now(), ...todo }]
    })
  }

  const editTodo = (id, todo) => {
    setTodoList((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
  }

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodoList((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, isCompleted: !prevTodo.isCompleted } : prevTodo))
  }

  useEffect(() => {

    const todoList = JSON.parse(localStorage.getItem("todos"))
    if (todoList && todoList.length > 0) {
      setTodoList(todoList)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList))
  }, [todoList])

  return (
    <TodoContextProvider value={{ todoList, addTodo, editTodo, toggleComplete, deleteTodo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            { todoList.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App

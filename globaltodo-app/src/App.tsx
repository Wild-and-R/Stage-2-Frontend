
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { TodoProvider } from './context/TodoProvider'

function App() {

  return (
    <TodoProvider>
      <div className="flex flex-col items-center h-screen justify-center">
        <h1 className="mb-8 font-semibold">To-Do App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  )
}

export default App

import { useState } from 'react'
import './TodoList.css'

type Tasks = Record<string, string>

type TodoListProps = {
  tasks: Tasks
}

function TodoList({ tasks }: TodoListProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  const toggleTask = (id: string) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="todo-list">
      {Object.entries(tasks).map(([id, label]) => (
        <button
          key={id}
          onClick={() => toggleTask(id)}
          className={`todo-button ${completed[id] ? 'done' : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default TodoList

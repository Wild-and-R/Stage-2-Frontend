import './App.css'
import TodoList from './components/TodoList'

const initialTasks = {
  feed: 'Feed Tachyon.',
  visit: 'Visit Firefly.',
  journey: 'Journey with Cafe.',
  restock: 'Restock the fridge.',
  home: 'Be home before night.',
}

function App() {
  return (
    <>
      <h2>To-do List</h2>
      <TodoList tasks={initialTasks} />
    </>
  )
}

export default App



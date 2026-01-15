import { useTodo } from "../hooks/useTodo"
import { TodoItem } from "./TodoItem"

export default function TodoList() {
  const { todos, loading } = useTodo();

  return (
    <div className="mt-8 w-full max-w-3xl">
      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

import { useTodo } from "../hooks/useTodo"
import { TodoItem } from "./TodoItem"

export default function TodoList() {
    const {todos, loading} = useTodo();
    return (
        <div>
            {loading && <p>Loading...</p>}
            {todos.map((todo) => (
                <TodoItem key= {todo.id} todo={todo} />
            ))}
        </div>
    )
}
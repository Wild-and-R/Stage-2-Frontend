import { useState } from "react";
import { useTodo } from "../hooks/useTodo";

export default function TodoForm() {
    const [text, setText] = useState("");
    const {createTodo, loading} = useTodo();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        createTodo(text);
        setText("");
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
  <input
    type="text"
    value={text}
    placeholder="Add a new task..."
    onChange={(e) => setText(e.target.value)}
    className="border px-3 py-2 rounded w-64"
    disabled={loading}
  />
  <button
    type="submit"
    disabled={loading}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Add
  </button>
</form>

    );
}
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
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} placeholder="Add a new task..." 
            onChange={(e) => setText(e.target.value)} 
            className="border"
            disabled={loading}/>
            <button type="submit" disabled={loading}className="ml-2 p-2 bg-blue-500 text-white rounded">Add</button>
        </form>
    );
}
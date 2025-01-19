"use client";

import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getAllTodos, addTodo, editTodo, deleteTodo } from "api";
import { Task } from "@/types/types";
import { v4 as uuidv4 } from "uuid"; // 修正ポイント

export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getAllTodos();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (taskTitle: string) => {
    const newTask: Task = {
      id: uuidv4(),
      text: taskTitle,
    };
    const addedTask = await addTodo(newTask);
    setTodos((prev) => [...prev, addedTask]);
  };

  const handleEditTodo = async (id: string, newText: string) => {
    const updatedTask = await editTodo(id, newText);
    setTodos((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: updatedTask.text } : task))
    );
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700 -mt-32">Nextjs 13 Todo App</h1>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <AddTask onAdd={handleAddTodo} />
          <TodoList todos={todos} onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
        </div>
      </div>
    </main>
  );
}

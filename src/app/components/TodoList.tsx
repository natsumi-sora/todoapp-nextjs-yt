import { Task } from "@/types/types";
import React from "react";
import Todo from "./Todo";

interface TodoListProps {
  todos: Task[];
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onEdit, onDelete }: TodoListProps) => {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TodoList;

"use client";

import { Task } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";

interface TodoProps {
  todo: Task;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

const Todo = ({ todo, onEdit, onDelete }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editedTaskTitle.trim() !== "") {
      onEdit(todo.id, editedTaskTitle);
    }
    setIsEditing(false);
  };

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="mr-2 py-2 px-2 rounded border-gray-400"
          value={editedTaskTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTitle(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        {isEditing ? (
          <button className="text-blue-500 mr-3" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="text-green-500 mr-3" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className="text-red-500" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Todo;

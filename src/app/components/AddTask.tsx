"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface AddTaskProps {
  onAdd: (taskTitle: string) => void;
}

const AddTask = ({ onAdd }: AddTaskProps) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return;
    onAdd(taskTitle);
    setTaskTitle("");
  };

  return (
    <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
        value={taskTitle}
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;

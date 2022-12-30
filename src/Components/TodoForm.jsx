import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { database } from "../Appwrite/AppwriteConfig";
import { TODO_COLLECTION_ID, DATABASE_ID } from "../constants";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo) return;
    try {
      const promise = database.createDocument(
        DATABASE_ID,
        TODO_COLLECTION_ID,
        uuidv4(),
        {
          todo: todo,
        }
      );
      promise.then((res) => console.log("Added")).finally(() => setTodo(""));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex justify-center mb-10"
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Todo"
          className="border p-2 w-2/3 rounded-md"
          onChange={(e) => setTodo(e.target.value.trim())}
        />
        <button
          className="bg-purple-500 p-2 text-white ml-2 rounded-md"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;

import React, { useState, useEffect } from "react";
import { database } from "../Appwrite/AppwriteConfig";
import { TODO_COLLECTION_ID, DATABASE_ID } from "../constants";

const Todos = () => {
  const [loder, setLoder] = useState(false);
  const [listOfTodos, setListOfTodos] = useState([]);

  useEffect(() => {
    setLoder(true);
    const getData = database.listDocuments(DATABASE_ID, TODO_COLLECTION_ID);
    getData.then(
      (res) => {
        console.log("Todos : ", res);
        setListOfTodos(res?.documents);
      },
      (error) => console.log("ERROR :" + error)
    );
    setLoder(false);
  }, []);

  const handleDelete = async (id) => {
    try {
      const promise = database.deleteDocument(
        DATABASE_ID,
        TODO_COLLECTION_ID,
        id
      );
      promise.then(
        (res) => {
          console.log("Deleted : ", res);
          // delete from list
          const updatedTodos = listOfTodos.fill(({ $id }) => $id !== id);
          setListOfTodos(updatedTodos);
        },
        (error) => console.log("ERROR :" + error)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2">Todo List</p>
      {loder ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {listOfTodos.length ? (
            listOfTodos.map(({ $id, todo }) => (
              <div key={$id}>
                <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                  <div>
                    <p>{todo}</p>
                  </div>
                  <div>
                    <span
                      className="text-red-400 cursor-pointer"
                      onClick={() => handleDelete($id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p> No Todos Found!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Todos;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account } from "../Appwrite/AppwriteConfig";
import TodoForm from "./TodoForm";
import Todos from "./Todos";

const Profile = () => {
  const navigator = useNavigate();
  const [userDetails, setUserDetails] = useState(false);

  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res) => {
        console.log("UserDetails : ", res);
        setUserDetails(res);
      },
      (error) => console.log("ERROR :" + error)
    );
  }, []);

  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      await account.deleteSession("current");
      navigator("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userDetails ? (
        <>
          <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-right py-3 px-3 mt-2 rounded-md">
            <div>
              <p className="text-xl">
                {userDetails?.name + " _ " + userDetails?.email}
              </p>
            </div>
            <div>
              <button onClick={handlelogout} className="bg-red-400 text-white p-1 rounded-md">
                Logout
              </button>
            </div>
          </div>
          {/* TODO FORM */}
          <TodoForm />
          {/* TODOS BOX */} 
          <Todos />
        </>
      ) : (
        <p className="mt-4">
          Please Login To see Profile{" "}
          <Link to="/">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Login
            </span>
          </Link>
        </p>
      )}
    </>
  );
};

export default Profile;

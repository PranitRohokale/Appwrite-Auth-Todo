import React from 'react';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Componets
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Profile from './Components/Profile';

const App = () => {
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  </BrowserRouter>);
}

export default App;


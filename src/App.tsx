import React from 'react';
import NoteList from './component/NoteList';
import MyNote from './dashboard/MyNote';
import { Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<NoteList/>} />
        <Route path='/my_note' element={<MyNote/>} />
      </Routes>
    </>
      
    
  );
}

export default App;

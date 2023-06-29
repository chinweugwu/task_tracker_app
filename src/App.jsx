import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskTracker from './components/TaskTracker';
import * as ReactDOM from "react-dom/client";
import { Routes, Route} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import './App.css'

function App() {
    return (
        <div>
          <AuthContextProvider>
            <Routes>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>

                <Route path='/tasktracker' element={
                                                  <ProtectedRoute><TaskTracker/></ProtectedRoute>
                                                  }></Route>
            </Routes>
          </AuthContextProvider>        
        </div>
    )
}

export default App

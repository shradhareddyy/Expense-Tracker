import React from 'react'

import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
 } from 'react-router-dom'

 import Login from "./pages/Auth/Login";
 import SignUp from './pages/Auth/SignUp';
 import Home from './pages/Dashboard/Home';
 import Income from "./pages/Dashboard/Income";
 import Expense from './pages/Dashboard/Expense';


const App = () => {
  return (
    
      <div>
    <Router>
      <Routes>
        <Route path='/' element={<Root/>} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<SignUp />} />
        <Route path='/dashboard' exact element={<Home />} />
        <Route path='/expense' exact element={<Expense />} />
        <Route path='/income' exact element={<Income />} />
      </Routes>
    </Router>
      </div>
  
  )
}

export default App

const Root=()=>{
  //CHECKING IF TOKEN EXSISTS IN LOCAL STORAGE
  const isAuthenticated=!!localStorage.getItem("token");

  //redirected to dashboard if authenticated,otherwise to login 
  return isAuthenticated ? (<Navigate to="/dashboard"/>):(<Navigate to="/login"/>);
};
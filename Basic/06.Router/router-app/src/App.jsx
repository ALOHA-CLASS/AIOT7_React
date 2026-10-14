import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Board from './pages/Board'
import Admin from './pages/Admin'
import { useState } from 'react'

function App() {

  // 🧊 state
  const [isLogin, setIsLogin] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/boards/:id' element={ <Board /> } />
        <Route path='/admin' element={ isLogin ? <Admin /> : <Navigate to="/login" /> } />
      </Routes>
    </BrowserRouter>   
  )
}

export default App

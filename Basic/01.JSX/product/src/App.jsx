import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header />
     <Home />
     <Footer />
    </>
  )
}

export default App

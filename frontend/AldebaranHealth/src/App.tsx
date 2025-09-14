import Home from './pages/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Services from './pages/Services'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<SignUp />} path="/signup"></Route>
        <Route element={<Home />} path="/"></Route>
        <Route element={<About />} path="/about"></Route>
        <Route element={<Services />} path="/services"></Route>
      </Routes>
    </Router>
  )
}

export default App

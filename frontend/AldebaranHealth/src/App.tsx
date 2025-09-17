import Home from './pages/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Services from './pages/Services'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './route/ProtectedRoute'
import Conversation from './pages/Conversation'

function App() {

  return (
    <AuthProvider>
      <Router>
          <Routes>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<SignUp />} path="/signup"></Route>

          <Route element={<Home />} path="/"></Route>
          <Route element={<About />} path="/about"></Route>
          <Route element={<Services />} path="/services"></Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Conversation />} path="/conversation"></Route>
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

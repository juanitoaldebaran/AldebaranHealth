import Home from './pages/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Services from './pages/Services'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './route/ProtectedRoute'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<SignUp />} path="/signup"></Route>

        <Route element={<Home />} path="/"></Route>
        <Route element={<About />} path="/about"></Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Services />} path="/services"></Route>
        </Route>


        <Route element={<Navigate to={"/"} replace></Navigate>} path="*"></Route>
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

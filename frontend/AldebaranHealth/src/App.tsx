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
import StressAnalysis from './pages/StressAnalysis'
import HealthCare from './pages/HealthCare'


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Services />} path="/services" />
          <Route element={<StressAnalysis />} path="/stress-analysis"/>
          <Route element={<HealthCare />} path="/healthcare"/>
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Conversation />} path="/conversation" />
            <Route element={<Conversation />} path="/conversation/:conversationId/messages" />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
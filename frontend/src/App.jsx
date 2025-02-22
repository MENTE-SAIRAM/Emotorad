
import './App.css'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin'
import Forgetpassword from './pages/Frogetpassword';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgetpassword" element={<Forgetpassword/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
    </>

  )
}

export default App

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/signup';
import LoginForm from './components/login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import NavBar from './components/NavBar';
import { useEffect } from 'react';

function App() {

const userRole = localStorage.getItem('role');
  return (
    <Router>
      <NavBar />
      <Routes>
       <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
       <Route path='/admindashboard' element={userRole === 'admin' ? <AdminDashboard /> : <LoginForm />} />
        <Route path='/userdashboard' element={userRole === 'user' ? <UserDashboard /> : <LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;

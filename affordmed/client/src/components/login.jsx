import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', 
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:4000/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      const data = await response.json();
    const { role, email } = data;

    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    if (role === 'user') {  
      window.location.href = '/userdashboard';
    }
    else{
     window.location.href = '/admindashboard';
    }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-black shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-lg font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign up here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

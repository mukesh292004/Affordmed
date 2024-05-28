import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const signUp = async () => {
    try {
      const response = await fetch("http://localhost:4000/Auth/signup", {
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
      console.error('Sign up error:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp();
    } catch (error) {
      console.error('Sign up error:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
          <div className="mb-6">
            <label className="block text-white text-lg font-bold mb-2" htmlFor="password">
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
            <label className="block text-white text-lg font-bold mb-2" htmlFor="role">
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
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

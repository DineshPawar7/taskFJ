import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import * as api from '../api';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.login(formData);
      login(data);
      toast.success('Logged in successfully!');
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-black">Email</label>
          <input type="email" name="email" onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-6">
          <label className="block text-black">Password</label>
          <input type="password" name="password" onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" className="w-full bg-primary py-2 rounded">Login</button>
        <div className="mt-4 text-center">
          <Link to="/forgot-password"
           className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
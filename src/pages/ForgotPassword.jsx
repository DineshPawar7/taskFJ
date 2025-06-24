import React, { useState } from 'react';
import * as api from '../api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data } = await api.forgotPassword({ email });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <p className="text-center text-black mb-4">Enter your email.</p>
        <div className="mb-4">
          <label className="block text-black">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded">
          {loading ? 'Sending...' : 'Send Reset Token'}
        </button>
        {message && <p className="mt-4 text-green-600 bg-green-100 p-3 rounded">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
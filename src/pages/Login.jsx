
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import * as api from '../api';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    const token = credentialResponse.credential;

    try {
      const { data } = await api.googleLogin(token);

      login(data);

      toast.success('Logged in successfully!');

      if (data?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Google Login Error:', error);

      const message =
        error.response?.data?.message ||
        error.message ||
        'Google Login failed. Please try again later.';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google Login was unsuccessful. Please try again.');
  };

  return (
    <div className="max-w-sm mx-auto mt-20 flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg text-center w-full border border-black">
        <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
        <p className="text-black mb-6">Sign in to continue</p>

        {loading ? (
          <button
            className="w-full py-2 text-white rounded-md cursor-not-allowed opacity-70"
            disabled
            aria-busy="true"
          >
            Signing in...
          </button>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            aria-label="Login with Google"
          />
        )}
      </div>
    </div>
  );
};

export default Login;

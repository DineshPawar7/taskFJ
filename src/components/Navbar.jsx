import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            TaskFJ
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/create-post">Create Post</Link>
                {isAdmin && (
                  <Link to="/admin/dashboard" className="font-semibold text-secondary">Admin Dashboard</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-primary text-black px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="bg-primary px-3 py-1 rounded">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
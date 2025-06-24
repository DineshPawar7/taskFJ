import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-6xl font-bold text-black">404</h1>
      <p className="text-2xl text-black mt-4">Page Not Found</p>
      <p className="text-black mt-2">The page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="mt-6 inline-block bg-primary py-2 px-4 rounded"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
import React, { useState, useEffect } from 'react';
import * as api from '../api';
import toast from 'react-hot-toast';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const { data } = await api.fetchPosts();
        setPosts(data);
      } catch (error) {
        toast.error('Could not fetch posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllPost();
  }, []);

  if (loading) {
    return <div className='text-center mt-10'>Loading Posts</div>;
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6 text-center'>All Posts</h1>
      {posts.length === 0 ? (
        <p className='text-center text-black'>No posts, plz create</p>
      ) : (
        <div className='space-y-4'>
          {posts.map((post) => (
            <div key={post._id} className='bg-white p-6 rounded-lg border border-black'>
              <p className='text-black text-lg'>{post.content}</p>
              <div className='mt-4 text-sm text-black flex justify-between items-center'>
                <span>By: <span className='font-semibold'>{post.author?.username || 'Unknown User'}</span></span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

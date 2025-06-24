import React, { useState, useEffect } from 'react';
import * as api from '../api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, postsRes] = await Promise.all([
          api.fetchAllUsers(),
          api.fetchPosts(),
        ]);
        setUsers(usersRes.data);
        setPosts(postsRes.data);
      } catch (error) {
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
        setPosts(posts.filter((post) => post.author !== userId));
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

 const handleDeletePost = async (postId) => {
  if (window.confirm('Are you sure?')) {
    try {
      await api.deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  }
};



  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-black bg-gray-100 text-left text-xs font-semibold text-black uppercase tracking-wider">Username</th>
              <th className="px-5 py-3 border-b-2 border-black bg-gray-100 text-left text-xs font-semibold text-black uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 border-b-2 border-black bg-gray-100 text-left text-xs font-semibold text-black uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 border-b-2 border-black bg-gray-100 text-left text-xs font-semibold text-black uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-5 py-5 border-b border-black bg-white text-sm">{user.username}</td>
                <td className="px-5 py-5 border-b border-black bg-white text-sm">{user.email}</td>
                <td className="px-5 py-5 border-b border-black bg-white text-sm">{user.role}</td>
                <td className="px-5 py-5 border-b border-black bg-white text-sm">
                  <button onClick={() => alert('Update user functionality to be implemented')} className="text-primary mr-4">Edit</button>
                  <button onClick={() => handleDeleteUser(user._id)} className="text-secondary">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">User Posts</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => {
          const author = users.find(user => user._id === post.author);
          return (
            <div key={post._id} className="bg-white p-4 rounded-lg border border-black">
              <p>{post.content}</p>
              <p className="text-xs text-black mt-2">By: {author ? author.username : 'Unknown'}</p>
              <div className="mt-2">
                 <button onClick={() => handleDeletePost(post._id)} className="text-xs text-secondary">Delete Post</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
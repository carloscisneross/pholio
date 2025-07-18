import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Image, FileText, Link, Video, Smile } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (postContent.trim()) {
      // TODO: Implement post creation
      console.log('Creating post:', postContent);
      setPostContent('');
    }
  };

  const mockPosts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        picture: '/api/placeholder/40/40',
        username: 'sarahjohnson',
        user_type: 'recruiter'
      },
      content: 'Just posted a new UX Designer position at TechCorp. Looking for someone with 3+ years experience in Figma and user research. Check out the job board!',
      timestamp: '2 hours ago',
      reactions: { likes: 12, comments: 3 }
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        picture: '/api/placeholder/40/40',
        username: 'mikechen',
        user_type: 'regular'
      },
      content: 'Just updated my Pholio with my latest web development projects. Excited to share my React and Node.js work with the community!',
      timestamp: '4 hours ago',
      reactions: { likes: 8, comments: 2 }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">
            What would you like to share with the community today?
          </p>
        </div>

        {/* Post Composer */}
        <div className="card p-6 mb-8">
          <div className="flex items-start space-x-4">
            <img
              src={user?.picture || '/api/placeholder/40/40'}
              alt={user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your thoughts, updates, or link to your Pholio..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="3"
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <Image className="w-5 h-5 mr-1" />
                    <span className="text-sm">Photo</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <Video className="w-5 h-5 mr-1" />
                    <span className="text-sm">Video</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <FileText className="w-5 h-5 mr-1" />
                    <span className="text-sm">Pholio</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <Link className="w-5 h-5 mr-1" />
                    <span className="text-sm">Link</span>
                  </button>
                </div>
                
                <button
                  onClick={handlePost}
                  disabled={!postContent.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <div key={post.id} className="card p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={post.user.picture}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                    <span className="text-gray-500">@{post.user.username}</span>
                    {post.user.user_type === 'recruiter' && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Recruiter
                      </span>
                    )}
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500 text-sm">{post.timestamp}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-6 text-gray-500">
                    <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                      <Smile className="w-4 h-4" />
                      <span className="text-sm">{post.reactions.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                      <span className="text-sm">{post.reactions.comments} comments</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="btn-outline">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
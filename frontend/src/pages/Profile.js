import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Clock, Briefcase, ExternalLink } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8">
          <div className="flex items-start space-x-6">
            <img
              src={user?.picture || '/api/placeholder/120/120'}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-medium"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                {user?.user_type === 'recruiter' && (
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    Recruiter
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-4">
                {user?.username ? `@${user.username}` : 'No username set'}
              </p>
              
              <div className="flex items-center space-x-6 text-gray-500 mb-4">
                {user?.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user?.timezone && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{user.timezone}</span>
                  </div>
                )}
                {user?.job_focus_area && (
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{user.job_focus_area}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="btn-primary">
                  Edit Profile
                </button>
                <button className="btn-outline flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>View Public Pholio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/pholio" className="block text-blue-600 hover:text-blue-700">
                My Pholio
              </a>
              <a href="/rooms" className="block text-blue-600 hover:text-blue-700">
                Room List
              </a>
              <a href="/jobs" className="block text-blue-600 hover:text-blue-700">
                Saved Jobs
              </a>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stats</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Profile Views</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Pholio Views</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Connections</span>
                <span>0</span>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Email:</span> {user?.email}
              </div>
              <div>
                <span className="font-medium">Member since:</span> Today
              </div>
              <div>
                <span className="font-medium">Type:</span> {user?.user_type}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
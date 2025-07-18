import React, { useState } from 'react';
import { Plus, Upload, Eye, Lock, Share2, MoreVertical } from 'lucide-react';

const PholioPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [pholioName, setPholioName] = useState('');
  const [pholioDescription, setPholioDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const mockPholios = [
    {
      id: 1,
      name: 'Web Development Portfolio',
      description: 'Full-stack web development projects including React, Node.js, and MongoDB applications',
      isPrivate: false,
      filesCount: 12,
      viewsCount: 45,
      lastUpdated: '2 days ago',
      tags: ['React', 'Node.js', 'MongoDB', 'JavaScript']
    },
    {
      id: 2,
      name: 'Design Projects',
      description: 'UI/UX design work and prototypes',
      isPrivate: true,
      filesCount: 8,
      viewsCount: 23,
      lastUpdated: '1 week ago',
      tags: ['Figma', 'UI/UX', 'Design', 'Prototyping']
    }
  ];

  const handleCreatePholio = () => {
    if (pholioName.trim()) {
      // TODO: Implement Pholio creation
      console.log('Creating Pholio:', { pholioName, pholioDescription, isPrivate });
      setPholioName('');
      setPholioDescription('');
      setIsPrivate(false);
      setShowCreateModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Pholios</h1>
            <p className="text-gray-600 mt-1">
              Showcase your work and track engagement
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Pholio</span>
          </button>
        </div>

        {/* Pholio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPholios.map((pholio) => (
            <div key={pholio.id} className="card p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">{pholio.name}</h3>
                  {pholio.isPrivate ? (
                    <Lock className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{pholio.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {pholio.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{pholio.filesCount} files</span>
                <span>{pholio.viewsCount} views</span>
                <span>{pholio.lastUpdated}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 btn-primary text-sm">
                  <Upload className="w-4 h-4 mr-1" />
                  Add Files
                </button>
                <button className="btn-outline text-sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </button>
              </div>
            </div>
          ))}
          
          {/* Create New Pholio Card */}
          <div
            onClick={() => setShowCreateModal(true)}
            className="card p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer transition-colors flex items-center justify-center"
          >
            <div className="text-center">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Pholio</h3>
              <p className="text-gray-600 text-sm">
                Start showcasing your work
              </p>
            </div>
          </div>
        </div>

        {/* Create Pholio Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-large p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Pholio</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pholio Name
                  </label>
                  <input
                    type="text"
                    value={pholioName}
                    onChange={(e) => setPholioName(e.target.value)}
                    className="input-field"
                    placeholder="Enter pholio name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={pholioDescription}
                    onChange={(e) => setPholioDescription(e.target.value)}
                    className="input-field"
                    rows="3"
                    placeholder="Describe your pholio"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="private"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="private" className="text-sm text-gray-700">
                    Make this pholio private
                  </label>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={handleCreatePholio}
                  disabled={!pholioName.trim()}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  Create Pholio
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PholioPage;
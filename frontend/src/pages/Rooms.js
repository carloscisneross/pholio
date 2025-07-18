import React, { useState } from 'react';
import { Users, Plus, Lock, Globe, MessageCircle, Video } from 'lucide-react';

const Rooms = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const mockRooms = [
    {
      id: 1,
      name: 'Frontend Developers',
      description: 'Discussion about React, Vue, and modern frontend technologies',
      isPrivate: false,
      participantCount: 24,
      lastMessage: 'Just shared a new React hook for state management',
      lastMessageTime: '5 minutes ago',
      host: {
        name: 'Sarah Johnson',
        picture: '/api/placeholder/32/32'
      }
    },
    {
      id: 2,
      name: 'Design System Chat',
      description: 'Collaborative space for UX/UI designers',
      isPrivate: true,
      participantCount: 12,
      lastMessage: 'New Figma component library available',
      lastMessageTime: '2 hours ago',
      host: {
        name: 'Mike Chen',
        picture: '/api/placeholder/32/32'
      }
    },
    {
      id: 3,
      name: 'Job Opportunities',
      description: 'Share and discuss job openings',
      isPrivate: false,
      participantCount: 156,
      lastMessage: 'New senior developer position at TechCorp',
      lastMessageTime: '1 day ago',
      host: {
        name: 'Alex Rodriguez',
        picture: '/api/placeholder/32/32'
      }
    }
  ];

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      // TODO: Implement room creation
      console.log('Creating room:', { roomName, roomDescription, isPrivate });
      setRoomName('');
      setRoomDescription('');
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
            <h1 className="text-3xl font-bold text-gray-900">Rooms</h1>
            <p className="text-gray-600 mt-1">
              Join conversations and collaborate with the community
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Room</span>
          </button>
        </div>

        {/* Room Categories */}
        <div className="flex items-center space-x-4 mb-8">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            All Rooms
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
            Public
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
            Private
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
            My Rooms
          </button>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRooms.map((room) => (
            <div key={room.id} className="card p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                  {room.isPrivate ? (
                    <Lock className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Globe className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{room.participantCount}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{room.description}</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={room.host.picture}
                  alt={room.host.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-500">Hosted by {room.host.name}</span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <MessageCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Last message</span>
                </div>
                <p className="text-sm text-gray-700">{room.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-1">{room.lastMessageTime}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 btn-primary text-sm">
                  Join Room
                </button>
                <button className="btn-outline text-sm">
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {/* Create Room Card */}
          <div
            onClick={() => setShowCreateModal(true)}
            className="card p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer transition-colors flex items-center justify-center"
          >
            <div className="text-center">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Room</h3>
              <p className="text-gray-600 text-sm">
                Start a new conversation
              </p>
            </div>
          </div>
        </div>

        {/* Create Room Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-large p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Room</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="input-field"
                    placeholder="Enter room name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                    className="input-field"
                    rows="3"
                    placeholder="Describe the room's purpose"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="private-room"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="private-room" className="text-sm text-gray-700">
                    Make this room private
                  </label>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={handleCreateRoom}
                  disabled={!roomName.trim()}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  Create Room
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

export default Rooms;
import React, { useState } from 'react';
import { Search, Send, Paperclip, Plus, MoreVertical } from 'lucide-react';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  const mockConversations = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        picture: '/api/placeholder/40/40',
        username: 'sarahjohnson',
        user_type: 'recruiter'
      },
      lastMessage: 'Thanks for submitting your Pholio! I\'d love to discuss the UX Designer position.',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        picture: '/api/placeholder/40/40',
        username: 'mikechen',
        user_type: 'regular'
      },
      lastMessage: 'Great work on your latest project! How did you implement the authentication?',
      timestamp: '1 day ago',
      unread: false
    }
  ];

  const mockMessages = [
    {
      id: 1,
      senderId: 1,
      content: 'Hi! I saw your Pholio and I\'m impressed with your web development projects.',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      senderId: 'me',
      content: 'Thank you! I really enjoyed working on those React applications.',
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      senderId: 1,
      content: 'Thanks for submitting your Pholio! I\'d love to discuss the UX Designer position.',
      timestamp: '2 hours ago'
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // TODO: Implement message sending
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const selectedUser = mockConversations.find(c => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto">
                {mockConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                      selectedConversation === conversation.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={conversation.user.picture}
                        alt={conversation.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.user.name}
                          </p>
                          {conversation.user.user_type === 'recruiter' && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              Recruiter
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate mb-1">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400">{conversation.timestamp}</p>
                      </div>
                      {conversation.unread && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={selectedUser?.user.picture}
                          alt={selectedUser?.user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {selectedUser?.user.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            @{selectedUser?.user.username}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === 'me'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-500">
                      Choose a conversation to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Plus, Bookmark, ExternalLink } from 'lucide-react';

const JobBoard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockJobs = [
    {
      id: 1,
      title: 'Senior UX Designer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      posted: '2 days ago',
      applications: 12,
      tags: ['UX', 'Design', 'Figma', 'Research'],
      description: 'We are looking for a Senior UX Designer to join our product team...',
      recruiter: {
        name: 'Sarah Johnson',
        picture: '/api/placeholder/40/40'
      }
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Contract',
      salary: '$80k - $100k',
      posted: '1 week ago',
      applications: 8,
      tags: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      description: 'Join our team as a Full Stack Developer working on cutting-edge web applications...',
      recruiter: {
        name: 'Mike Chen',
        picture: '/api/placeholder/40/40'
      }
    }
  ];

  const filters = [
    { id: 'all', label: 'All Jobs' },
    { id: 'full-time', label: 'Full-time' },
    { id: 'part-time', label: 'Part-time' },
    { id: 'contract', label: 'Contract' },
    { id: 'remote', label: 'Remote' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Board</h1>
            <p className="text-gray-600 mt-1">
              Discover opportunities and showcase your Pholio
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post Job</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs by title, company, or skills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="btn-outline flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Job List */}
        <div className="space-y-6">
          {mockJobs.map((job) => (
            <div key={job.id} className="card p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={job.recruiter.picture}
                    alt={job.recruiter.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-gray-600 font-medium mb-2">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-700 mb-4">{job.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Posted {job.posted}</span>
                  <span>•</span>
                  <span>{job.applications} applications</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="btn-outline text-sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  <button className="btn-primary text-sm">
                    Submit Pholio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="btn-outline">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
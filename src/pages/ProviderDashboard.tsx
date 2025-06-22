import React, { useState } from 'react';
import { Calendar, DollarSign, Star, Bell, CheckCircle, XCircle, FileText, BarChart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import VoiceAssistant from '../components/VoiceAssistant';

const ProviderDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  const mockRequests = [
    {
      id: 1,
      service: 'Home Cleaning',
      customer: 'Priya Sharma',
      date: '2024-12-20',
      time: '10:00 AM',
      amount: '₹500',
      status: 'pending'
    },
    {
      id: 2,
      service: 'Garden Maintenance',
      customer: 'Amit Kumar',
      date: '2024-12-22',
      time: '2:00 PM',
      amount: '₹800',
      status: 'pending'
    }
  ];

  const mockEarnings = {
    today: '₹1,200',
    thisWeek: '₹8,400',
    thisMonth: '₹34,500',
    total: '₹1,25,000'
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('accept') || lowerCommand.includes('yes')) {
      // Handle accept booking
      console.log('Accepting booking via voice');
    } else if (lowerCommand.includes('decline') || lowerCommand.includes('no') || lowerCommand.includes('reject')) {
      // Handle decline booking
      console.log('Declining booking via voice');
    } else if (lowerCommand.includes('earnings') || lowerCommand.includes('money')) {
      setActiveTab('earnings');
    } else if (lowerCommand.includes('profile')) {
      setActiveTab('profile');
    } else if (lowerCommand.includes('request') || lowerCommand.includes('booking')) {
      setActiveTab('requests');
    } else if (lowerCommand.includes('overview') || lowerCommand.includes('dashboard')) {
      setActiveTab('overview');
    }
  };

  const voiceCommands = [
    "Accept booking",
    "Decline booking", 
    "Show earnings",
    "Open profile",
    "View requests",
    "Go to overview"
  ];

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-2xl p-6 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {t('dashboard.welcome')}, {user?.name}!
              </h1>
              <p className="opacity-90">Manage your services and grow your business</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                user?.verified 
                  ? 'bg-green-500 text-white' 
                  : 'bg-yellow-500 text-white'
              }`}>
                {user?.verified ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-1" />
                    Pending Verification
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">
                  {mockEarnings.today}
                </h3>
                <p className="text-primary-600 dark:text-primary-400">Today</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">5</h3>
                <p className="text-primary-600 dark:text-primary-400">Pending Requests</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">4.9</h3>
                <p className="text-primary-600 dark:text-primary-400">Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <BarChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">47</h3>
                <p className="text-primary-600 dark:text-primary-400">Completed Jobs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary-700 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-300'
              }`}
            >
              <BarChart className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === 'requests'
                  ? 'border-b-2 border-primary-700 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-300'
              }`}
            >
              <Bell className="w-4 h-4 inline mr-2" />
              Service Requests
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === 'earnings'
                  ? 'border-b-2 border-primary-700 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-300'
              }`}
            >
              <DollarSign className="w-4 h-4 inline mr-2" />
              {t('dashboard.earnings')}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-b-2 border-primary-700 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-300'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              {t('dashboard.profile')}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-primary-800 dark:text-primary-200">
                      Completed: Home Cleaning
                    </p>
                    <p className="text-xs text-primary-600 dark:text-primary-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-primary-800 dark:text-primary-200">
                      New booking request
                    </p>
                    <p className="text-xs text-primary-600 dark:text-primary-400">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Commands Help */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-4">
                Voice Commands
              </h3>
              <div className="space-y-2">
                <p className="text-primary-600 dark:text-primary-400 text-sm mb-3">
                  Use the voice assistant to manage your services:
                </p>
                {voiceCommands.slice(0, 4).map((command, index) => (
                  <div key={index} className="flex items-center p-2 bg-primary-50 dark:bg-primary-900 rounded-lg">
                    <div className="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
                    <span className="text-sm text-primary-700 dark:text-primary-300">
                      "{command}"
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-primary-800 dark:text-primary-200 mb-6">
                Service Requests
              </h2>
              <div className="space-y-4">
                {mockRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-primary-800 dark:text-primary-200">
                          {request.service}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400">{request.customer}</p>
                        <p className="text-sm text-primary-500">
                          {request.date} at {request.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-800 dark:text-primary-200">
                          {request.amount}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        Accept
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        <XCircle className="w-4 h-4 inline mr-2" />
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-4">
                Earnings Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-400">Today</span>
                  <span className="font-semibold text-primary-800 dark:text-primary-200">
                    {mockEarnings.today}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-400">This Week</span>
                  <span className="font-semibold text-primary-800 dark:text-primary-200">
                    {mockEarnings.thisWeek}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-400">This Month</span>
                  <span className="font-semibold text-primary-800 dark:text-primary-200">
                    {mockEarnings.thisMonth}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-primary-700 dark:text-primary-300">Total Earnings</span>
                    <span className="text-lg font-bold text-primary-800 dark:text-primary-200">
                      {mockEarnings.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-4">
                Withdrawal
              </h3>
              <div className="text-center py-8">
                <p className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">
                  ₹15,600
                </p>
                <p className="text-primary-600 dark:text-primary-400 mb-6">Available for withdrawal</p>
                <button className="w-full px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors">
                  Request Withdrawal
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-6">
              Profile & Services
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-primary-600 dark:text-primary-400 mb-1">Name</label>
                    <p className="text-primary-800 dark:text-primary-200">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-primary-600 dark:text-primary-400 mb-1">Phone</label>
                    <p className="text-primary-800 dark:text-primary-200">{user?.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-primary-600 dark:text-primary-400 mb-1">Location</label>
                    <p className="text-primary-800 dark:text-primary-200">{user?.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-primary-600 dark:text-primary-400 mb-1">Status</label>
                    <p className={user?.verified ? 'text-green-600' : 'text-yellow-600'}>
                      {user?.verified ? 'Verified' : 'Pending Verification'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-primary-800 dark:text-primary-200 mb-4">
                  Services Offered
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h5 className="font-medium text-primary-800 dark:text-primary-200">Home Cleaning</h5>
                    <p className="text-sm text-primary-600 dark:text-primary-400">₹500/hour</p>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h5 className="font-medium text-primary-800 dark:text-primary-200">Garden Maintenance</h5>
                    <p className="text-sm text-primary-600 dark:text-primary-400">₹600/hour</p>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors">
                  Add New Service
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Assistant */}
      <VoiceAssistant 
        onCommand={handleVoiceCommand}
        commands={voiceCommands}
        isProvider={true}
      />
    </div>
  );
};

export default ProviderDashboard;
import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Calendar, CreditCard, History, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import VoiceSearch from '../components/VoiceSearch';
import VoiceAssistant from '../components/VoiceAssistant';

const UserDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('search');

  const mockServices = [
    {
      id: 1,
      name: 'Home Cleaning',
      provider: 'Rajesh Kumar',
      rating: 4.8,
      price: '₹500/hour',
      location: 'Ludhiana',
      available: true,
      image: 'https://images.pexels.com/photos/6195122/pexels-photo-6195122.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'Plumbing Services',
      provider: 'Gurpreet Singh',
      rating: 4.9,
      price: '₹800/visit',
      location: 'Amritsar',
      available: true,
      image: 'https://images.pexels.com/photos/8005395/pexels-photo-8005395.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'Garden Maintenance',
      provider: 'Simran Kaur',
      rating: 4.7,
      price: '₹600/hour',
      location: 'Jalandhar',
      available: false,
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const mockBookings = [
    {
      id: 1,
      service: 'Home Cleaning',
      provider: 'Rajesh Kumar',
      date: '2024-12-15',
      status: 'Completed',
      amount: '₹500'
    },
    {
      id: 2,
      service: 'Plumbing Services',
      provider: 'Gurpreet Singh',
      date: '2024-12-10',
      status: 'Upcoming',
      amount: '₹800'
    }
  ];

  const handleVoiceSearch = (transcript: string) => {
    setSearchQuery(transcript);
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('search') || lowerCommand.includes('find')) {
      setActiveTab('search');
    } else if (lowerCommand.includes('booking') || lowerCommand.includes('history')) {
      setActiveTab('bookings');
    } else if (lowerCommand.includes('notification')) {
      setActiveTab('notifications');
    }
  };

  const voiceCommands = [
    "Search for services",
    "Show my bookings",
    "Open notifications",
    "Find cleaning services",
    "Book a plumber"
  ];

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-2xl p-6 mb-8 text-white">
          <h1 className="text-2xl font-bold mb-2">
            {t('dashboard.welcome')}, {user?.name}!
          </h1>
          <p className="opacity-90">Find and book services from trusted local providers</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">3</h3>
                <p className="text-primary-600 dark:text-primary-400">Active Bookings</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">4.8</h3>
                <p className="text-primary-600 dark:text-primary-400">Avg Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">₹2,400</h3>
                <p className="text-primary-600 dark:text-primary-400">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'search'
                  ? 'border-b-2 border-primary-700 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-300'
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              {t('dashboard.search_services')}
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-primary-700 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-300'
              }`}
            >
              <History className="w-4 h-4 inline mr-2" />
              {t('dashboard.my_bookings')}
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-primary-700 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-300'
              }`}
            >
              <Bell className="w-4 h-4 inline mr-2" />
              {t('dashboard.notifications')}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for services..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-primary-900 dark:text-primary-100"
                  />
                </div>
                <button className="px-6 py-3 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors">
                  <Filter className="w-5 h-5 inline mr-2" />
                  Filters
                </button>
              </div>

              {/* Voice Search Component */}
              <VoiceSearch 
                onTranscript={handleVoiceSearch}
                placeholder="Tap to search with voice"
                className="border-t pt-6"
              />
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockServices
                .filter(service => 
                  searchQuery === '' || 
                  service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  service.provider.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((service) => (
                <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">
                        {service.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        service.available
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {service.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                    <p className="text-primary-600 dark:text-primary-400 mb-2">{service.provider}</p>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm text-primary-600 dark:text-primary-400">
                        {service.rating}
                      </span>
                      <MapPin className="w-4 h-4 ml-4 text-primary-500" />
                      <span className="ml-1 text-sm text-primary-600 dark:text-primary-400">
                        {service.location}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary-800 dark:text-primary-200">
                        {service.price}
                      </span>
                      <button
                        disabled={!service.available}
                        className="px-4 py-2 bg-primary-700 hover:bg-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-primary-800 dark:text-primary-200 mb-6">
                Your Bookings
              </h2>
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-primary-800 dark:text-primary-200">
                          {booking.service}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400">{booking.provider}</p>
                        <p className="text-sm text-primary-500">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          booking.status === 'Completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {booking.status}
                        </span>
                        <p className="text-lg font-bold text-primary-800 dark:text-primary-200 mt-2">
                          {booking.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-primary-800 dark:text-primary-200 mb-6">
                Notifications
              </h2>
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-primary-600 dark:text-primary-400">
                  No new notifications
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Assistant */}
      <VoiceAssistant 
        onCommand={handleVoiceCommand}
        commands={voiceCommands}
        isProvider={false}
      />
    </div>
  );
};

export default UserDashboard;
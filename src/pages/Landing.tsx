import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, ArrowRight, Globe, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-200 via-secondary-100 to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-primary-700 dark:text-primary-300 hover:bg-white dark:hover:bg-gray-800 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'en' ? 'ਪੰਜਾਬੀ' : 'English'}
            </span>
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-primary-700 dark:text-primary-300 hover:bg-white dark:hover:bg-gray-800 transition-all"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 -mt-16">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl bg-white p-2">
            <img 
              src="/logo.jpg" 
              alt="Mera Pind Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-800 dark:text-primary-200 mb-4">
            {t('landing.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-600 dark:text-primary-400 mb-2">
            {t('landing.subtitle')}
          </p>
          <p className="text-primary-500 dark:text-primary-500 max-w-md mx-auto">
            {t('landing.description')}
          </p>
        </div>

        {/* User Selection */}
        <div className="w-full max-w-4xl animate-scale-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-primary-800 dark:text-primary-200 mb-8">
            {t('landing.who_are_you')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Customer Card */}
            <div
              onClick={() => navigate('/register/user')}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-primary-100 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-600"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                  <Users className="w-8 h-8 text-primary-700 dark:text-primary-300" />
                </div>
                <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-200 mb-2">
                  {t('landing.user')}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-4">
                  {t('landing.user_desc')}
                </p>
                <div className="flex items-center justify-center text-primary-700 dark:text-primary-300 group-hover:text-primary-800 dark:group-hover:text-primary-200">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Service Provider Card */}
            <div
              onClick={() => navigate('/register/provider')}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-primary-100 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-600"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                  <Briefcase className="w-8 h-8 text-primary-700 dark:text-primary-300" />
                </div>
                <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-200 mb-2">
                  {t('landing.provider')}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-4">
                  {t('landing.provider_desc')}
                </p>
                <div className="flex items-center justify-center text-primary-700 dark:text-primary-300 group-hover:text-primary-800 dark:group-hover:text-primary-200">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
              Global Reach
            </h4>
            <p className="text-sm text-primary-600 dark:text-primary-400">
              Connect with customers worldwide
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
              Trusted Network
            </h4>
            <p className="text-sm text-primary-600 dark:text-primary-400">
              Verified service providers
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
              Easy Booking
            </h4>
            <p className="text-sm text-primary-600 dark:text-primary-400">
              Book services instantly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
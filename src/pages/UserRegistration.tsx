import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, User, MapPin, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';

const UserRegistration: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { setUser } = useUser();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOTP = () => {
    if (formData.phone.length >= 10) {
      setOtpSent(true);
      setStep(2);
      // Here you would integrate with Firebase or your OTP service
    }
  };

  const handleVerifyOTP = () => {
    if (formData.otp.length === 6) {
      // Simulate successful verification
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        type: 'user' as const
      };
      setUser(newUser);
      navigate('/dashboard/user');
    }
  };

  return (
    <div className="min-h-screen bg-secondary-200 dark:bg-gray-900 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-primary-700 dark:text-primary-300" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-primary-800 dark:text-primary-200">
            Customer Registration
          </h1>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-primary-700 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
          }`}>
            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            step >= 2 ? 'bg-primary-700' : 'bg-gray-300 dark:bg-gray-600'
          }`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-primary-700 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
          }`}>
            2
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary-800 dark:text-primary-200 text-center">
                Personal Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  {t('register.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-primary-900 dark:text-primary-100"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  {t('register.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-primary-900 dark:text-primary-100"
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  {t('register.location')}
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-primary-900 dark:text-primary-100"
                  placeholder="City, State"
                />
              </div>

              <button
                onClick={handleSendOTP}
                disabled={!formData.name || !formData.phone || !formData.location}
                className="w-full py-3 bg-primary-700 hover:bg-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Send OTP
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary-800 dark:text-primary-200 text-center">
                Verify Phone Number
              </h2>

              <div className="text-center">
                <p className="text-primary-600 dark:text-primary-400 mb-4">
                  {t('register.otp_sent')}
                </p>
                <p className="text-lg font-semibold text-primary-800 dark:text-primary-200">
                  {formData.phone}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2 text-center">
                  Enter 6-digit OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  maxLength={6}
                  className="w-full px-4 py-3 border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-primary-900 dark:text-primary-100 text-center text-2xl tracking-widest"
                  placeholder="123456"
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={formData.otp.length !== 6}
                className="w-full py-3 bg-primary-700 hover:bg-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                {t('register.verify_otp')}
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full py-2 text-primary-700 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
              >
                {t('common.back')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
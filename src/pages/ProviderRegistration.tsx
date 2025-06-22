import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, User, MapPin, Upload, Camera, FileText, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';

const ProviderRegistration: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { setUser } = useUser();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    otp: '',
    aadharFile: null as File | null,
    photoFile: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'aadharFile' | 'photoFile') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        [field]: file
      });
    }
  };

  const handleNext = () => {
    if (step === 1 && formData.name && formData.phone && formData.location) {
      setStep(2);
    } else if (step === 2 && formData.otp.length === 6) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (formData.aadharFile && formData.photoFile) {
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        type: 'provider' as const,
        verified: false
      };
      setUser(newUser);
      navigate('/dashboard/provider');
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
            Service Provider Registration
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
            {step > 2 ? <Check className="w-4 h-4" /> : '2'}
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            step >= 3 ? 'bg-primary-700' : 'bg-gray-300 dark:bg-gray-600'
          }`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-primary-700 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
          }`}>
            3
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
                onClick={handleNext}
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
                onClick={handleNext}
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

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary-800 dark:text-primary-200 text-center">
                Document Verification
              </h2>

              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  {t('register.upload_aadhar')}
                </label>
                <div className="border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'aadharFile')}
                    className="hidden"
                    id="aadhar-upload"
                  />
                  <label htmlFor="aadhar-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-primary-700 dark:text-primary-300">
                      {formData.aadharFile ? formData.aadharFile.name : 'Click to upload PDF/JPG'}
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  <Camera className="w-4 h-4 inline mr-2" />
                  {t('register.upload_photo')}
                </label>
                <div className="border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'photoFile')}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Camera className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-primary-700 dark:text-primary-300">
                      {formData.photoFile ? formData.photoFile.name : 'Click to upload photo'}
                    </p>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formData.aadharFile || !formData.photoFile}
                className="w-full py-3 bg-primary-700 hover:bg-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                {t('register.submit')}
              </button>

              <button
                onClick={() => setStep(2)}
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

export default ProviderRegistration;
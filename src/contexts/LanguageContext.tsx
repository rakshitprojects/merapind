import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pa';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Landing Page
    'landing.title': 'Rural Services Platform',
    'landing.subtitle': 'Connect • Serve • Grow',
    'landing.description': 'Connecting rural service providers with customers worldwide',
    'landing.who_are_you': 'Who are you?',
    'landing.user': 'Customer',
    'landing.user_desc': 'Looking for services',
    'landing.provider': 'Service Provider',
    'landing.provider_desc': 'Offering services',
    
    // Registration
    'register.name': 'Full Name',
    'register.phone': 'Phone Number',
    'register.location': 'Location',
    'register.upload_aadhar': 'Upload Aadhar/PAN',
    'register.upload_photo': 'Upload Photo',
    'register.submit': 'Register',
    'register.otp_sent': 'OTP sent to your phone',
    'register.verify_otp': 'Verify OTP',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.profile': 'Profile',
    'dashboard.logout': 'Logout',
    'dashboard.search_services': 'Search Services',
    'dashboard.my_bookings': 'My Bookings',
    'dashboard.earnings': 'Earnings',
    'dashboard.notifications': 'Notifications',
    
    // Common
    'common.dark_mode': 'Dark Mode',
    'common.light_mode': 'Light Mode',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
  },
  pa: {
    // Landing Page
    'landing.title': 'ਪੇਂਡੂ ਸੇਵਾ ਪਲੇਟਫਾਰਮ',
    'landing.subtitle': 'ਜੋੜੋ • ਸੇਵਾ ਕਰੋ • ਵਧੋ',
    'landing.description': 'ਪੇਂਡੂ ਸੇਵਾ ਪ੍ਰਦਾਤਾਵਾਂ ਨੂੰ ਦੁਨੀਆ ਭਰ ਦੇ ਗਾਹਕਾਂ ਨਾਲ ਜੋੜਨਾ',
    'landing.who_are_you': 'ਤੁਸੀਂ ਕੌਣ ਹੋ?',
    'landing.user': 'ਗਾਹਕ',
    'landing.user_desc': 'ਸੇਵਾਵਾਂ ਦੀ ਭਾਲ ਵਿੱਚ',
    'landing.provider': 'ਸੇਵਾ ਪ੍ਰਦਾਤਾ',
    'landing.provider_desc': 'ਸੇਵਾਵਾਂ ਦੀ ਪੇਸ਼ਕਸ਼',
    
    // Registration
    'register.name': 'ਪੂਰਾ ਨਾਮ',
    'register.phone': 'ਫੋਨ ਨੰਬਰ',
    'register.location': 'ਸਥਾਨ',
    'register.upload_aadhar': 'ਆਧਾਰ/ਪੈਨ ਅੱਪਲੋਡ ਕਰੋ',
    'register.upload_photo': 'ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ',
    'register.submit': 'ਰਜਿਸਟਰ ਕਰੋ',
    'register.otp_sent': 'ਤੁਹਾਡੇ ਫੋਨ ਤੇ OTP ਭੇਜਿਆ ਗਿਆ',
    'register.verify_otp': 'OTP ਤਸਦੀਕ ਕਰੋ',
    
    // Dashboard
    'dashboard.welcome': 'ਸਵਾਗਤ ਹੈ',
    'dashboard.profile': 'ਪ੍ਰੋਫਾਈਲ',
    'dashboard.logout': 'ਲਾਗਆਉਟ',
    'dashboard.search_services': 'ਸੇਵਾਵਾਂ ਖੋਜੋ',
    'dashboard.my_bookings': 'ਮੇਰੀਆਂ ਬੁਕਿੰਗਾਂ',
    'dashboard.earnings': 'ਕਮਾਈ',
    'dashboard.notifications': 'ਸੂਚਨਾਵਾਂ',
    
    // Common
    'common.dark_mode': 'ਡਾਰਕ ਮੋਡ',
    'common.light_mode': 'ਲਾਈਟ ਮੋਡ',
    'common.back': 'ਵਾਪਸ',
    'common.next': 'ਅਗਲਾ',
    'common.cancel': 'ਰੱਦ ਕਰੋ',
    'common.save': 'ਸੇਵ ਕਰੋ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pa' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
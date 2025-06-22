import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import UserRegistration from './pages/UserRegistration';
import ProviderRegistration from './pages/ProviderRegistration';
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <Router>
            <div className="min-h-screen bg-secondary-200 dark:bg-gray-900 transition-colors duration-300">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register/user" element={<Layout><UserRegistration /></Layout>} />
                <Route path="/register/provider" element={<Layout><ProviderRegistration /></Layout>} />
                <Route path="/dashboard/user" element={<Layout><UserDashboard /></Layout>} />
                <Route path="/dashboard/provider" element={<Layout><ProviderDashboard /></Layout>} />
              </Routes>
            </div>
          </Router>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
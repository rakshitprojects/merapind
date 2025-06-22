import React, { useState } from 'react';
import { Mic, MicOff, MessageCircle, X } from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';

interface VoiceAssistantProps {
  onCommand: (command: string) => void;
  commands: string[];
  isProvider?: boolean;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ 
  onCommand, 
  commands,
  isProvider = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  } = useVoiceRecognition();

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  const processCommand = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Common commands for both users and providers
    if (lowerText.includes('accept') || lowerText.includes('yes')) {
      onCommand('accept');
    } else if (lowerText.includes('decline') || lowerText.includes('no') || lowerText.includes('reject')) {
      onCommand('decline');
    } else if (lowerText.includes('earnings') || lowerText.includes('money')) {
      onCommand('earnings');
    } else if (lowerText.includes('profile')) {
      onCommand('profile');
    } else if (lowerText.includes('notification')) {
      onCommand('notifications');
    } else if (lowerText.includes('search')) {
      onCommand('search');
    } else if (lowerText.includes('booking')) {
      onCommand('bookings');
    } else {
      onCommand(text);
    }
  };

  React.useEffect(() => {
    if (transcript) {
      processCommand(transcript);
      resetTranscript();
    }
  }, [transcript]);

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* Floating Voice Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent-500 hover:bg-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Voice Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">
                Voice Assistant
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="text-center mb-6">
              <button
                onClick={handleToggleListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-accent-500 hover:bg-accent-600'
                } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                {isListening ? (
                  <MicOff className="w-10 h-10" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
              </button>
              
              <p className="text-primary-600 dark:text-primary-400 mb-2">
                {isListening ? 'Listening for commands...' : 'Tap to give voice commands'}
              </p>
              
              {isListening && (
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-primary-800 dark:text-primary-200 text-sm">
                Available Commands:
              </h4>
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                {commands.map((command, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg text-sm"
                  >
                    "{command}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
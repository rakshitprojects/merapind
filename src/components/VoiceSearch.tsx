import React, { useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';

interface VoiceSearchProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
  className?: string;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ 
  onTranscript, 
  placeholder = "Tap to speak...",
  className = ""
}) => {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  } = useVoiceRecognition();

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
      resetTranscript();
    }
  }, [transcript, onTranscript, resetTranscript]);

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <div className={`text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}>
        <Volume2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">Voice recognition not supported in this browser</p>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={handleToggleListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-accent-500 hover:bg-accent-600'
        } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
      >
        {isListening ? (
          <MicOff className="w-8 h-8" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </button>
      
      <p className="text-primary-600 dark:text-primary-400 mb-2">
        {isListening ? 'Listening...' : placeholder}
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
      
      <div className="text-sm text-primary-500 space-y-1">
        <p>Try saying:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Search for cleaning services",
            "Find plumbers near me",
            "Book garden maintenance"
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => speakText(example)}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceSearch;

"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getChatbotResponse, findProvidersWithMaps } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { ChartAreaIcon, MessageCircleCode, Paperclip, SendHorizonal, X } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: "Hi! I'm the Lazy Man assistant. How can I help you find a service provider today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { id: 'typing', text: '', sender: 'bot', isTyping: true }]);
    
    // Simple check for location-based query
    if (input.toLowerCase().includes('near me') || input.toLowerCase().includes('nearby')) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const botResponseText = await findProvidersWithMaps(input, { latitude, longitude });
          const botMessage: ChatMessage = { id: Date.now().toString() + 'r', text: botResponseText, sender: 'bot' };
          setMessages(prev => prev.filter(m => !m.isTyping));
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
        },
        async (error) => {
          console.error("Geolocation error:", error);
          const botResponseText = "I can't seem to find your location. Please ensure you've enabled location services in your browser to search for nearby providers.";
          const botMessage: ChatMessage = { id: Date.now().toString() + 'r', text: botResponseText, sender: 'bot' };
          setMessages(prev => prev.filter(m => !m.isTyping));
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
        }
      );
    } else {
      const botResponseText = await getChatbotResponse(messages, input);
      const botMessage: ChatMessage = { id: Date.now().toString() + 'r', text: botResponseText, sender: 'bot' };
      setMessages(prev => prev.filter(m => !m.isTyping));
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  return (
    <>
      <div className={`fixed bottom-17 right-5 z-50 sm:bottom-5 transition-transform duration-300 ${isOpen ? 'translate-y-full scale-0' : 'translate-y-0 scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 text-white rounded-full p-2  shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          aria-label="Open chat"
        >
          <MessageCircleCode className="h-8 w-8" />
        </button>
      </div>

      <div className={`fixed bottom-0 right-0 sm:bottom-5 sm:right-5 z-50 w-full h-full sm:w-96 sm:h-[600px] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <header className="bg-orange-500 text-white p-4 flex justify-between items-center rounded-t-lg">
          <h3 className="font-bold text-lg">AI Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="hover:bg-orange-600 p-1 rounded-full" aria-label="Close chat">
            <X className="h-6 w-6" />
          </button>
        </header>
        
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex my-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.isTyping ? (
                 <div className="bg-gray-200 rounded-lg p-3 max-w-xs animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                 </div>
              ) : (
                <div className={`rounded-lg p-3 max-w-xs whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-orange-500 text-white rounded-md p-2 disabled:bg-orange-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Send message"
            >
              <SendHorizonal className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;

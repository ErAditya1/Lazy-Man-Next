'use client'

import Spinner from '@/components/Spinner';
import { generateComplexPlan } from '@/services/geminiService';
import { PaperclipIcon, SparklesIcon } from 'lucide-react';
import React, { useState } from 'react';

// A simple markdown to HTML converter
const Markdown: React.FC<{ content: string }> = ({ content }) => {
  const htmlContent = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
    .replace(/## (.*?)\n/g, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/# (.*?)\n/g, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^- (.*?)\n/g, '<li class="ml-5 list-disc">$1</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
    .replace(/\n/g, '<br />');

  return <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};


const AiPlannerPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePlan = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description of your project.');
      return;
    }
    setIsLoading(true);
    setError('');
    setPlan('');

    try {
      const result = await generateComplexPlan(prompt);
      setPlan(result);
    } catch (err) {
      setError('Failed to generate a plan. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <SparklesIcon className="h-16 w-16 mx-auto text-orange-500" />
        <h1 className="text-4xl font-extrabold text-gray-800 mt-4">AI Service Planner</h1>
        <p className="mt-4 text-lg text-gray-600">
          Describe your complex project or task, and our advanced AI will generate a step-by-step plan for you.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <label htmlFor="project-description" className="block text-lg font-medium text-gray-700">
          What do you need help with?
        </label>
        <p className="text-sm text-gray-500 mt-1">
          Example: "I need to prepare my 2-bedroom apartment for a new tenant. This includes deep cleaning, fixing a leaky kitchen faucet, and painting the living room walls."
        </p>
        <textarea
          id="project-description"
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Describe your project in detail..."
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleGeneratePlan}
          disabled={isLoading}
          className="mt-4 w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300"
        >
          {isLoading ? (
            <>
              <Spinner />
              <span className="ml-3">Generating Plan...</span>
            </>
          ) : (
             <>
              <PaperclipIcon className="h-5 w-5 mr-2" />
              Generate Plan
             </>
          )}
        </button>
      </div>

      {plan && (
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Your AI-Generated Plan</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <Markdown content={plan} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AiPlannerPage;

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EmotionAnalysis } from '../types';
import { DemoNotice } from './DemoNotice';
import { SHOW_DEMO_NOTICES } from '../constants';

interface ResultsViewProps {
  analysis: EmotionAnalysis;
  onStartOver: () => void;
  onClose: () => void;
}

export const ResultsView = ({ analysis, onStartOver, onClose }: ResultsViewProps) => {
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  useEffect(() => {
    if (SHOW_DEMO_NOTICES) {
      setTimeout(() => {
        setShowDemoNotice(true);
      }, 500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black max-w-md mx-auto relative overflow-hidden">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(147, 197, 253, 0.3), 0 0 80px rgba(147, 197, 253, 0.15);
          }
          50% {
            box-shadow: 0 0 50px rgba(147, 197, 253, 0.4), 0 0 100px rgba(147, 197, 253, 0.2);
          }
        }
        .glow-orb {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glass-morphism {
          background: rgba(147, 197, 253, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 197, 253, 0.3);
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-300 rounded-full opacity-[0.15] blur-3xl glow-orb" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-blue-300 rounded-full opacity-[0.1] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(147, 197, 253, 0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 pt-16 pb-8">
        <div className="px-6 flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-blue-100 transition-all duration-300 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <h1 className="text-xl font-medium text-gray-600">Your Emotion</h1>
        </div>
      </div>

      <div className="relative z-10 overflow-y-auto overflow-x-hidden px-6 pb-8" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="mb-12 fade-in-up">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-medium">
            Emotion Identified
          </h3>
          <h2 className="text-3xl font-light tracking-tight text-black mb-8">
            {analysis.emotionLabel}
          </h2>
          <p className="text-base leading-relaxed text-gray-700 font-light">
            {analysis.understanding}
          </p>
        </div>

        <div className="mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-medium">
            Steps to Feel Better
          </h3>
          <div className="space-y-4">
            {analysis.actionableSteps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full glass-morphism flex items-center justify-center text-xs font-medium text-gray-600 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-base leading-relaxed text-gray-700 font-light flex-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 mt-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={onStartOver}
            className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide text-black hover:bg-blue-100 transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center justify-between">
              <span>Explore another feeling</span>
              <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>

          <button
            onClick={onClose}
            className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide text-gray-500 hover:text-black hover:bg-blue-50 transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="relative flex items-center justify-between">
              <span>Close</span>
              <ArrowRight size={20} className="opacity-40 group-hover:opacity-60 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>
        </div>

      </div>

      {/* Demo Notice Bottom Sheet */}
      {showDemoNotice && (
        <DemoNotice onClose={() => setShowDemoNotice(false)} />
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
    </div>
  );
};

import { useState, useEffect } from 'react';

interface AnalyzingViewProps {
  onAnalysisComplete: () => void;
}

export const AnalyzingView = ({ onAnalysisComplete }: AnalyzingViewProps) => {
  const [analyzingDots, setAnalyzingDots] = useState('');

  useEffect(() => {
    let dotCount = 0;
    const dotsInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setAnalyzingDots('.'.repeat(dotCount));
    }, 500);

    const analysisTimeout = setTimeout(() => {
      onAnalysisComplete();
    }, 3000);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(analysisTimeout);
    };
  }, [onAnalysisComplete]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center max-w-md mx-auto relative overflow-hidden">
      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.05), 0 0 80px rgba(255, 255, 255, 0.02);
          }
          50% {
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.08), 0 0 100px rgba(255, 255, 255, 0.04);
          }
        }
        .glow-orb {
          animation: glow-pulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute top-20 right-10 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-3xl glow-orb" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />

      <div className="text-center">
        <h2 className="text-[2.75rem] leading-[1.1] font-extralight tracking-tight">
          Analysing{analyzingDots}
        </h2>
      </div>
    </div>
  );
};

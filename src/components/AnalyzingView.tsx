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
    }, 5000);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(analysisTimeout);
    };
  }, [onAnalysisComplete]);

  return (
    <div className="min-h-screen bg-gray-200 text-black flex flex-col items-center justify-center max-w-md mx-auto relative overflow-hidden">
      <style>{`
        @keyframes premium-shimmer {
          0% {
            transform: translateX(-120%) translateY(-120%) rotate(45deg);
            opacity: 0;
          }
          10% {
            opacity: 0.18;
          }
          50% {
            opacity: 0.25;
          }
          90% {
            opacity: 0.15;
          }
          100% {
            transform: translateX(120%) translateY(120%) rotate(45deg);
            opacity: 0;
          }
        }
        .shimmer-main {
          animation: premium-shimmer 4.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          filter: blur(35px);
        }
      `}</style>

      {/* Premium shimmer sweep - wider, slower, more gentle */}
      <div
        className="absolute inset-0 shimmer-main"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(147, 197, 253, 0.25) 35%, rgba(96, 165, 250, 0.35) 50%, rgba(147, 197, 253, 0.25) 65%, transparent 100%)',
          width: '280%',
          height: '280%'
        }}
      />

      {/* Centered Analysing text */}
      <div className="relative z-10 text-center">
        <h2 className="text-[2.5rem] leading-[1.1] font-extralight tracking-tight text-black">
          Analysing{analyzingDots}
        </h2>
      </div>
    </div>
  );
};

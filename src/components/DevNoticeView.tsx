import { ArrowRight, AlertCircle } from 'lucide-react';

interface DevNoticeViewProps {
  onProceed: () => void;
}

export const DevNoticeView = ({ onProceed }: DevNoticeViewProps) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col max-w-md mx-auto relative overflow-hidden">
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
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.05), 0 0 80px rgba(255, 255, 255, 0.02);
          }
          50% {
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.08), 0 0 100px rgba(255, 255, 255, 0.04);
          }
        }
        .glow-orb {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Ambient Orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-3xl glow-orb" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />

      {/* Header */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="px-6 flex items-center gap-4">
          <h1 className="text-xl font-medium">FeelOne</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <div className="fade-in-up text-center max-w-sm">
          <div className="mb-6 flex justify-center">
            <div className="p-4 rounded-full glass-morphism">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-light mb-4 leading-tight">
            This feature is still in development
          </h2>

          <p className="text-zinc-400 text-base mb-8 leading-relaxed">
            Want to see a mock demo?
          </p>

          <button
            onClick={onProceed}
            className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center justify-between">
              <span>Proceed</span>
              <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

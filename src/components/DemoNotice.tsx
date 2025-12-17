import { X, AlertCircle } from 'lucide-react';

interface DemoNoticeProps {
  onClose: () => void;
}

export const DemoNotice = ({ onClose }: DemoNoticeProps) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50" style={{ animation: 'slide-up 0.3s ease-out' }}>
        <div className="bg-zinc-900 rounded-t-3xl border-t border-zinc-800 max-w-md mx-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Demo Notice</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-800 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-300 leading-relaxed mb-3">
                    This is <span className="font-semibold text-white">mock data for demo purposes</span> only.
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    The actual feature will use AI to provide personalized emotional insights based on your unique feelings and experiences.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-white text-black rounded-2xl py-4 font-semibold hover:bg-zinc-100 transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

import { X, AlertCircle } from 'lucide-react';

interface DemoNoticeProps {
  onClose: () => void;
}

export const DemoNotice = ({ onClose }: DemoNoticeProps) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50" style={{ animation: 'slide-up 0.3s ease-out' }}>
        <div className="bg-white rounded-t-3xl border-t border-gray-200 max-w-md mx-auto shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-black">Demo Notice</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
              >
                <X size={18} className="text-black" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    This is <span className="font-semibold text-black">mock data for demo purposes</span> only.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The actual feature will use AI to provide personalized emotional insights based on your unique feelings and experiences.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-blue-400 text-black rounded-2xl py-4 font-semibold hover:bg-blue-500 transition-all"
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

import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface InputViewProps {
  questionText: string;
  onProceed: (input: string) => void;
}

export const InputView = ({ questionText, onProceed }: InputViewProps) => {
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showProceed, setShowProceed] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setDisplayedQuestion('');
    setShowInput(false);
    setShowProceed(false);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= questionText.length) {
        setDisplayedQuestion(questionText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowInput(true);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }, 300);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [questionText]);

  useEffect(() => {
    if (userInput.trim().length > 10) {
      setShowProceed(true);
    } else {
      setShowProceed(false);
    }
  }, [userInput]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [userInput]);

  const handleProceed = () => {
    if (userInput.trim().length > 10) {
      onProceed(userInput);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col max-w-md mx-auto relative overflow-hidden">
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
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .cursor-blink::after {
          content: '';
          display: inline-block;
          width: 3px;
          height: 1em;
          background: black;
          margin-left: 8px;
          animation: blink 1s infinite;
        }
        .glow-orb {
          animation: glow-pulse 4s ease-in-out infinite;
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
        .fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        textarea {
          caret-color: black;
        }
        textarea::placeholder {
          opacity: 0;
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
          <h1 className="text-xl font-medium">FeelOne</h1>
        </div>
      </div>

      <div className="relative z-10 flex-1 px-6 pt-8 pb-4 flex flex-col overflow-y-auto overflow-x-hidden">
        <div className="mb-8">
          <h2 className={`text-[2rem] leading-[1.2] font-extralight tracking-tight ${!showInput ? 'cursor-blink' : ''}`}>
            {displayedQuestion}
          </h2>
        </div>

        {showInput && (
          <div className="fade-in-up pb-4">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full bg-transparent text-lg font-light leading-relaxed focus:outline-none resize-none text-black overflow-hidden"
              style={{ caretColor: 'black', height: 'auto' }}
              rows={1}
              autoFocus
            />
          </div>
        )}
      </div>

      {showProceed && (
        <div className="relative z-10 px-6 pb-20 fade-in-up">
          <button
            onClick={handleProceed}
            className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide text-black hover:bg-blue-100 transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center justify-between">
              <span>Continue</span>
              <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
    </div>
  );
};

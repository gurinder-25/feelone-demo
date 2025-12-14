import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Heart, AlertCircle, X } from 'lucide-react';

// Configuration: Set to true to show demo notices
const SHOW_DEMO_NOTICES = true;

interface EmotionAnalysis {
  emotionLabel: string;
  understanding: string;
  actionableSteps: string[];
}

const generateMockAnalysis = (): EmotionAnalysis => {
  const emotions = [
    {
      emotionLabel: "Overwhelm & Anxiety",
      understanding: "You're experiencing a state of emotional overwhelm, where multiple stressors are converging and creating a sense of being unable to cope. This is your mind's way of signaling that you're carrying too much mental load. What you're feeling is valid and common - it's not a weakness, but rather a sign that you need to pause and recalibrate.",
      actionableSteps: [
        "Practice the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste",
        "Write down everything on your mind for 10 minutes without filtering - this helps externalize the mental clutter",
        "Take 3 deep breaths, inhaling for 4 counts, holding for 4, exhaling for 6 - this activates your parasympathetic nervous system",
        "Identify one small task you can complete in the next 15 minutes to regain a sense of control"
      ]
    },
    {
      emotionLabel: "Deep Sadness",
      understanding: "You're moving through a period of profound sadness, which is one of the most honest and human emotions we can experience. This feeling is telling you that something matters deeply to you. Rather than pushing it away, acknowledging this sadness is an act of self-compassion and emotional courage.",
      actionableSteps: [
        "Allow yourself to feel without judgment - set a timer for 15 minutes to simply be with the emotion",
        "Reach out to one trusted person and share how you're feeling, even if it's just a text saying 'I'm having a hard day'",
        "Engage in gentle movement like a short walk or stretching to help process the emotion physically",
        "Create a comfort routine: warm tea, soft lighting, comforting music - small acts of self-care matter"
      ]
    },
    {
      emotionLabel: "Confusion & Uncertainty",
      understanding: "You're in a space of ambiguity where the path forward isn't clear. This uncertainty can feel destabilizing, but it's also a natural part of growth and transition. Your mind is processing multiple possibilities, and the discomfort you feel is actually your psyche working to find clarity.",
      actionableSteps: [
        "Journal on these prompts: 'What do I know for certain?' and 'What am I afraid of?'",
        "Break down the confusion into smaller, specific questions you can address one at a time",
        "Talk it out loud - sometimes hearing yourself explain the situation brings unexpected clarity",
        "Give yourself permission to not have all the answers right now - clarity often comes with time and patience"
      ]
    },
    {
      emotionLabel: "Quiet Joy",
      understanding: "You're experiencing a gentle, peaceful form of contentment that doesn't need to be loud or dramatic. This is a beautiful state of being present and appreciative of the moment. Sometimes we overlook this quieter form of happiness, but it's one of the most sustainable and nourishing emotional states.",
      actionableSteps: [
        "Take a moment to consciously acknowledge what's bringing you this feeling - name it out loud or write it down",
        "Share your positive state with someone else - joy multiplies when expressed",
        "Capture this moment in your mind as a 'memory bookmark' you can return to during harder times",
        "Consider what contributed to this feeling so you can intentionally create space for it again"
      ]
    },
    {
      emotionLabel: "Restless Energy",
      understanding: "You're experiencing an activation of your nervous system that needs an outlet. This restless energy isn't necessarily negative - it's your body's way of signaling that you have untapped momentum that wants to be channeled. The key is directing this energy constructively rather than letting it spiral into anxiety.",
      actionableSteps: [
        "Move your body vigorously for 10-15 minutes: dancing, jumping jacks, a quick run - anything that matches the energy level",
        "Channel it into a productive burst: tackle that task you've been postponing, clean a space, organize something",
        "If it's late, try progressive muscle relaxation: tense and release each muscle group to discharge the energy",
        "Set a clear intention or goal for the next hour to give the energy a direction"
      ]
    }
  ];

  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  return randomEmotion;
};

type ViewState = 'devNotice' | 'input' | 'analyzing' | 'results';

function App() {
  const [viewState, setViewState] = useState<ViewState>(SHOW_DEMO_NOTICES ? 'devNotice' : 'input');
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showProceed, setShowProceed] = useState(false);
  const [analysis, setAnalysis] = useState<EmotionAnalysis | null>(null);
  const [analyzingDots, setAnalyzingDots] = useState('');
  const [sessionCount, setSessionCount] = useState(0);
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const questionTexts = [
    'Having trouble understanding your feelings?',
    'Want to explore another emotion?',
    'What else are you feeling?',
    'Let\'s understand another feeling together',
  ];

  const questionText = questionTexts[Math.min(sessionCount, questionTexts.length - 1)];

  useEffect(() => {
    if (viewState === 'input') {
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
    }
  }, [viewState, questionText]);

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

  useEffect(() => {
    if (viewState === 'analyzing') {
      let dotCount = 0;
      const dotsInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        setAnalyzingDots('.'.repeat(dotCount));
      }, 500);

      const analysisTimeout = setTimeout(() => {
        const mockAnalysis = generateMockAnalysis();
        setAnalysis(mockAnalysis);
        setViewState('results');

        // Show demo notice after results are displayed (if enabled)
        if (SHOW_DEMO_NOTICES) {
          setTimeout(() => {
            setShowDemoNotice(true);
          }, 500);
        }
      }, 3000);

      return () => {
        clearInterval(dotsInterval);
        clearTimeout(analysisTimeout);
      };
    }
  }, [viewState, userInput]);

  const handleProceed = () => {
    if (userInput.trim().length > 10) {
      setViewState('analyzing');
    }
  };

  const handleProceedFromDevNotice = () => {
    setViewState('input');
  };

  const handleStartOver = () => {
    setViewState('input');
    setUserInput('');
    setAnalysis(null);
    setSessionCount(prev => prev + 1);
    setShowDemoNotice(false);
  };

  const handleClose = () => {
    setViewState('input');
    setUserInput('');
    setAnalysis(null);
    setSessionCount(0);
    setShowDemoNotice(false);
  };

  // Development Notice View
  if (viewState === 'devNotice') {
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
              onClick={handleProceedFromDevNotice}
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
  }

  if (viewState === 'input') {
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
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          .cursor-blink::after {
            content: '';
            display: inline-block;
            width: 3px;
            height: 1em;
            background: white;
            margin-left: 8px;
            animation: blink 1s infinite;
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
          textarea {
            caret-color: white;
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

        <div className="absolute top-20 right-10 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-3xl glow-orb" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
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
                className="w-full bg-transparent text-lg font-light leading-relaxed focus:outline-none resize-none text-white overflow-hidden"
                style={{ caretColor: 'white', height: 'auto' }}
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
              className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative flex items-center justify-between">
                <span>Continue</span>
                <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  if (viewState === 'analyzing') {
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
  }

  if (viewState === 'results' && analysis) {
    return (
      <div className="min-h-screen bg-black text-white max-w-md mx-auto relative overflow-hidden">
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
          .fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
          *::-webkit-scrollbar {
            display: none;
          }
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        <div className="absolute top-20 right-10 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-3xl glow-orb" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />

        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="relative z-10 pt-16 pb-8">
          <div className="px-6 flex items-center gap-4">
            <button
              onClick={handleClose}
              className="p-2 rounded-xl hover:bg-white/5 transition-all duration-300 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-medium text-zinc-400">Your Emotion</h1>
          </div>
        </div>

        <div className="relative z-10 overflow-y-auto overflow-x-hidden px-6 pb-8" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="mb-12 fade-in-up">
            <h3 className="text-sm uppercase tracking-wider text-zinc-500 mb-4 font-medium">
              Emotion Identified
            </h3>
            <h2 className="text-3xl font-light tracking-tight text-white mb-8">
              {analysis.emotionLabel}
            </h2>
            <p className="text-base leading-relaxed text-zinc-300 font-light">
              {analysis.understanding}
            </p>
          </div>

          <div className="mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-sm uppercase tracking-wider text-zinc-500 mb-4 font-medium">
              Steps to Feel Better
            </h3>
            <div className="space-y-4">
              {analysis.actionableSteps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full glass-morphism flex items-center justify-center text-xs font-medium text-zinc-400 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-base leading-relaxed text-zinc-300 font-light flex-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3 mt-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={handleStartOver}
              className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative flex items-center justify-between">
                <span>Explore another feeling</span>
                <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>

            <button
              onClick={handleClose}
              className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide text-zinc-500 hover:text-white hover:bg-white/[0.03] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
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
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setShowDemoNotice(false)}
            />
            <div className="fixed inset-x-0 bottom-0 z-50" style={{ animation: 'slide-up 0.3s ease-out' }}>
              <div className="bg-zinc-900 rounded-t-3xl border-t border-zinc-800 max-w-md mx-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Demo Notice</h3>
                    <button
                      onClick={() => setShowDemoNotice(false)}
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
                    onClick={() => setShowDemoNotice(false)}
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
        )}

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  return null;
}

export default App;

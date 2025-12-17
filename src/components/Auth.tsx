import { useState } from 'react';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';

interface AuthProps {
  onLogin: (user: { username: string; email: string }) => void;
}

export const Auth = ({ onLogin }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Mock login - accept anyone
    const user = {
      username: username || email.split('@')[0],
      email: email || `${username}@feelone.com`,
    };
    onLogin(user);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black flex flex-col items-center justify-center px-6 max-w-md mx-auto relative overflow-hidden">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .fade-in-scale {
          animation: fade-in-scale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glow-orb {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .glass-morphism {
          background: rgba(147, 197, 253, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 197, 253, 0.3);
        }
      `}</style>

      {/* Ambient Background */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-300 rounded-full opacity-[0.15] blur-3xl glow-orb" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-blue-300 rounded-full opacity-[0.1] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(147, 197, 253, 0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="w-full relative z-10 space-y-12 fade-in-scale">
        {/* Logo & Header */}
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-5xl font-medium text-black mb-6">FeelOne</h1>
            <p className="text-gray-600 text-lg tracking-wide font-light">Help you understand your emotions</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {!isLogin && (
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gray-700 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full glass-morphism rounded-[2rem] pl-14 pr-6 py-5 text-black placeholder-gray-500 focus:outline-none focus:bg-blue-100 transition-all duration-300"
              />
            </div>
          )}

          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gray-700 transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              placeholder={isLogin ? "Username or Email" : "Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full glass-morphism rounded-[2rem] pl-14 pr-6 py-5 text-black placeholder-gray-500 focus:outline-none focus:bg-blue-100 transition-all duration-300"
            />
          </div>

          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gray-700 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full glass-morphism rounded-[2rem] pl-14 pr-6 py-5 text-black placeholder-gray-500 focus:outline-none focus:bg-blue-100 transition-all duration-300"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-400 text-black rounded-[2rem] px-6 py-5 font-semibold tracking-wide hover:bg-blue-500 transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center justify-center gap-2">
              <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            className="text-gray-600 text-sm hover:text-black transition-colors duration-300 tracking-wide"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </div>

      {/* Bottom Ambient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
    </div>
  );
};

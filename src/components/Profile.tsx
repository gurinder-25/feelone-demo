import { useState } from 'react';
import { LogOut, User as UserIcon, ArrowLeft } from 'lucide-react';

interface ProfileProps {
  user: { username: string; email: string; name?: string; age?: string; gender?: string };
  onLogout: () => void;
  onBack: () => void;
}

export const Profile = ({ user, onLogout, onBack }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    age: user.age || '',
    gender: user.gender || '',
  });

  const handleSave = () => {
    // Mock save - just close editing mode
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black px-6 py-6 pb-24 max-w-md mx-auto relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-300 rounded-full opacity-[0.15] blur-3xl" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-blue-300 rounded-full opacity-[0.1] blur-3xl" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(147, 197, 253, 0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-blue-100 transition-all duration-300 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-gray-600 text-sm">Manage your account</p>
          </div>
        </div>

        {/* User Avatar and Info */}
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center border-2 border-blue-300">
            <UserIcon size={40} className="text-gray-700" />
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">{user.username}</div>
            <div className="text-gray-600 text-sm">{user.email}</div>
          </div>
        </div>

        {/* Personal Details Card */}
        <div className="bg-white/50 backdrop-blur-lg rounded-3xl border border-blue-200 overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Personal Details</h2>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="text-sm text-black font-medium hover:text-blue-600 transition-colors"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm mb-2 block">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Enter your name"
                  className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-black placeholder-gray-400 disabled:opacity-60 focus:outline-none focus:border-blue-300 focus:bg-blue-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 text-sm mb-2 block">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Age"
                    className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-black placeholder-gray-400 disabled:opacity-60 focus:outline-none focus:border-blue-300 focus:bg-blue-50"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm mb-2 block">Gender</label>
                  <input
                    type="text"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Gender"
                    className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-black placeholder-gray-400 disabled:opacity-60 focus:outline-none focus:border-blue-300 focus:bg-blue-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-sm mb-2 block">Username</label>
                <div className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-black opacity-60">
                  {user.username}
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-sm mb-2 block">Email</label>
                <div className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-black opacity-60">
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="space-y-3">
          <button
            onClick={onLogout}
            className="w-full bg-red-100 border border-red-200 rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-red-200 transition-all text-red-600"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              <span className="font-medium">Log Out</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

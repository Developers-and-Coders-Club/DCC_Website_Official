'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Code,
  Settings,
  User as UserIcon,
  Github,
  LogOut,
  Camera,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?returnUrl=/dashboard');
    } else if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        const response = await fetch('/api/user/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64String }),
        });
        
        const data = await response.json();
        if (data.success) {
          setUserData((prev: any) => ({ ...prev, profilePhoto: data.profilePhoto }));
        } else {
          alert('Failed to update profile photo');
        }
      } catch (error) {
        console.error('Error updating photo:', error);
        alert('Error updating photo');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-dark-card border-r border-white/10 min-h-screen sticky top-0 hidden md:block">
          <div className="p-6">
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <Code className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">DCC</span>
            </Link>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'overview' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </nav>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 pt-24 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {userData.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-400">Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/20">
                  {userData.profilePhoto ? (
                    <img src={userData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Profile Card */}
              <div className="card-glass p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Code className="w-64 h-64" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Photo Upload */}
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 bg-dark-bg flex items-center justify-center">
                      {userData.profilePhoto ? (
                        <img src={userData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-primary p-2 rounded-full hover:bg-primary-light transition-colors shadow-lg"
                      disabled={uploading}
                    >
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Camera className="w-4 h-4 text-white" />}
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl font-bold mb-2">{userData.name}</h2>
                    <p className="text-gray-400 mb-4">{userData.email}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-white/5 rounded-lg p-3 text-center md:text-left">
                        <div className="text-xs text-gray-400 text-transform uppercase tracking-wider">Roll Number</div>
                        <div className="font-semibold">{userData.rollNumber || 'Not Set'}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center md:text-left">
                        <div className="text-xs text-gray-400 text-transform uppercase tracking-wider">Branch</div>
                        <div className="font-semibold">{userData.branch || 'Not Set'}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center md:text-left">
                        <div className="text-xs text-gray-400 text-transform uppercase tracking-wider">Year</div>
                        <div className="font-semibold">{userData.year ? `${userData.year} Year` : 'Not Set'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Programs Status */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Programs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 21 Days Tracking */}
                  <div className="card-glass p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Code className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold">21 Days Challenge</h3>
                          <p className="text-xs text-gray-400">Programming Team</p>
                        </div>
                      </div>
                      <span className={`badge ${userData.linkedAccounts?.codeforces?.verified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {userData.linkedAccounts?.codeforces?.verified ? 'Active' : 'Not Registered'}
                      </span>
                    </div>

                    {userData.linkedAccounts?.codeforces?.verified ? (
                      <div>
                         <div className="flex items-center justify-between mb-2 text-sm">
                           <span className="text-gray-400">Status</span>
                           <span className="text-green-400 flex items-center gap-1">
                             <CheckCircle className="w-3 h-3" /> Registered
                           </span>
                         </div>
                         <div className="mt-4 p-3 bg-white/5 rounded-lg flex justify-between items-center">
                           <span className="text-sm">CF Handle: <span className="text-white font-mono ml-1">{userData.linkedAccounts.codeforces.handle}</span></span>
                           <Link href="/teams/programming/leaderboard" className="text-primary text-sm hover:underline">
                             Leaderboard →
                           </Link>
                         </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                         <p className="text-gray-400 text-sm mb-4">Join the challenge to master competitive programming.</p>
                         <Link href="/register/21-days-coding" className="btn-primary w-full block text-center">
                           Register Now
                         </Link>
                      </div>
                    )}
                  </div>

                  {/* SANGAAM Tracking */}
                  <div className="card-glass p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                          <Github className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-bold">SANGAAM 2026</h3>
                          <p className="text-xs text-gray-400">Development Team</p>
                        </div>
                      </div>
                      <span className={`badge ${userData.linkedAccounts?.github?.verified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {userData.linkedAccounts?.github?.verified ? 'Active' : 'Not Registered'}
                      </span>
                    </div>

                    {userData.linkedAccounts?.github?.verified ? (
                      <div>
                         <div className="flex items-center justify-between mb-2 text-sm">
                           <span className="text-gray-400">Status</span>
                           <span className="text-green-400 flex items-center gap-1">
                             <CheckCircle className="w-3 h-3" /> Registered
                           </span>
                         </div>
                         <div className="mt-4 p-3 bg-white/5 rounded-lg flex justify-between items-center">
                           <span className="text-sm">GitHub: <span className="text-white font-mono ml-1">@{userData.linkedAccounts.github.username}</span></span>
                           <Link href="/teams/development/leaderboard" className="text-secondary text-sm hover:underline">
                             Leaderboard →
                           </Link>
                         </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                         <p className="text-gray-400 text-sm mb-4">Contribute to open source and level up your dev skills.</p>
                         <Link href="/register/sangaam" className="btn-secondary w-full block text-center">
                           Register Now
                         </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

              {/* Profile Settings */}
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input type="text" value={userData.name} className="input" disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input type="email" value={userData.email} className="input" disabled />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Roll Number</label>
                      <input type="text" value={userData.rollNumber || ''} className="input" disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Branch</label>
                      <input 
                        type="text" 
                        value={userData.year ? `${userData.year}${['st', 'nd', 'rd', 'th'][userData.year - 1] || 'th'} Year - ${userData.branch || ''}` : ''} 
                        className="input" 
                        disabled 
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    * To update profile details, please contact admin.
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

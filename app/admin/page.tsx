'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Code,
  Trophy,
  GraduationCap,
  FileText,
  Settings,
  LogOut,
  BarChart3,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin?returnUrl=/admin');
    return null;
  }

  // TODO: Add proper admin role check
  // if (session?.user?.role !== 'admin') {
  //   router.push('/');
  //   return null;
  // }

  // Mock stats - replace with real data from API
  const stats = {
    totalUsers: 450,
    activePrograms: 2,
    upcomingEvents: 5,
    totalProjects: 12,
    totalAlumni: 200,
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-dark-card border-r border-white/10 min-h-screen sticky top-0">
          <div className="p-6">
            <Link href="/admin" className="flex items-center space-x-2 mb-8">
              <Code className="w-8 h-8 text-primary" />
              <div>
                <div className="text-xl font-bold">DCC Admin</div>
                <div className="text-xs text-gray-400">Control Panel</div>
              </div>
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
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'users' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Users</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'events' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span>Events</span>
              </button>

              <button
                onClick={() => setActiveTab('programs')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'programs' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span>Programs</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'projects' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <Code className="w-5 h-5" />
                <span>Projects</span>
              </button>

              <button
                onClick={() => setActiveTab('alumni')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'alumni' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Alumni</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'analytics' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
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
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your DCC website content and users</p>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-primary" />
                    <span className="text-sm text-gray-400">Total</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.totalUsers}</div>
                  <div className="text-sm text-gray-400">Registered Users</div>
                </div>

                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy className="w-8 h-8 text-secondary" />
                    <span className="text-sm text-gray-400">Active</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.activePrograms}</div>
                  <div className="text-sm text-gray-400">Programs Running</div>
                </div>

                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-8 h-8 text-green-400" />
                    <span className="text-sm text-gray-400">Upcoming</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.upcomingEvents}</div>
                  <div className="text-sm text-gray-400">Events Scheduled</div>
                </div>

                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <GraduationCap className="w-8 h-8 text-yellow-400" />
                    <span className="text-sm text-gray-400">Total</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.totalAlumni}</div>
                  <div className="text-sm text-gray-400">Alumni Placed</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-glass p-6">
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="btn-primary text-left p-4">
                    <Calendar className="w-6 h-6 mb-2" />
                    <div className="font-semibold">Create Event</div>
                    <div className="text-xs opacity-80">Add a new event</div>
                  </button>
                  <button className="btn-secondary text-left p-4">
                    <Code className="w-6 h-6 mb-2" />
                    <div className="font-semibold">Add Project</div>
                    <div className="text-xs opacity-80">Showcase new project</div>
                  </button>
                  <button className="btn-outline text-left p-4">
                    <GraduationCap className="w-6 h-6 mb-2" />
                    <div className="font-semibold">Add Alumni</div>
                    <div className="text-xs opacity-80">Add alumni profile</div>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card-glass p-6">
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 pb-4 border-b border-white/5">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">New user registration: Rahul Kumar</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 pb-4 border-b border-white/5">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Event registered: Web Development Workshop</p>
                      <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Leaderboard updated: 21 Days Challenge</p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs - Placeholder */}
          {activeTab !== 'overview' && (
            <div className="card-glass p-8 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
              <p className="text-gray-400 mb-6">
                This section is under development. Full CRUD operations coming soon!
              </p>
              <p className="text-sm text-gray-500">
                For now, manage content directly in MongoDB or use the API routes.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

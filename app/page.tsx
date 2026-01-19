'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ParticleBackground from '@/components/ParticleBackground';
import { ArrowRight, Code, Calendar, Github, CheckCircle, Loader2 } from 'lucide-react';

export default function HomePage() {
  const { status: sessionStatus } = useSession();
  const [registrationStatus, setRegistrationStatus] = useState({
    hasCodeforces: false,
    hasGithub: false,
    checked: false
  });

  useEffect(() => {
    const checkRegistration = async () => {
      if (sessionStatus === 'authenticated') {
        try {
          const response = await fetch('/api/user/registration-status');
          const data = await response.json();
          if (data.success) {
            setRegistrationStatus({
              hasCodeforces: data.data.hasCodeforces,
              hasGithub: data.data.hasGithub,
              checked: true
            });
          }
        } catch (error) {
          console.error('Error checking registration status:', error);
          setRegistrationStatus(prev => ({ ...prev, checked: true }));
        }
      } else {
        setRegistrationStatus(prev => ({ ...prev, checked: true }));
      }
    };

    checkRegistration();
  }, [sessionStatus]);

  return (
    <div className="relative">
      {/* Hero Section - Cyberpunk Terminal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ParticleBackground />
        
        <div className="container-custom relative z-10 w-full max-w-5xl">
          <div className="glass-dark rounded-lg overflow-hidden border border-dark-border shadow-term animate-fade-in">
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-dark-border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono">user@dccnita:~/main</div>
              <div className="w-16"></div> {/* Spacer for centering */}
            </div>

            {/* Terminal Content */}
            <div className="p-6 md:p-10 font-mono text-left bg-black/90 min-h-[400px]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-green-500">user@dccnita:~$</span>
                  <span className="text-white typing-effect">./init_dcc_protocol.sh</span>
                </div>
                
                <div className="space-y-1 text-gray-400 text-sm md:text-base">
                  <p>&gt; Initializing core systems...</p>
                  <p>&gt; Loading module: <span className="text-blue-400">Competitive_Programming</span>... <span className="text-green-500">[OK]</span></p>
                  <p>&gt; Loading module: <span className="text-cyan-400">Web_Development</span>... <span className="text-green-500">[OK]</span></p>
                  <p>&gt; Loading module: <span className="text-purple-400">Machine_Learning</span>... <span className="text-green-500">[OK]</span></p>
                  <p>&gt; Establishing connection to NIT Agartala server... <span className="text-green-500">CONNECTED</span></p>
                </div>

                <div className="py-6">
                  <h1 className="text-4xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                    Developers & Coders Club
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300">
                    <span className="text-green-500">&gt;</span> Learn. Build. Compete.
                  </p>
                </div>

                <div className="border-t border-gray-800 pt-6 mt-6">
                  <p className="text-gray-400 mb-4">Execute command:</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/teams" className="btn-primary group">
                      <span className="mr-2">./join_programs.sh</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/events" className="btn-outline group">
                      <span className="mr-2">./view_events.sh</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Programs Section */}
      <section className="section relative">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="section-title">
              <span className="text-green-500 mr-2">&gt;</span>
              Active_Programs
            </h2>
            <p className="section-subtitle font-mono text-sm">
              // Execute these programs to upgrade your skill tree
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 21 Days Coding Challenge */}
            <div className="card-glass hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <span className="badge-primary">Programming Team</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                21 Days Coding Challenge
              </h3>
              
              <p className="text-gray-400 mb-6">
                Master competitive programming with daily problem-solving challenges. Track your progress on our live leaderboard and compete with peers.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Current Batch:</span>
                  <span className="font-semibold">Edition 5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Days Remaining:</span>
                  <span className="font-semibold text-primary">12 Days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Participants:</span>
                  <span className="font-semibold">150+</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/teams/programming/leaderboard" className="btn-primary flex-1 text-center">
                  View Leaderboard
                </Link>
                
                {!registrationStatus.checked ? (
                  <button className="btn-outline flex-1 text-center" disabled>
                    <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </button>
                ) : registrationStatus.hasCodeforces ? (
                  <div className="btn-success flex-1 text-center flex items-center justify-center space-x-2 bg-green-500/20 border border-green-500/50 text-green-400 cursor-default">
                    <CheckCircle className="w-4 h-4" />
                    <span>Registered</span>
                  </div>
                ) : (
                  <Link href="/register/21-days-coding" className="btn-outline flex-1 text-center">
                    Register Now
                  </Link>
                )}
              </div>
            </div>

            {/* SANGAAM */}
            <div className="card-glass hover:border-secondary/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Github className="w-6 h-6 text-secondary" />
                </div>
                <span className="badge-secondary">Development Team</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-secondary transition-colors">
                SANGAAM - Open Source Drive
              </h3>
              
              <p className="text-gray-400 mb-6">
                Contribute to real-world open-source projects, earn points for merged PRs, and climb the leaderboard while learning industry-standard development practices.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Current Edition:</span>
                  <span className="font-semibold">SANGAAM 2026</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Time Remaining:</span>
                  <span className="font-semibold text-secondary">25 Days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Contributors:</span>
                  <span className="font-semibold">80+</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/teams/development/leaderboard" className="btn-secondary flex-1 text-center">
                  View Leaderboard
                </Link>
                
                {!registrationStatus.checked ? (
                  <button className="btn-outline flex-1 text-center" disabled>
                    <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </button>
                ) : registrationStatus.hasGithub ? (
                  <div className="btn-success flex-1 text-center flex items-center justify-center space-x-2 bg-green-500/20 border border-green-500/50 text-green-400 cursor-default">
                    <CheckCircle className="w-4 h-4" />
                    <span>Registered</span>
                  </div>
                ) : (
                  <Link href="/register/sangaam" className="btn-outline flex-1 text-center">
                    Register Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">Don&apos;t miss out on our exciting events</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <EventCard
              title="Web Development Workshop"
              date="Feb 25, 2026"
              type="Workshop"
              team="Development"
              registrations="45/100"
            />
            <EventCard
              title="Coding Contest"
              date="Mar 5, 2026"
              type="Contest"
              team="Programming"
              registrations="120/150"
            />
            <EventCard
              title="Tech Talk: AI/ML"
              date="Mar 15, 2026"
              type="Talk"
              team="Both"
              registrations="80/200"
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/events" className="btn-primary">
              View All Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Component: EventCard
function EventCard({
  title,
  date,
  type,
  team,
  registrations,
}: {
  title: string;
  date: string;
  type: string;
  team: string;
  registrations: string;
}) {
  return (
    <div className="card-glass hover:border-primary/50 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <span className="badge-primary">{type}</span>
        <span className="text-sm text-gray-400">{team}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-400 mb-4 font-mono text-sm">
        <Calendar className="inline-block w-4 h-4 mr-2" />
        {date}
      </p>
      <div className="flex items-center justify-between mb-4 font-mono text-sm">
        <span className="text-gray-500">Registrations:</span>
        <span className="text-neon">{registrations}</span>
      </div>
      <Link href="/events" className="btn-primary w-full text-center text-sm">
        [ REGISTER_NOW ]
      </Link>
    </div>
  );
}

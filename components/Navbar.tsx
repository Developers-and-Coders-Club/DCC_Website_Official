'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [teamsDropdown, setTeamsDropdown] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-sticky">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform">
              <Image 
                src="/assets/logo.png" 
                alt="DCC Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-bold gradient-text">Developers & Coders Club</div>
              <div className="text-xs text-gray-400">NIT Agartala</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`hover:text-[#00ff41] transition-colors ${isActive('/') ? 'text-[#00ff41]' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`hover:text-[#00ff41] transition-colors ${isActive('/about') ? 'text-[#00ff41]' : ''}`}
            >
              About
            </Link>
            <Link
              href="/family"
              className={`hover:text-[#00ff41] transition-colors ${isActive('/family') ? 'text-[#00ff41]' : ''}`}
            >
              Family
            </Link>
            
            {/* Teams Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-[#00ff41] transition-colors">
                <span>Teams</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#0a0a0a]/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <Link
                  href="/teams/programming"
                  className="block px-4 py-3 hover:bg-white/10 rounded-t-lg transition-colors"
                >
                  <div className="font-semibold text-[#00ff41]">Programming Team</div>
                  <div className="text-xs text-gray-400">Competitive Programming & DSA</div>
                </Link>
                <Link
                  href="/teams/development"
                  className="block px-4 py-3 hover:bg-white/10 rounded-b-lg transition-colors"
                >
                  <div className="font-semibold text-[#00ff41]">Development Team</div>
                  <div className="text-xs text-gray-400">Web, App & Open Source</div>
                </Link>
                <Link
                  href="/teams/ml"
                  className="block px-4 py-3 hover:bg-white/10 transition-colors"
                >
                  <div className="font-semibold text-purple-400">Machine Learning Team</div>
                  <div className="text-xs text-gray-400">AI, Data Science & Research</div>
                </Link>
                <Link
                  href="/teams/pr"
                  className="block px-4 py-3 hover:bg-white/10 transition-colors"
                >
                  <div className="font-semibold text-orange-400">PR & Management</div>
                  <div className="text-xs text-gray-400">Outreach, Events & Sponsors</div>
                </Link>
                <Link
                  href="/teams/design"
                  className="block px-4 py-3 hover:bg-white/10 rounded-b-lg transition-colors"
                >
                  <div className="font-semibold text-pink-400">Design Team</div>
                  <div className="text-xs text-gray-400">Graphics, UI/UX & Branding</div>
                </Link>
              </div>
            </div>

            <Link
              href="/events"
              className={`hover:text-[#00ff41] transition-colors ${isActive('/events') ? 'text-[#00ff41]' : ''}`}
            >
              Events
            </Link>

            <Link
              href="/alumni"
              className={`hover:text-[#00ff41] transition-colors ${isActive('/alumni') ? 'text-[#00ff41]' : ''}`}
            >
              Alumni
            </Link>
            <Link
              href="/resources"
              className={`hover:text-[#00ff41] transition-colors ${isActive('/resources') ? 'text-[#00ff41]' : ''}`}
            >
              Resources
            </Link>

          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="spinner"></div>
            ) : session ? (
              // User Menu
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-[#00ff41] transition-colors whitespace-nowrap focus:outline-none">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{session.user?.name || 'User'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#0a0a0a]/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 hover:bg-white/10 rounded-t-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-b-lg transition-colors flex items-center space-x-2 text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              // Auth Buttons
              <>
                <Link href="/auth/signin" className="btn-ghost">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-[#00ff41] transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-[#00ff41] transition-colors">
                About
              </Link>
              <Link href="/family" className="hover:text-[#00ff41] transition-colors">
                Family
              </Link>
              
              {/* Mobile Teams Dropdown */}
              <div>
                <button
                  onClick={() => setTeamsDropdown(!teamsDropdown)}
                  className="flex items-center justify-between w-full hover:text-[#00ff41] transition-colors"
                >
                  <span>Teams</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${teamsDropdown ? 'rotate-180' : ''}`} />
                </button>
                {teamsDropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/teams/programming" className="block text-sm text-gray-300 hover:text-[#00ff41]">
                      Programming Team
                    </Link>
                    <Link href="/teams/development" className="block text-sm text-gray-300 hover:text-[#00ff41]">
                      Development Team
                    </Link>
                    <Link href="/teams#ml" className="block text-sm text-gray-300 hover:text-[#00ff41]">
                      Machine Learning Team
                    </Link>
                    <Link href="/teams#pr" className="block text-sm text-gray-300 hover:text-[#00ff41]">
                      PR & Management Team
                    </Link>
                    <Link href="/teams#design" className="block text-sm text-gray-300 hover:text-[#00ff41]">
                      Design Team
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/events" className="hover:text-[#00ff41] transition-colors">
                Events
              </Link>

              <Link href="/alumni" className="hover:text-[#00ff41] transition-colors">
                Alumni
              </Link>
              <Link href="/resources" className="hover:text-[#00ff41] transition-colors">
                Resources
              </Link>


              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                {status === 'loading' ? (
                  <div className="flex justify-center">
                    <div className="spinner"></div>
                  </div>
                ) : session ? (
                  <>
                    <div className="px-4 py-2 bg-white/5 rounded-lg">
                      <div className="text-sm text-gray-400">Signed in as</div>
                      <div className="font-medium">{session.user?.name || 'User'}</div>
                    </div>
                    <Link href="/dashboard" className="block btn-ghost w-full text-center">
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="block btn-outline w-full text-center text-red-400 border-red-400 hover:bg-red-400"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin" className="block btn-ghost w-full text-center">
                      Sign In
                    </Link>
                    <Link href="/auth/signup" className="block btn-primary w-full text-center">
                      Join Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

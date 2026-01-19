'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Code, Trophy, Users, ExternalLink, BookOpen, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

export default function ProgrammingTeamPage() {
  const { status: sessionStatus } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRegistration = async () => {
      if (sessionStatus === 'authenticated') {
        try {
          const response = await fetch('/api/user/registration-status');
          const data = await response.json();
          if (data.success && data.data.hasCodeforces) {
            setIsRegistered(true);
          }
        } catch (error) {
          console.error('Error checking registration status:', error);
        }
      }
      setIsLoading(false);
    };

    checkRegistration();
  }, [sessionStatus]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section pt-32 relative">
        <div className="container-custom text-center">
          <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Code className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Programming Team</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Master Competitive Programming & Data Structures
          </p>
        </div>
      </section>

      {/* Team Description */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-title">About the Team</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The Programming Team focuses on competitive programming, algorithmic problem-solving, and data structures. 
              We help students excel in coding contests on platforms like Codeforces, CodeChef, and LeetCode, 
              and prepare for technical interviews at top companies.
            </p>
          </div>

          {/* Team Leads & Core Members */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Team Leads & Core Members</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TeamMemberCard
                name="Rahul Kumar"
                role="Team Lead"
                year="4th Year"
                cfHandle="rahul_codes"
                maxRating="Expert (1650)"
                github="rahulkumar"
              />
              <TeamMemberCard
                name="Priya Sharma"
                role="Core Member"
                year="3rd Year"
                cfHandle="priya_cp"
                maxRating="Specialist (1450)"
                github="priyasharma"
              />
              <TeamMemberCard
                name="Amit Verma"
                role="Core Member"
                year="3rd Year"
                cfHandle="amit_algo"
                maxRating="Specialist (1420)"
                github="amitverma"
              />
              <TeamMemberCard
                name="Sneha Patel"
                role="Core Member"
                year="2nd Year"
                cfHandle="sneha_cp"
                maxRating="Pupil (1280)"
                github="snehapatel"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 21 Days Coding Challenge */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">21 Days Coding Challenge</h2>
              <p className="section-subtitle">Our flagship competitive programming program</p>
            </div>

            {/* Program Info Card */}
            <div className="card-glass p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Current Batch Details</h3>
                  <div className="space-y-3">
                    <InfoRow label="Edition" value="Batch 5 - 2026" />
                    <InfoRow label="Start Date" value="January 10, 2026" />
                    <InfoRow label="End Date" value="January 31, 2026" />
                    <InfoRow label="Days Remaining" value="12 Days" highlight />
                    <InfoRow label="Participants" value="150+ Students" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Program Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-gray-300">Daily curated problems from Codeforces</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-gray-300">Live leaderboard with real-time rankings</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-gray-300">Certificate of completion</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-gray-300">Mentorship from senior members</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* About the Challenge */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-2xl font-bold mb-4">About the Challenge</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The 21 Days Coding Challenge is designed to help you build consistency in competitive programming. 
                  Every day, we provide carefully selected problems that cover various topics in data structures and algorithms. 
                  Solve problems, track your progress on our live leaderboard, and compete with your peers!
                </p>
                <p className="text-gray-300 leading-relaxed">
                  All problems are hosted on Codeforces Gym (Contest ID: 664790). You&apos;ll need a Codeforces account to participate.
                </p>
              </div>

              {/* Rules and Guidelines */}
              <div className="border-t border-white/10 pt-8 mt-8">
                <h3 className="text-2xl font-bold mb-4">Rules & Guidelines</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">1.</span>
                    <span>Register with your Codeforces handle and verify ownership</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">2.</span>
                    <span>Solve problems on Codeforces Gym (Contest 664790)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">3.</span>
                    <span>Your submissions will be automatically tracked on the leaderboard</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">4.</span>
                    <span>Solve at least 15 problems to be eligible for the certificate</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">5.</span>
                    <span>Top 10 participants will receive special recognition</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/teams/programming/leaderboard" className="btn-primary flex-1 text-center">
                  <Trophy className="inline-block w-5 h-5 mr-2" />
                  View Leaderboard
                </Link>
                
                {isLoading ? (
                  <button className="btn-outline flex-1 text-center" disabled>
                    <Loader2 className="inline-block w-5 h-5 mr-2 animate-spin" />
                    Checking Status...
                  </button>
                ) : isRegistered ? (
                  <div className="btn-success flex-1 text-center flex items-center justify-center space-x-2 bg-green-500/20 border border-green-500/50 text-green-400 cursor-default">
                    <CheckCircle className="w-5 h-5" />
                    <span>Registered</span>
                  </div>
                ) : (
                  <Link href="/register/21-days-coding" className="btn-outline flex-1 text-center">
                    <Users className="inline-block w-5 h-5 mr-2" />
                    Register Now
                  </Link>
                )}
              </div>
            </div>

            {/* Past Editions */}
            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold mb-6">Past Editions</h3>
              <div className="space-y-4">
                <PastEditionCard
                  edition="Batch 4 - Dec 2025"
                  participants="120 students"
                  topSolver="Rahul Kumar (18/21 problems)"
                />
                <PastEditionCard
                  edition="Batch 3 - Oct 2025"
                  participants="100 students"
                  topSolver="Priya Sharma (19/21 problems)"
                />
                <PastEditionCard
                  edition="Batch 2 - Aug 2025"
                  participants="85 students"
                  topSolver="Amit Verma (17/21 problems)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center">Learning Resources</h2>
            <p className="section-subtitle text-center">Curated resources to help you excel</p>

            <div className="grid md:grid-cols-2 gap-8">
              <ResourceCard
                title="Competitive Programming Roadmap"
                description="Step-by-step guide from beginner to advanced level"
                link="/resources#roadmap"
              />
              <ResourceCard
                title="Practice Sheets"
                description="Topic-wise problem collections from Codeforces and LeetCode"
                link="/resources#practice"
              />
              <ResourceCard
                title="Tutorial Links"
                description="Best tutorials for algorithms and data structures"
                link="/resources#tutorials"
              />
              <ResourceCard
                title="Problem Categories"
                description="Problems organized by topics and difficulty"
                link="/resources#categories"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-primary">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your CP Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the Programming Team and become a competitive programming expert!
          </p>
          
          {isLoading ? (
            <button className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3 rounded-lg opacity-70 cursor-not-allowed">
              Loading...
            </button>
          ) : isRegistered ? (
             <div className="inline-flex items-center space-x-2 bg-white text-green-600 text-lg px-8 py-3 rounded-lg font-bold shadow-lg">
              <CheckCircle className="w-6 h-6" />
              <span>You are Registered!</span>
            </div>
          ) : (
            <Link href="/register/21-days-coding" className="btn bg-white text-primary hover:bg-gray-100 text-lg">
              Register for 21 Days Challenge
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

function TeamMemberCard({
  name,
  role,
  year,
  cfHandle,
  maxRating,
  github,
}: {
  name: string;
  role: string;
  year: string;
  cfHandle: string;
  maxRating: string;
  github: string;
}) {
  return (
    <div className="card-glass p-6 text-center hover:border-primary/50 transition-all">
      <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-primary font-semibold mb-1">{role}</p>
      <p className="text-xs text-gray-400 mb-4">{year}</p>
      
      <div className="space-y-2 text-sm">
        <a
          href={`https://codeforces.com/profile/${cfHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 text-gray-300 hover:text-primary transition-colors"
        >
          <Code className="w-4 h-4" />
          <span>{cfHandle}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
        <div className="text-xs text-gray-400">Max: {maxRating}</div>
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 text-gray-300 hover:text-primary transition-colors"
        >
          <span>@{github}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}:</span>
      <span className={`font-semibold ${highlight ? 'text-primary' : ''}`}>{value}</span>
    </div>
  );
}

function PastEditionCard({ edition, participants, topSolver }: { edition: string; participants: string; topSolver: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="font-semibold">{edition}</div>
          <div className="text-sm text-gray-400">{participants}</div>
        </div>
        <div className="text-sm">
          <span className="text-gray-400">Top Solver: </span>
          <span className="text-primary font-semibold">{topSolver}</span>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link href={link} className="card-glass hover:border-primary/50 transition-all group p-4 block h-full">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    </Link>
  );
}

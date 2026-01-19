'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Github, Users, ExternalLink, BookOpen, ArrowRight, GitPullRequest, CheckCircle, Loader2 } from 'lucide-react';

export default function DevelopmentTeamPage() {
  const { status: sessionStatus } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRegistration = async () => {
      if (sessionStatus === 'authenticated') {
        try {
          const response = await fetch('/api/user/registration-status');
          const data = await response.json();
          if (data.success && data.data.hasGithub) {
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
            <Github className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Development Team</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Build. Contribute. Innovate.
          </p>
        </div>
      </section>

      {/* Team Description */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-title">About the Team</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The Development Team focuses on web and app development, open-source contributions, and building real-world projects. 
              We work with modern technologies like React, Next.js, Node.js, and React Native, 
              helping students gain industry-relevant skills and contribute to meaningful projects.
            </p>
          </div>

          {/* Team Leads & Core Members */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Team Leads & Core Members</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TeamMemberCard
                name="Arjun Singh"
                role="Team Lead"
                year="4th Year"
                github="arjunsingh"
                linkedin="arjun-singh"
                projects="Campus Connect, DCC Website"
              />
              <TeamMemberCard
                name="Neha Gupta"
                role="Core Member"
                year="3rd Year"
                github="nehagupta"
                linkedin="neha-gupta"
                projects="Alumni Portal, Code Judge"
              />
              <TeamMemberCard
                name="Karan Mehta"
                role="Core Member"
                year="3rd Year"
                github="karanmehta"
                linkedin="karan-mehta"
                projects="Event Manager, Blog Platform"
              />
              <TeamMemberCard
                name="Riya Das"
                role="Core Member"
                year="2nd Year"
                github="riyadass"
                linkedin="riya-das"
                projects="Resource Hub, Task Tracker"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SANGAAM Program */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">SANGAAM - Open Source Contribution Drive</h2>
              <p className="section-subtitle">Learn industry practices through real-world contributions</p>
            </div>

            {/* Program Info Card */}
            <div className="card-glass p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Current Edition Details</h3>
                  <div className="space-y-3">
                    <InfoRow label="Edition" value="SANGAAM 2026" />
                    <InfoRow label="Start Date" value="January 5, 2026" />
                    <InfoRow label="End Date" value="February 15, 2026" />
                    <InfoRow label="Time Remaining" value="25 Days" highlight />
                    <InfoRow label="Contributors" value="80+ Students" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Program Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                      <span className="text-gray-300">Contribute to curated open-source repositories</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                      <span className="text-gray-300">Mentorship from experienced developers</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                      <span className="text-gray-300">Live leaderboard tracking merged PRs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                      <span className="text-gray-300">Certificate of participation</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* About SANGAAM */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-2xl font-bold mb-4">About SANGAAM</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  SANGAAM (Sanskrit for "confluence") is our open-source contribution initiative where students learn 
                  industry-standard development practices by contributing to real-world projects. This edition focuses on 
                  the Academic Planner & Deadline Tracker project.
                </p>
                <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Github className="w-5 h-5 text-secondary" />
                    <span className="font-semibold">Repository:</span>
                  </div>
                  <a
                    href="https://github.com/darshan2006-op/academic-planner-deadline-tracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-secondary-light flex items-center space-x-2"
                  >
                    <span>darshan2006-op/academic-planner-deadline-tracker</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Contribution Guidelines */}
              <div className="border-t border-white/10 pt-8 mt-8">
                <h3 className="text-2xl font-bold mb-4">How to Contribute</h3>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-secondary font-bold flex-shrink-0">1.</span>
                    <span>Register with your GitHub account and verify ownership</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-secondary font-bold flex-shrink-0">2.</span>
                    <span>Fork the repository and clone it to your local machine</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-secondary font-bold flex-shrink-0">3.</span>
                    <span>Pick an issue from the "good first issue" or "SANGAAM" labels</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-secondary font-bold flex-shrink-0">4.</span>
                    <span>Create a branch, make your changes, and submit a pull request</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-secondary font-bold flex-shrink-0">5.</span>
                    <span>Your merged PRs will automatically appear on the leaderboard</span>
                  </li>
                </ol>
              </div>

              {/* Scoring System */}
              <div className="border-t border-white/10 pt-8 mt-8">
                <h3 className="text-2xl font-bold mb-4">Scoring System</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-secondary font-bold mb-2">Points Calculation</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Merged PR: 10 points</li>
                      <li>• Lines added: +1 point per 100 lines</li>
                      <li>• Quality bonus: Up to 5 points</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-secondary font-bold mb-2">Recognition</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Top 3: Special certificates</li>
                      <li>• 5+ merged PRs: Contributor badge</li>
                      <li>• 10+ merged PRs: Core contributor badge</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/teams/development/leaderboard" className="btn-secondary flex-1 text-center">
                  <GitPullRequest className="inline-block w-5 h-5 mr-2" />
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
                  <Link href="/register/sangaam" className="btn-outline flex-1 text-center">
                    <Users className="inline-block w-5 h-5 mr-2" />
                    Register Now
                  </Link>
                )}

                <a
                  href="https://github.com/darshan2006-op/academic-planner-deadline-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1 text-center"
                >
                  <Github className="inline-block w-5 h-5 mr-2" />
                  View Repository
                </a>
              </div>
            </div>

            {/* Past Editions */}
            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold mb-6">Past Editions</h3>
              <div className="space-y-4">
                <PastEditionCard
                  edition="SANGAAM 2025"
                  contributors="65 students"
                  topContributor="Arjun Singh (25 merged PRs)"
                  project="Campus Connect App"
                />
                <PastEditionCard
                  edition="SANGAAM 2024"
                  contributors="50 students"
                  topContributor="Neha Gupta (20 merged PRs)"
                  project="Event Management System"
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
            <p className="section-subtitle text-center">Everything you need to become a great developer</p>

            <div className="grid md:grid-cols-2 gap-8">
              <ResourceCard
                title="Web Development Roadmap"
                description="Complete guide from HTML/CSS to full-stack development"
                link="/resources#roadmap"
              />
              <ResourceCard
                title="Git & GitHub Tutorials"
                description="Master version control and collaboration"
                link="/resources#git"
              />
              <ResourceCard
                title="Contributing Guide"
                description="Detailed guide on making your first open-source contribution"
                link="/resources#contributing"
              />
              <ResourceCard
                title="Tech Stack Documentation"
                description="Docs for React, Next.js, Node.js, and more"
                link="/resources#docs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-secondary">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Amazing Projects?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the Development Team and start your open-source journey with SANGAAM!
          </p>
          
          {isLoading ? (
            <button className="btn bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-3 rounded-lg opacity-70 cursor-not-allowed">
              Loading...
            </button>
          ) : isRegistered ? (
             <div className="inline-flex items-center space-x-2 bg-white text-green-600 text-lg px-8 py-3 rounded-lg font-bold shadow-lg">
              <CheckCircle className="w-6 h-6" />
              <span>You are Registered!</span>
            </div>
          ) : (
            <Link href="/register/sangaam" className="btn bg-white text-secondary hover:bg-gray-100 text-lg">
              Register for SANGAAM
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
  github,
  linkedin,
  projects,
}: {
  name: string;
  role: string;
  year: string;
  github: string;
  linkedin: string;
  projects: string;
}) {
  return (
    <div className="card-glass p-6 text-center hover:border-secondary/50 transition-all">
      <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-secondary font-semibold mb-1">{role}</p>
      <p className="text-xs text-gray-400 mb-4">{year}</p>
      
      <div className="space-y-2 text-sm mb-4">
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 text-gray-300 hover:text-secondary transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>@{github}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href={`https://linkedin.com/in/${linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 text-gray-300 hover:text-secondary transition-colors"
        >
          <span>LinkedIn</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="text-xs text-gray-400">
        <div className="font-semibold mb-1">Key Projects:</div>
        <div>{projects}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}:</span>
      <span className={`font-semibold ${highlight ? 'text-secondary' : ''}`}>{value}</span>
    </div>
  );
}

function PastEditionCard({
  edition,
  contributors,
  topContributor,
  project,
}: {
  edition: string;
  contributors: string;
  topContributor: string;
  project: string;
}) {
  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">{edition}</div>
            <div className="text-sm text-gray-400">{contributors} • {project}</div>
          </div>
        </div>
        <div className="text-sm">
          <span className="text-gray-400">Top Contributor: </span>
          <span className="text-secondary font-semibold">{topContributor}</span>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link href={link} className="card-glass hover:border-secondary/50 transition-all group p-4 block h-full">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-secondary" />
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

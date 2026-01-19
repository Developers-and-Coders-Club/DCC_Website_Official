'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Megaphone, Calendar, ArrowRight, Handshake, CheckCircle, Loader2, ExternalLink } from 'lucide-react';

export default function PRTeamPage() {
  const { status: sessionStatus } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRegistration = async () => {
      if (sessionStatus === 'authenticated') {
         setIsRegistered(false);
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
            <Megaphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">PR & Management Team</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-orange-100">
            Outreach • Sponsorships • Community Management
          </p>
        </div>
      </section>

      {/* Team Description */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-title">About the Team</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The Public Relations and Management Team is the backbone of DCC. We bridge the gap between the club and the student community, 
              handle corporate relations, and manage logistics for all events. We ensure that every initiative reaches its full potential 
              through effective marketing and strategic planning.
            </p>
          </div>

          {/* Team Leads & Core Members */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Team Leads & Core Members</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TeamMemberCard
                name="Sanya Malhotra"
                role="Team Lead"
                year="4th Year"
                linkedin="sanya-pr"
                focus="Corporate Relations"
              />
              <TeamMemberCard
                name="Aditya Raj"
                role="Core Member"
                year="3rd Year"
                linkedin="aditya-events"
                focus="Event Management"
              />
              <TeamMemberCard
                name="Meera Kapoor"
                role="Core Member"
                year="3rd Year"
                linkedin="meera-social"
                focus="Social Media"
              />
              <TeamMemberCard
                name="Kabir Khan"
                role="Core Member"
                year="2nd Year"
                linkedin="kabir-outreach"
                focus="Campus Outreach"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Active Program */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Campus Outreach Drive</h2>
              <p className="section-subtitle">Connecting with the Class of 2026</p>
            </div>

            {/* Program Info Card */}
            <div className="card-glass p-8 mb-8 border-orange-500/30">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-400">Campaign Details</h3>
                  <div className="space-y-3">
                    <InfoRow label="Campaign Name" value="Freshers Intro 2026" />
                    <InfoRow label="Duration" value="Jan 15 - Feb 15" />
                    <InfoRow label="Target Audience" value="1st & 2nd Year Students" />
                    <InfoRow label="Events Planned" value="12 Workshops" highlight />
                    <InfoRow label="Expected Reach" value="1500+ Students" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-400">Goals & Objectives</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Introduce students to technical domains</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Onboard new members to DCC community</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Secure scholarships for top performers</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Establish industry partnerships</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* About */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">Strategic Vision</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This outreach drive is not just about numbers; it&apos;s about identifying talent and nurturing it. 
                  We are collaborating with department heads and industry mentors to provide exclusive opportunities 
                  to students who show potential.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="#" className="btn-primary flex-1 text-center bg-orange-600 hover:bg-orange-700 border-none">
                  <Calendar className="inline-block w-5 h-5 mr-2" />
                  View Event Schedule
                </Link>
                
                {isLoading ? (
                  <button className="btn-outline flex-1 text-center" disabled>
                    <Loader2 className="inline-block w-5 h-5 mr-2 animate-spin" />
                    Checking Status...
                  </button>
                ) : isRegistered ? (
                  <div className="btn-success flex-1 text-center flex items-center justify-center space-x-2 bg-green-500/20 border border-green-500/50 text-green-400 cursor-default">
                    <CheckCircle className="w-5 h-5" />
                    <span>Volunteering</span>
                  </div>
                ) : (
                  <Link href="/contact" className="btn-outline flex-1 text-center border-orange-500/50 text-orange-400 hover:bg-orange-500/10">
                    <Handshake className="inline-block w-5 h-5 mr-2" />
                    Become a Volunteer
                  </Link>
                )}
              </div>
            </div>

            {/* Past Events */}
            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold mb-6">Success Stories</h3>
              <div className="space-y-4">
                <PastProjectCard 
                  title="HackNITA 2025"
                  role="Organizing Partner"
                  impact="500+ Participants, 50+ Projects"
                />
                <PastProjectCard 
                  title="TechTalks Series"
                  role="Event Management"
                  impact="Guest Speakers from Google & Amazon"
                />
                 <PastProjectCard 
                  title="Annual Coding Carnival"
                  role="Marketing & PR"
                  impact="Record-breaking 2000+ Registrations"
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
            <h2 className="section-title text-center">Management Resources</h2>
            <p className="section-subtitle text-center">Tools and guides for effective leadership</p>

            <div className="grid md:grid-cols-2 gap-8">
              <ResourceCard
                title="Event Planning Checklist"
                description="Comprehensive guide to organizing tech events"
                link="#"
              />
              <ResourceCard
                title="Sponsorship Proposal Template"
                description="Professional decks to pitch to sponsors"
                link="#"
              />
              <ResourceCard
                title="Social Media Toolkit"
                description="Branding assets and content calendar templates"
                link="#"
              />
              <ResourceCard
                title="Leadership Workshops"
                description="Recorded sessions on team management"
                link="#"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-orange-900 to-red-900">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Lead with Confidence</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-orange-100">
            Join the PR & Management Team to build your network and leadership skills.
          </p>
          
           <Link href="/contact" className="btn bg-white text-orange-900 hover:bg-gray-100 text-lg">
              Join the Team
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
        </div>
      </section>
    </div>
  );
}

function TeamMemberCard({
  name,
  role,
  year,
  linkedin,
  focus
}: {
  name: string;
  role: string;
  year: string;
  linkedin: string;
  focus: string;
}) {
  return (
    <div className="card-glass p-6 text-center hover:border-orange-500/50 transition-all">
      <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-400">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-orange-400 font-semibold mb-1">{role}</p>
      <p className="text-xs text-gray-400 mb-4">{year}</p>
      
      <div className="text-sm text-gray-300 mb-4">
        {focus}
      </div>
      
       <a
          href={`https://linkedin.com/in/${linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors text-sm"
        >
          <span>LinkedIn</span>
          <ExternalLink className="w-3 h-3" />
        </a>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}:</span>
      <span className={`font-semibold ${highlight ? 'text-orange-400' : ''}`}>{value}</span>
    </div>
  );
}

function PastProjectCard({ title, role, impact }: { title: string; role: string; impact: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-400">{role}</div>
        </div>
        <div className="text-sm text-orange-400 font-semibold">
           {impact}
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link href={link} target="_blank" className="card-glass hover:border-orange-500/50 transition-all group p-4 block h-full">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/30 transition-colors">
          <Megaphone className="w-6 h-6 text-orange-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 group-hover:text-orange-400 transition-colors">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

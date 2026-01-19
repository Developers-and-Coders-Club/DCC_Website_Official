'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Palette, Image as ImageIcon, PenTool, ArrowRight, Layout, CheckCircle, Loader2, ExternalLink } from 'lucide-react';

export default function DesignTeamPage() {
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
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Graphics & Design Team</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-pink-100">
            UI/UX • Branding • Visual Storytelling
          </p>
        </div>
      </section>

      {/* Team Description */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-title">About the Team</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The Design Team brings ideas to life through visuals. We are the creative minds behind DCC&apos;s branding,
              event posters, website UI/UX, and merchandise. We believe that good design is as important as good code,
              and we strive to create experiences that are both beautiful and functional.
            </p>
          </div>

          {/* Team Leads & Core Members */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Team Leads & Core Members</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TeamMemberCard
                name="Ishita Patel"
                role="Team Lead"
                year="4th Year"
                portfolio="behance.net/ishita"
                focus="UI/UX Design"
              />
               <TeamMemberCard
                name="Aryan Gupta"
                role="Core Member"
                year="3rd Year"
                portfolio="dribbble.com/aryan"
                focus="Brand Identity"
              />
              <TeamMemberCard
                name="Zara Khan"
                role="Core Member"
                year="3rd Year"
                portfolio="instagram.com/zara.art"
                focus="Illustration"
              />
              <TeamMemberCard
                name="Dev Kumar"
                role="Core Member"
                year="2nd Year"
                portfolio="behance.net/dev"
                focus="Motion Graphics"
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
              <h2 className="section-title">Design Sprint 2026</h2>
              <p className="section-subtitle">Collaborative Design Challenges</p>
            </div>

            {/* Program Info Card */}
            <div className="card-glass p-8 mb-8 border-pink-500/30">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-pink-400">Sprint Details</h3>
                  <div className="space-y-3">
                    <InfoRow label="Theme" value="Sustainable Future" />
                    <InfoRow label="Duration" value="48 Hours" />
                    <InfoRow label="Start Date" value="Jan 30, 2026" />
                    <InfoRow label="Teams" value="2-4 Designers" />
                    <InfoRow label="Prize Pool" value="₹10,000" highlight />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 text-pink-400">What We Look For</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Originality and Innovation in Concept</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Visual Aesthetic and Consistency</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Usability and User Experience (UX)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Presentation and Storytelling</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* About */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-2xl font-bold mb-4 text-pink-400">About Design Sprint</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                 Design Sprint is a fast-paced hackathon for designers. You&apos;ll be given a problem statement and 48 hours to create a high-fidelity prototype or visual campaign. 
                 Mentors from the industry will guide you through the process, and top teams will win exciting prizes.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="#" className="btn-primary flex-1 text-center bg-pink-600 hover:bg-pink-700 border-none">
                  <Layout className="inline-block w-5 h-5 mr-2" />
                  View Problem Statements
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
                  <Link href="/contact" className="btn-outline flex-1 text-center border-pink-500/50 text-pink-400 hover:bg-pink-500/10">
                    <PenTool className="inline-block w-5 h-5 mr-2" />
                    Register for Sprint
                  </Link>
                )}
              </div>
            </div>

            {/* Past Works */}
            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold mb-6">Featured Works</h3>
              <div className="space-y-4">
                <PastProjectCard 
                  title="DCC Website Redesign 2025"
                  category="UI/UX"
                  creator="Ishita & Team"
                />
                <PastProjectCard 
                  title="Aarohan Festival Branding"
                  category="Brand Identity"
                  creator="Aryan Gupta"
                />
                 <PastProjectCard 
                  title="Recruitment Teaser 2026"
                  category="Motion Graphics"
                  creator="Dev Kumar"
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
            <h2 className="section-title text-center">Design Resources</h2>
            <p className="section-subtitle text-center">Tools and inspiration for your creative journey</p>

            <div className="grid md:grid-cols-2 gap-8">
              <ResourceCard
                title="Figma 101"
                description="Master the industry's most popular design tool"
                link="https://www.figma.com/resources/learn-design/"
              />
              <ResourceCard
                title="Google Fonts Knowledge"
                description="Understanding typography and font pairing"
                link="https://fonts.google.com/knowledge"
              />
              <ResourceCard
                title="Dribbble Inspiration"
                description="Explore top-tier design work from around the world"
                link="https://dribbble.com/"
              />
              <ResourceCard
                title="Refactoring UI"
                description="Tips for making your UI look professional"
                link="https://www.refactoringui.com/"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-pink-900 to-rose-900">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Create with Passion</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-pink-100">
            Join the Graphics & Design Team and let your creativity flow.
          </p>
          
           <Link href="/contact" className="btn bg-white text-pink-900 hover:bg-gray-100 text-lg">
              Join Design Team
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
  portfolio,
  focus
}: {
  name: string;
  role: string;
  year: string;
  portfolio: string;
  focus: string;
}) {
  return (
    <div className="card-glass p-6 text-center hover:border-pink-500/50 transition-all">
      <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-pink-400">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-pink-400 font-semibold mb-1">{role}</p>
      <p className="text-xs text-gray-400 mb-4">{year}</p>
      
      <div className="text-sm text-gray-300 mb-4">
        {focus}
      </div>
      
       <a
          href={`https://${portfolio}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 text-gray-400 hover:text-pink-400 transition-colors text-sm"
        >
          <span>Portfolio</span>
          <ExternalLink className="w-3 h-3" />
        </a>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}:</span>
      <span className={`font-semibold ${highlight ? 'text-pink-400' : ''}`}>{value}</span>
    </div>
  );
}

function PastProjectCard({ title, category, creator }: { title: string; category: string; creator: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-400">{category}</div>
        </div>
        <div className="text-sm text-pink-400 font-semibold">
           {creator}
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link href={link} target="_blank" className="card-glass hover:border-pink-500/50 transition-all group p-4 block h-full">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/30 transition-colors">
          <ImageIcon className="w-6 h-6 text-pink-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 group-hover:text-pink-400 transition-colors">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

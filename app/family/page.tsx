'use client';

import { useState } from 'react';
import { User, Linkedin, Github, Mail } from 'lucide-react';
import Image from 'next/image';

export default function FamilyPage() {
  const [activeTab, setActiveTab] = useState('programming');

  // Placeholder Data - Executives
  const executives = [
    {
      id: 1,
      name: 'Executive Name',
      role: 'President',
      image: null, // Placeholder for image path
      linkedin: '#',
      email: 'president@dccnita.in'
    },
    {
      id: 2,
      name: 'Executive Name',
      role: 'Vice President',
      image: null,
      linkedin: '#',
      email: 'vp@dccnita.in'
    },
    {
      id: 3,
      name: 'Executive Name',
      role: 'General Secretary',
      image: null,
      linkedin: '#',
      email: 'gsec@dccnita.in'
    },
    {
      id: 4,
      name: 'Executive Name',
      role: 'Treasurer',
      image: null,
      linkedin: '#',
      email: 'treasurer@dccnita.in'
    },
  ];

  // Placeholder Data - Team Leads
  const teamLeads = [
    {
      id: 1,
      name: 'Leader Name',
      role: 'Programming Lead',
      team: 'Programming',
      image: null,
      linkedin: '#',
      github: '#'
    },
    {
      id: 2,
      name: 'Leader Name',
      role: 'Development Lead',
      team: 'Development',
      image: null,
      linkedin: '#',
      github: '#'
    },
    {
      id: 3,
      name: 'Leader Name',
      role: 'ML Team Lead',
      team: 'Machine Learning',
      image: null,
      linkedin: '#',
      github: '#'
    },
    {
      id: 4,
      name: 'Leader Name',
      role: 'PR Lead',
      team: 'PR & Management',
      image: null,
      linkedin: '#',
      github: '#'
    },
    {
      id: 5,
      name: 'Leader Name',
      role: 'Design Lead',
      team: 'Design',
      image: null,
      linkedin: '#',
      github: '#'
    },
  ];

  // Placeholder Data - Members (Mock for tabs)
  const teams = ['programming', 'development', 'ml', 'pr', 'design'];
  
  // Helper to generate mock members for now
  const generateMembers = (team: string, count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      name: `Member Name`,
      role: `${team.charAt(0).toUpperCase() + team.slice(1)} Member`,
      image: null
    }));
  };

  const members = {
    programming: generateMembers('programming', 8),
    development: generateMembers('development', 8),
    ml: generateMembers('ml', 6),
    pr: generateMembers('pr', 6),
    design: generateMembers('design', 6),
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-dark pt-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">The DCC Family</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the passionate individuals who lead, build, and nurture our community.
          </p>
        </div>
      </section>

      {/* Executives Section */}
      <section className="section">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Executive Committee</h2>
          <p className="section-subtitle text-center mb-12">Leading the vision and strategy</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executives.map((exec) => (
              <div key={exec.id} className="card-glass p-6 text-center group hover:border-primary/50 transition-all">
                <div className="w-32 h-32 mx-auto mb-6 relative rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 group-hover:border-primary transition-colors flex items-center justify-center">
                  {exec.image ? (
                    <Image src={exec.image} alt={exec.name} fill className="object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-primary/50" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">{exec.name}</h3>
                <p className="text-primary font-medium mb-4">{exec.role}</p>
                <div className="flex justify-center space-x-3">
                  <a href={exec.linkedin} className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${exec.email}`} className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Leads Section */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Team Leads</h2>
          <p className="section-subtitle text-center mb-12">Guiding our technical prowess</p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamLeads.map((lead) => (
              <div key={lead.id} className="card-glass p-6 text-center group hover:scale-105 transition-transform">
                <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden bg-gradient-to-br from-secondary/20 to-purple-500/20 flex items-center justify-center">
                   {lead.image ? (
                    <Image src={lead.image} alt={lead.name} fill className="object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-secondary/50" />
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1">{lead.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{lead.role}</p>
                <div className="flex justify-center space-x-2 mt-3">
                  <a href={lead.linkedin} className="text-gray-400 hover:text-secondary transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  {lead.github && (
                    <a href={lead.github} className="text-gray-400 hover:text-secondary transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Our Members</h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {teams.map((team) => (
              <button
                key={team}
                onClick={() => setActiveTab(team)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === team
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {team.charAt(0).toUpperCase() + team.slice(1)} Team
              </button>
            ))}
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {members[activeTab as keyof typeof members].map((member) => (
              <div key={member.id} className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-colors">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-dark-bg flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Search, Building2, MapPin, TrendingUp, Linkedin, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AlumniPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');

  const alumni = [
    {
      id: 1,
      name: 'Rahul Kumar',
      photo: null,
      graduationYear: 2023,
      branch: 'CSE',
      currentRole: 'Software Engineer',
      company: 'Google',
      location: 'Bangalore',
      package: 45,
      achievements: ['ACM ICPC Regionalist', '5⭐ CodeChef', 'Google Summer of Code'],
      linkedin: 'https://linkedin.com/in/rahul-kumar',
      github: 'https://github.com/rahulkumar',
      featured: true,
    },
    {
      id: 2,
      name: 'Priya Sharma',
      photo: null,
      graduationYear: 2023,
      branch: 'CSE',
      currentRole: 'Full Stack Developer',
      company: 'Microsoft',
      location: 'Hyderabad',
      package: 42,
      achievements: ['Microsoft Engage Mentee', 'Open Source Contributor', 'Hackathon Winner'],
      linkedin: 'https://linkedin.com/in/priya-sharma',
      github: 'https://github.com/priyasharma',
      featured: true,
    },
    {
      id: 3,
      name: 'Amit Verma',
      photo: null,
      graduationYear: 2024,
      branch: 'CSE',
      currentRole: 'SDE',
      company: 'Amazon',
      location: 'Bangalore',
      package: 40,
      achievements: ['Codeforces Expert', 'DCC Core Team', '3x Hackathon Winner'],
      linkedin: 'https://linkedin.com/in/amit-verma',
      github: 'https://github.com/amitverma',
      featured: false,
    },
    {
      id: 4,
      name: 'Sneha Patel',
      photo: null,
      graduationYear: 2024,
      branch: 'ECE',
      currentRole: 'Software Developer',
      company: 'Flipkart',
      location: 'Bangalore',
      package: 35,
      achievements: ['Smart India Hackathon Winner', 'Full Stack Developer', 'DCC Member'],
      linkedin: 'https://linkedin.com/in/sneha-patel',
      featured: false,
    },
  ];

  const companies = ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Adobe', 'Samsung', 'Oracle', 'Infosys'];

  const filteredAlumni = alumni.filter((alum) => {
    if (searchQuery && !alum.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (yearFilter !== 'all' && alum.graduationYear.toString() !== yearFilter) return false;
    if (companyFilter !== 'all' && alum.company !== companyFilter) return false;
    return true;
  });

  const stats = {
    totalAlumni: 200,
    avgPackage: 25,
    highestPackage: 50,
    topCompanies: 15,
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-dark pt-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">Our Alumni</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Celebrating the success of our graduates who are making an impact in top companies worldwide
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="section bg-gradient-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{stats.totalAlumni}+</div>
              <div className="text-lg">Alumni Placed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">₹{stats.avgPackage}L</div>
              <div className="text-lg">Average Package</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">₹{stats.highestPackage}L</div>
              <div className="text-lg">Highest Package</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{stats.topCompanies}+</div>
              <div className="text-lg">Top Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Marquee */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Where Our Alumni Work</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {companies.map((company) => (
              <div key={company} className="card-glass px-8 py-4 text-center hover:scale-105 transition-transform">
                <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="section">
        <div className="container-custom">
          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-11 w-full"
              />
            </div>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>

            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Companies</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          {/* Alumni Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlumni.map((alum) => (
              <div key={alum.id} className="card-hover">
                {alum.featured && (
                  <div className="mb-4">
                    <span className="badge-primary text-xs">Featured</span>
                  </div>
                )}

                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {alum.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{alum.name}</h3>
                    <p className="text-sm text-gray-400">
                      B.Tech {alum.branch} • {alum.graduationYear}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{alum.currentRole}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">@ {alum.company}, {alum.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="font-semibold text-green-400">Package: ₹{alum.package} LPA</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">Achievements:</div>
                  <div className="flex flex-wrap gap-2">
                    {alum.achievements.slice(0, 2).map((achievement) => (
                      <span key={achievement} className="badge bg-white/5 text-xs">
                        {achievement}
                      </span>
                    ))}
                    {alum.achievements.length > 2 && (
                      <span className="badge bg-white/5 text-xs">+{alum.achievements.length - 2}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {alum.linkedin && (
                    <a
                      href={alum.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 text-center text-sm flex items-center justify-center space-x-1"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {alum.github && (
                    <a
                      href={alum.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 text-center text-sm flex items-center justify-center space-x-1"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredAlumni.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No alumni found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-card">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Be Featured Here?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join DCC, build your skills, and land your dream job at top companies
          </p>
          <Link href="/auth/signup" className="btn-primary text-lg">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}

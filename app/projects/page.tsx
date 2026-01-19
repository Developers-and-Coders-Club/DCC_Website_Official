'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Code, ExternalLink, Github, Search } from 'lucide-react';

export default function ProjectsPage() {
  const [teamFilter, setTeamFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Campus Connect App',
      description: 'Mobile application for students to access notices, timetables, and campus updates in real-time',
      team: 'Development',
      techStack: ['React Native', 'Node.js', 'MongoDB', 'Express'],
      year: 2025,
      status: 'Completed',
      featured: true,
      links: {
        github: 'https://github.com/dccnita/campus-connect',
        demo: 'https://campus-connect-demo.vercel.app',
      },
    },
    {
      id: 2,
      title: 'Code Judge Platform',
      description: 'Online coding platform with automated testing, real-time leaderboards, and contest management',
      team: 'Both',
      techStack: ['Next.js', 'Python', 'PostgreSQL', 'Docker'],
      year: 2025,
      status: 'Ongoing',
      featured: true,
      links: {
        github: 'https://github.com/dccnita/code-judge',
      },
    },
    {
      id: 3,
      title: 'Alumni Portal',
      description: 'Platform to connect with alumni, track placements, and share success stories',
      team: 'Development',
      techStack: ['React', 'Express', 'MongoDB', 'Tailwind'],
      year: 2024,
      status: 'Completed',
      featured: false,
      links: {
        github: 'https://github.com/dccnita/alumni-portal',
        demo: 'https://alumni.dccnita.in',
      },
    },
    {
      id: 4,
      title: 'Event Management System',
      description: 'Comprehensive system for managing club events, registrations, and attendance',
      team: 'Development',
      techStack: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      year: 2024,
      status: 'Completed',
      featured: false,
      links: {
        github: 'https://github.com/dccnita/event-manager',
      },
    },
  ];

  const filteredProjects = projects.filter((project) => {
    if (teamFilter !== 'all' && project.team.toLowerCase() !== teamFilter) return false;
    if (yearFilter !== 'all' && project.year.toString() !== yearFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-dark pt-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">Our Projects</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore innovative projects built by our talented members using cutting-edge technologies
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="input flex-1"
            >
              <option value="all">All Teams</option>
              <option value="programming">Programming</option>
              <option value="development">Development</option>
              <option value="both">Both Teams</option>
            </select>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="input flex-1"
            >
              <option value="all">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card-hover">
                {project.featured && (
                  <div className="mb-4">
                    <span className="badge-primary text-xs">Featured</span>
                  </div>
                )}

                <div className="aspect-video bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                  <Code className="w-16 h-16 opacity-50" />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="badge bg-white/5 text-xs">{project.team}</span>
                  <span className="text-xs text-gray-400">{project.year}</span>
                </div>

                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="badge bg-white/5 text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="badge bg-white/5 text-xs">+{project.techStack.length - 3}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 text-center text-sm flex items-center justify-center space-x-1"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 text-center text-sm flex items-center justify-center space-x-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No projects found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-card">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join DCC and work on exciting projects with talented peers
          </p>
          <Link href="/auth/signup" className="btn-primary text-lg">
            Join Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}

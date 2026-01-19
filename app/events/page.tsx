'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [typeFilter, setTypeFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Web Development Workshop',
      date: 'Feb 25, 2026',
      time: '2:00 PM - 5:00 PM',
      venue: 'Seminar Hall, CSE Block',
      type: 'Workshop',
      team: 'Development',
      registrations: '45/100',
      image: '/placeholder-event.jpg',
    },
    {
      id: 2,
      title: 'Coding Contest - February Edition',
      date: 'Mar 5, 2026',
      time: '10:00 AM - 2:00 PM',
      venue: 'Computer Lab 1',
      type: 'Contest',
      team: 'Programming',
      registrations: '120/150',
      image: '/placeholder-event.jpg',
    },
    {
      id: 3,
      title: 'Tech Talk: AI/ML in Industry',
      date: 'Mar 15, 2026',
      time: '4:00 PM - 6:00 PM',
      venue: 'Auditorium',
      type: 'Talk',
      team: 'Both',
      registrations: '80/200',
      image: '/placeholder-event.jpg',
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Hackathon 2025',
      date: 'Dec 15-16, 2025',
      type: 'Hackathon',
      team: 'Both',
      participants: '80 teams',
    },
    {
      id: 5,
      title: 'Git & GitHub Workshop',
      date: 'Nov 20, 2025',
      type: 'Workshop',
      team: 'Development',
      participants: '150 students',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-dark pt-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">Events</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our workshops, hackathons, contests, and tech talks to enhance your skills and network with peers
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="section">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-dark-card rounded-lg p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  activeTab === 'upcoming' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  activeTab === 'past' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input flex-1"
            >
              <option value="all">All Types</option>
              <option value="workshop">Workshop</option>
              <option value="hackathon">Hackathon</option>
              <option value="contest">Contest</option>
              <option value="talk">Tech Talk</option>
            </select>

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
          </div>

          {/* Upcoming Events Grid */}
          {activeTab === 'upcoming' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="card-hover">
                  <div className="aspect-video bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                    <Calendar className="w-16 h-16 opacity-50" />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-primary text-xs">{event.type}</span>
                    <span className="badge bg-white/5 text-xs">{event.team}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Registrations: {event.registrations}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/events/${event.id}`} className="btn-outline flex-1 text-center text-sm">
                      View Details
                    </Link>
                    <Link href={`/events/${event.id}/register`} className="btn-primary flex-1 text-center text-sm">
                      Register
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Events Grid */}
          {activeTab === 'past' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="card-hover">
                  <div className="aspect-video bg-gradient-dark rounded-lg mb-4 flex items-center justify-center">
                    <Calendar className="w-16 h-16 opacity-30" />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge bg-white/5 text-xs">{event.type}</span>
                    <span className="badge bg-white/5 text-xs">{event.team}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{event.participants}</span>
                    </div>
                  </div>

                  <Link href={`/events/${event.id}`} className="btn-outline w-full text-center text-sm">
                    View Report
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

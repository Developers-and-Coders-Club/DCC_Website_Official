'use client';

import { useState, useEffect } from 'react';
import { Search, RefreshCw, Download, Trophy, Medal, Award, Filter } from 'lucide-react';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  name: string;
  cfHandle: string;
  problemsSolved: number;
  points: number;
  year?: number;
  branch?: string;
}

export default function CodingLeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20;

  // Fetch leaderboard data
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Filter entries
  useEffect(() => {
    let filtered = entries;

    if (searchQuery) {
      filtered = filtered.filter(
        (entry) =>
          entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.cfHandle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (yearFilter !== 'all') {
      filtered = filtered.filter((entry) => entry.year?.toString() === yearFilter);
    }

    if (branchFilter !== 'all') {
      filtered = filtered.filter((entry) => entry.branch === branchFilter);
    }

    setFilteredEntries(filtered);
    setCurrentPage(1);
  }, [searchQuery, yearFilter, branchFilter, entries]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leaderboard/coding');
      const result = await response.json();
      
      if (result.success) {
        setEntries(result.data);
        setFilteredEntries(result.data);
        setLastUpdated(new Date(result.lastUpdated));
      } else {
        console.error('Failed to fetch leaderboard:', result.message);
        // Show error to user
        alert(`Failed to load leaderboard: ${result.message || 'Unknown error'}\n\n${result.note || ''}`);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      alert('Failed to load leaderboard. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchLeaderboard();
  };

  const handleExport = () => {
    // Convert to CSV
    const csv = [
      ['Rank', 'Name', 'Codeforces Handle', 'Problems Solved', 'Points', 'Year', 'Branch'].join(','),
      ...filteredEntries.map((entry) =>
        [entry.rank, entry.name, entry.cfHandle, entry.problemsSolved, entry.points, entry.year || '', entry.branch || ''].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `21-days-leaderboard-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/teams/programming" className="text-primary hover:text-primary-light text-sm mb-4 inline-block">
            ← Back to Programming Team
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">21 Days Coding Challenge</h1>
          <p className="text-xl text-gray-300">Live Leaderboard - Batch 5, 2026</p>
        </div>

        {/* Filters and Actions */}
        <div className="card-glass p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or handle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-11 w-full"
              />
            </div>

            {/* Year Filter */}
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Years</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            {/* Branch Filter */}
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="EE">EE</option>
              <option value="ME">ME</option>
            </select>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="btn-outline flex-1 flex items-center justify-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleExport}
                className="btn-outline flex items-center justify-center px-4"
                title="Export to CSV"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-sm text-gray-400 text-center">
            Last updated: {lastUpdated.toLocaleString()} •{' '}
            <span className="text-primary">{filteredEntries.length} participants</span>
          </div>
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <div className="card-glass p-12 text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-400">Loading leaderboard...</p>
          </div>
        ) : (
          <>
            <div className="card-glass overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">CF Handle</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Problems</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Points</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Year</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEntries.map((entry) => (
                      <tr
                        key={entry.rank}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {entry.rank === 1 && <Trophy className="w-5 h-5 text-yellow-400" />}
                            {entry.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                            {entry.rank === 3 && <Award className="w-5 h-5 text-orange-400" />}
                            <span className="font-semibold">{entry.rank}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">{entry.name}</td>
                        <td className="px-6 py-4">
                          <a
                            href={`https://codeforces.com/profile/${entry.cfHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-light"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {entry.cfHandle}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-primary">
                          {entry.problemsSolved}
                        </td>
                        <td className="px-6 py-4 text-center font-bold">{entry.points}</td>
                        <td className="px-6 py-4 text-center text-gray-400">
                          {entry.year ? `${entry.year}${['st', 'nd', 'rd', 'th'][entry.year - 1] || 'th'}` : '-'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {entry.branch ? (
                            <span className="badge bg-white/5">{entry.branch}</span>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex space-x-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-primary text-white'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="card-glass p-6">
            <h3 className="text-xl font-bold mb-4">How Rankings Work</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Each solved problem = 10 points</li>
              <li>• Rankings update every 10 minutes</li>
              <li>• Only accepted submissions count</li>
              <li>• Ties are broken by submission time</li>
            </ul>
          </div>

          <div className="card-glass p-6">
            <h3 className="text-xl font-bold mb-4">Contest Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Contest ID:</span>
                <a
                  href="https://codeforces.com/gym/664790/standings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light"
                >
                  664790
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span>21 Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Problems:</span>
                <span>21</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    
    const owner = 'darshan2006-op';
    const repo = 'academic-planner-deadline-tracker';
    const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

    if (!githubToken) {
      throw new Error('GitHub token not configured');
    }

    // Get all users who have linked their GitHub account
    const registeredUsers = await User.find({
      'linkedAccounts.github.username': { $exists: true, $ne: '' },
      'linkedAccounts.github.verified': true,
    }).select('name linkedAccounts.github.username year branch');

    if (registeredUsers.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'No users have linked their GitHub accounts yet',
        lastUpdated: new Date().toISOString(),
        repository: `${owner}/${repo}`,
        totalContributors: 0,
      });
    }

    // Create a map of GitHub usernames to user data
    const userMap = new Map();
    registeredUsers.forEach(user => {
      const username = user.linkedAccounts?.github?.username;
      if (username) {
        userMap.set(username.toLowerCase(), {
          name: user.name,
          year: user.year,
          branch: user.branch,
        });
      }
    });

    // Fetch all merged pull requests
    const prsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&per_page=100`;
    
    const response = await fetch(prsUrl, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'DCC-NITA-Website',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const pullRequests = await response.json();

    // Filter only merged PRs from registered users
    const mergedPRs = pullRequests.filter((pr: any) => 
      pr.merged_at !== null && userMap.has(pr.user.login.toLowerCase())
    );

    // Group by user and calculate stats
    const userStats = new Map();

    for (const pr of mergedPRs) {
      const username = pr.user.login;
      const userData = userMap.get(username.toLowerCase());
      
      if (!userData) continue;

      if (!userStats.has(username)) {
        userStats.set(username, {
          username,
          name: userData.name,
          avatar: pr.user.avatar_url,
          mergedPRs: 0,
          totalAdditions: 0,
          totalDeletions: 0,
          points: 0,
          year: userData.year,
          branch: userData.branch,
        });
      }

      const stats = userStats.get(username);
      stats.mergedPRs += 1;
      stats.totalAdditions += pr.additions || 0;
      stats.totalDeletions += pr.deletions || 0;
      
      // Calculate points: 10 points per merged PR + 0.1 per line added + 0.05 per line deleted
      stats.points = (stats.mergedPRs * 10) + 
                     (stats.totalAdditions * 0.1) + 
                     (stats.totalDeletions * 0.05);
    }

    // Convert to array and sort by points
    const leaderboard = Array.from(userStats.values())
      .map((user) => ({
        ...user,
        points: Math.round(user.points),
      }))
      .sort((a, b) => b.points - a.points)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));

    return NextResponse.json({
      success: true,
      data: leaderboard,
      lastUpdated: new Date().toISOString(),
      repository: `${owner}/${repo}`,
      totalContributors: leaderboard.length,
      totalMergedPRs: mergedPRs.length,
      note: 'Leaderboard shows only registered users with verified GitHub accounts',
    });
  } catch (error) {
    console.error('Error fetching GitHub leaderboard:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch GitHub contributions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

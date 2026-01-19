import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    
    const gymId = '664790';
    
    // Get all users who have linked their Codeforces account
    const registeredUsers = await User.find({
      'linkedAccounts.codeforces.handle': { $exists: true, $ne: '' },
      'linkedAccounts.codeforces.verified': true,
    }).select('name linkedAccounts.codeforces.handle year branch');

    if (registeredUsers.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'No users have linked their Codeforces accounts yet',
        lastUpdated: new Date().toISOString(),
        contestId: gymId,
        totalParticipants: 0,
      });
    }

    // Fetch submissions for each user
    const leaderboard = [];
    
    for (const user of registeredUsers) {
      const cfHandle = user.linkedAccounts?.codeforces?.handle;
      if (!cfHandle) continue;

      try {
        // Fetch user's submissions from Codeforces
        const apiUrl = `https://codeforces.com/api/user.status?handle=${cfHandle}&from=1&count=1000`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) continue;
        
        const data = await response.json();
        
        if (data.status !== 'OK') continue;

        // Filter submissions for this specific gym contest
        const gymSubmissions = data.result.filter((submission: any) => 
          submission.contestId?.toString() === gymId &&
          submission.verdict === 'OK'
        );

        // Count unique solved problems
        const solvedProblems = new Set();
        gymSubmissions.forEach((submission: any) => {
          if (submission.problem?.index) {
            solvedProblems.add(submission.problem.index);
          }
        });

        const problemsSolved = solvedProblems.size;
        const points = problemsSolved * 10;

        leaderboard.push({
          name: user.name,
          cfHandle: cfHandle,
          problemsSolved: problemsSolved,
          points: points,
          year: user.year,
          branch: user.branch,
        });
      } catch (error) {
        console.error(`Error fetching data for ${cfHandle}:`, error);
        // Continue with other users
      }
    }

    // Sort by points (descending), then by problems solved
    leaderboard.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.problemsSolved - a.problemsSolved;
    });

    // Add ranks
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }));

    return NextResponse.json({
      success: true,
      data: rankedLeaderboard,
      lastUpdated: new Date().toISOString(),
      contestId: gymId,
      totalParticipants: rankedLeaderboard.length,
      note: 'Leaderboard shows all users with verified Codeforces accounts',
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leaderboard',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

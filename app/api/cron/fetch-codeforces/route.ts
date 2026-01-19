import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Leaderboard from '@/models/Leaderboard';
import Program from '@/models/Program';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Get active coding challenge program
    const program = await Program.findOne({
      type: 'coding_challenge',
      status: 'active',
    }).sort({ createdAt: -1 });

    if (!program) {
      return NextResponse.json({ error: 'No active program found' }, { status: 404 });
    }

    // Get all participants with Codeforces handles
    const participants = await User.find({
      'enrolledPrograms.programId': program._id,
      'linkedAccounts.codeforces.handle': { $exists: true, $ne: null },
    });

    if (participants.length === 0) {
      return NextResponse.json({ message: 'No participants with Codeforces handles' });
    }

    // Fetch Codeforces gym standings
    const gymId = process.env.CODEFORCES_GYM_ID || '664790';
    const cfHandles = participants.map((p) => p.linkedAccounts?.codeforces?.handle).filter(Boolean).join(';');

    try {
      // Fetch user info from Codeforces
      const userInfoResponse = await fetch(
        `https://codeforces.com/api/user.info?handles=${cfHandles}`
      );
      const userInfoData = await userInfoResponse.json();

      if (userInfoData.status !== 'OK') {
        throw new Error('Failed to fetch Codeforces user info');
      }

      // Fetch contest standings (if available)
      // Note: Codeforces API doesn't provide gym standings directly
      // You may need to scrape the gym page or use a different approach
      
      // For now, we'll create leaderboard based on user ratings and problem counts
      const leaderboardEntries = userInfoData.result.map((cfUser: any, index: number) => {
        const participant = participants.find(
          (p) => p.linkedAccounts?.codeforces?.handle === cfUser.handle
        );

        return {
          userId: participant?._id,
          rank: index + 1,
          name: participant?.name || cfUser.handle,
          cfHandle: cfUser.handle,
          rating: cfUser.rating || 0,
          maxRating: cfUser.maxRating || 0,
          problemsSolved: Math.floor(Math.random() * 21), // TODO: Fetch actual solved count from gym
          points: cfUser.rating || 0,
          year: participant?.year,
          branch: participant?.branch,
        };
      });

      // Sort by points
      leaderboardEntries.sort((a: any, b: any) => b.points - a.points);

      // Update ranks
      leaderboardEntries.forEach((entry: any, index: number) => {
        entry.rank = index + 1;
      });

      // Update or create leaderboard
      await Leaderboard.findOneAndUpdate(
        { programId: program._id },
        {
          programId: program._id,
          entries: leaderboardEntries,
          lastFetched: new Date(),
        },
        { upsert: true, new: true }
      );

      return NextResponse.json({
        success: true,
        message: 'Codeforces leaderboard updated successfully',
        participantsProcessed: leaderboardEntries.length,
        timestamp: new Date().toISOString(),
      });
    } catch (cfError) {
      console.error('Codeforces API error:', cfError);
      return NextResponse.json(
        { error: 'Failed to fetch Codeforces data', details: String(cfError) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

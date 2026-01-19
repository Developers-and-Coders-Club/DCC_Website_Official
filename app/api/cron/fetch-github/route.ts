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

    // Get active SANGAAM program
    const program = await Program.findOne({
      type: 'sangaam',
      status: 'active',
    }).sort({ createdAt: -1 });

    if (!program) {
      return NextResponse.json({ error: 'No active program found' }, { status: 404 });
    }

    // Get all participants with GitHub usernames
    const participants = await User.find({
      'enrolledPrograms.programId': program._id,
      'linkedAccounts.github.username': { $exists: true, $ne: null },
    });

    if (participants.length === 0) {
      return NextResponse.json({ message: 'No participants with GitHub usernames' });
    }

    const repoOwner = process.env.GITHUB_REPO_OWNER || 'darshan2006-op';
    const repoName = process.env.GITHUB_REPO_NAME || 'academic-planner-deadline-tracker';
    const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

    if (!githubToken) {
      return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
    }

    const leaderboardEntries = [];

    // Fetch contributions for each participant
    for (const participant of participants) {
      const username = participant.linkedAccounts?.github?.username;

      try {
        // Fetch user's pull requests
        const prsResponse = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all&creator=${username}`,
          {
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!prsResponse.ok) {
          console.error(`Failed to fetch PRs for ${username}`);
          continue;
        }

        const prs = await prsResponse.json();

        // Count merged and pending PRs
        const mergedPRs = prs.filter((pr: any) => pr.merged_at !== null).length;
        const pendingPRs = prs.filter((pr: any) => pr.state === 'open').length;

        // Calculate lines added/deleted
        let totalLinesAdded = 0;
        let totalLinesDeleted = 0;

        for (const pr of prs) {
          if (pr.merged_at) {
            // Fetch PR details to get additions and deletions
            const prDetailsResponse = await fetch(pr.url, {
              headers: {
                Authorization: `Bearer ${githubToken}`,
                Accept: 'application/vnd.github.v3+json',
              },
            });

            if (prDetailsResponse.ok) {
              const prDetails = await prDetailsResponse.json();
              totalLinesAdded += prDetails.additions || 0;
              totalLinesDeleted += prDetails.deletions || 0;
            }
          }
        }

        // Calculate points (customize scoring as needed)
        const points = mergedPRs * 10 + totalLinesAdded * 0.1 + totalLinesDeleted * 0.05;

        leaderboardEntries.push({
          userId: participant._id,
          name: participant.name,
          githubUsername: username,
          mergedPRs,
          pendingPRs,
          linesAdded: totalLinesAdded,
          linesDeleted: totalLinesDeleted,
          totalPoints: Math.round(points),
          year: participant.year,
          branch: participant.branch,
        });

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error processing ${username}:`, error);
        continue;
      }
    }

    // Sort by points
    leaderboardEntries.sort((a, b) => b.totalPoints - a.totalPoints);

    // Update ranks
    leaderboardEntries.forEach((entry, index) => {
      (entry as any).rank = index + 1;
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
      message: 'GitHub leaderboard updated successfully',
      participantsProcessed: leaderboardEntries.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

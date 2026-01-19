import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { githubUsername, verificationCode, gistUrl, profileData } = body;

    // Validate input
    if (!githubUsername || !verificationCode || !gistUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if GitHub username is already linked
    const existingUser = await User.findOne({ 'linkedAccounts.github.username': githubUsername });
    if (existingUser && existingUser.email !== session.user.email) {
      return NextResponse.json(
        { error: 'This GitHub username is already linked to another account' },
        { status: 400 }
      );
    }

    // Extract gist ID from URL
    const gistIdMatch = gistUrl.match(/gist\.github\.com\/[^\/]+\/([a-f0-9]+)/);
    if (!gistIdMatch) {
      return NextResponse.json(
        { error: 'Invalid Gist URL format' },
        { status: 400 }
      );
    }

    const gistId = gistIdMatch[1];

    // Verify GitHub Gist
    const gistResponse = await fetch(`https://api.github.com/gists/${gistId}`);
    const gistData = await gistResponse.json();

    if (!gistResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch Gist' },
        { status: 400 }
      );
    }

    // Check if gist belongs to the user
    if (gistData.owner.login.toLowerCase() !== githubUsername.toLowerCase()) {
      return NextResponse.json(
        { error: 'Gist does not belong to the provided GitHub username' },
        { status: 400 }
      );
    }

    // Check if verification code is in gist content
    const files = Object.values(gistData.files) as any[];
    const hasVerificationCode = files.some((file) =>
      file.content && file.content.includes(verificationCode)
    );

    if (!hasVerificationCode) {
      return NextResponse.json(
        { error: 'Verification code not found in Gist' },
        { status: 400 }
      );
    }

    // Update user in database
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          'linkedAccounts.github.username': githubUsername,
          'linkedAccounts.github.verified': true,
          'linkedAccounts.github.verifiedAt': new Date(),
          rollNumber: profileData?.rollNumber,
          year: profileData?.year ? parseInt(profileData.year) : undefined,
          branch: profileData?.branch,
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'GitHub account linked successfully',
      user: {
        githubUsername: updatedUser.linkedAccounts?.github?.username,
        verified: updatedUser.linkedAccounts?.github?.verified,
      },
    });
  } catch (error) {
    console.error('Error linking GitHub account:', error);
    return NextResponse.json(
      { error: 'Failed to link GitHub account' },
      { status: 500 }
    );
  }
}

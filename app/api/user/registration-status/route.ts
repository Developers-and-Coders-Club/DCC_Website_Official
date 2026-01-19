import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has linked accounts
    const hasCodeforces = !!(user.linkedAccounts?.codeforces?.handle && user.linkedAccounts?.codeforces?.verified);
    const hasGithub = !!(user.linkedAccounts?.github?.username && user.linkedAccounts?.github?.verified);

    return NextResponse.json({
      success: true,
      data: {
        hasCodeforces,
        hasGithub,
        codeforces: hasCodeforces ? {
          handle: user.linkedAccounts?.codeforces?.handle,
          verified: true,
        } : null,
        github: hasGithub ? {
          username: user.linkedAccounts?.github?.username,
          verified: true,
        } : null,
      },
    });
  } catch (error) {
    console.error('Error checking registration status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check registration status',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

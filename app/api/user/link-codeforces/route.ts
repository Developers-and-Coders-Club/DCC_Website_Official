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
    const { cfHandle, verificationCode, profileData } = body;

    // Validate input
    if (!cfHandle || !verificationCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if Codeforces handle is already linked
    const existingUser = await User.findOne({ 'linkedAccounts.codeforces.handle': cfHandle });
    if (existingUser && existingUser.email !== session.user.email) {
      return NextResponse.json(
        { error: 'This Codeforces handle is already linked to another account' },
        { status: 400 }
      );
    }

    // Verify Codeforces handle (check if verification code is in profile)
    const cfResponse = await fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`);
    const cfData = await cfResponse.json();

    if (cfData.status !== 'OK') {
      return NextResponse.json(
        { error: 'Invalid Codeforces handle' },
        { status: 400 }
      );
    }

    const user = cfData.result[0];
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();

    if (!fullName.includes(verificationCode.toLowerCase())) {
      return NextResponse.json(
        { error: 'Verification code not found in Codeforces profile' },
        { status: 400 }
      );
    }

    // Update user in database
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          'linkedAccounts.codeforces.handle': cfHandle,
          'linkedAccounts.codeforces.verified': true,
          'linkedAccounts.codeforces.verifiedAt': new Date(),
          rollNumber: profileData?.rollNumber,
          year: profileData?.year ? parseInt(profileData.year) : undefined,
          branch: profileData?.branch,
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Codeforces account linked successfully',
      user: {
        cfHandle: updatedUser.linkedAccounts?.codeforces?.handle,
        verified: updatedUser.linkedAccounts?.codeforces?.verified,
      },
    });
  } catch (error) {
    console.error('Error linking Codeforces account:', error);
    return NextResponse.json(
      { error: 'Failed to link Codeforces account' },
      { status: 500 }
    );
  }
}

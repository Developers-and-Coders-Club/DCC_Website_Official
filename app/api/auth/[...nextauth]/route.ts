import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide email and password');
        }

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.profilePhoto,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      if (account?.provider === 'google' || account?.provider === 'github') {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user
          const newUser = await User.create({
            name: user.name as string,
            email: user.email as string,
            profilePhoto: user.image as string,
            isVerified: true,
            linkedAccounts: {
              ...(account.provider === 'github' && {
                github: {
                  username: (profile as any)?.login || '',
                  githubId: (profile as any)?.id?.toString() || '',
                  verified: true,
                  verifiedAt: new Date(),
                },
              }),
            },
          });
          user.id = (newUser._id as any).toString();
        } else {
          // Update GitHub info if signing in with GitHub
          if (account.provider === 'github' && !existingUser.linkedAccounts?.github?.verified) {
            existingUser.linkedAccounts = existingUser.linkedAccounts || {};
            existingUser.linkedAccounts.github = {
              username: (profile as any)?.login || '',
              githubId: (profile as any)?.id?.toString() || '',
              verified: true,
              verifiedAt: new Date(),
            };
            await existingUser.save();
          }
          user.id = (existingUser._id as any).toString();
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

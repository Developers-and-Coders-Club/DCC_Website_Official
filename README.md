# DCC NIT Agartala Website

A modern, full-stack website for the Developers & Coders Club at NIT Agartala, built with Next.js 14, MongoDB, and cutting-edge web technologies.

## 🚀 Features

### Core Functionality

- ✅ **Authentication System** - NextAuth.js with Google, GitHub OAuth, and email/password
- ✅ **Programming Team** - 21 Days Coding Challenge with Codeforces integration
- ✅ **Development Team** - SANGAAM open-source contribution drive with GitHub tracking
- ✅ **Live Leaderboards** - Real-time rankings for both programs
- ✅ **Events Management** - Upcoming and past events with registration
- ✅ **Projects Showcase** - Portfolio of club projects with tech stacks
- ✅ **Alumni Network** - Placement statistics and success stories
- ✅ **User Dashboard** - Personalized dashboard for members
- ✅ **Admin Panel** - Content management system
- **Cron Jobs** - Automated leaderboard updates

### Design

- 🎨 **Modern UI** - Glassmorphism effects and smooth animations
- 🌙 **Dark Theme** - Professional dark mode with DCC color palette
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Fast Performance** - Optimized with Next.js 14 App Router
- 🔄 **Auto-Updates** - Cron jobs for real-time leaderboard data

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Cron Jobs**: Vercel Cron / GitHub Actions
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/dccnita/website.git
cd website
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Resend (for emails)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@dccnita.in

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Codeforces
CODEFORCES_GYM_ID=664790

# GitHub Repository for SANGAAM
GITHUB_REPO_OWNER=darshan2006-op
GITHUB_REPO_NAME=academic-planner-deadline-tracker

# Cron Job Security
CRON_SECRET=your-random-secret-string-here
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dcc-nita-website1/
├── app/                      # Next.js 14 App Router
│   ├── about/               # About page
│   ├── alumni/              # Alumni page
│   ├── api/                 # API routes
│   │   └── auth/           # Authentication routes
│   ├── auth/               # Auth pages (signin, signup)
│   ├── contact/            # Contact page
│   ├── events/             # Events pages
│   ├── projects/           # Projects pages
│   ├── teams/              # Team pages
│   │   ├── programming/    # Programming team & leaderboard
│   │   └── development/    # Development team & leaderboard
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/              # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ParticleBackground.tsx
├── lib/                     # Utility functions
│   ├── mongodb.ts          # Database connection
│   └── utils.ts            # Helper functions
├── models/                  # Mongoose models
│   ├── User.ts
│   ├── Program.ts
│   ├── Event.ts
│   ├── Project.ts
│   ├── Alumni.ts
│   └── ...
├── types/                   # TypeScript types
│   └── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Design System

### Colors

- **Primary**: `#0d47a1` (Deep Blue)
- **Secondary**: `#00acc1` (Cyan)
- **Dark Background**: `#0a0e27`
- **Card Background**: `#1a1f3a`

### Components

- Glassmorphism cards
- Gradient buttons
- Custom animations
- Responsive navigation

## 🔑 Key Pages

- `/` - Homepage with hero, stats, programs, events
- `/about` - About DCC with mission, vision, timeline
- `/teams` - Teams landing page
- `/teams/programming` - Programming team & 21 Days Challenge
- `/teams/programming/leaderboard` - Codeforces leaderboard
- `/teams/development` - Development team & SANGAAM
- `/teams/development/leaderboard` - GitHub contributions leaderboard
- `/events` - Events listing
- `/projects` - Projects showcase
- `/alumni` - Alumni network
- `/contact` - Contact form
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
```

## 📝 License

MIT License - feel free to use this project for your own club or organization!

## 👥 Contributors

Built with ❤️ by the DCC Team at NIT Agartala

## 📧 Contact

- Email: contact@dccnita.in
- Website: https://www.dccnita.in
- GitHub: https://github.com/dccnita

---

**Note**: This is a comprehensive website with many features. Some features like leaderboard data fetching require additional API implementation. Check the implementation plan for details on remaining work.

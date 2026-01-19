import Link from 'next/link';
import { Code, Github, ArrowRight, Brain, Megaphone, Palette } from 'lucide-react';

export default function TeamsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section pt-32 relative">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">Our Teams</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your path and join a team that matches your interests
          </p>
        </div>
      </section>

      {/* Teams */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Programming Team */}
            <div className="card-glass p-8 hover:border-primary/50 transition-all group">
              <div className="w-20 h-20 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-10 h-10 text-primary" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                Programming Team
              </h2>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Master competitive programming, data structures, and algorithms. Participate in coding contests, solve challenging problems, and improve your Codeforces rating.
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Focus Areas:</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Competitive Programming</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Data Structures & Algorithms</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Codeforces, CodeChef, LeetCode</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>ICPC & Other Contests</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Active Program:</h3>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <div className="font-semibold text-primary mb-1">21 Days Coding Challenge</div>
                  <div className="text-sm text-gray-400">Daily problems • Live leaderboard • Certificates</div>
                </div>
              </div>

              <Link 
                href="/teams/programming" 
                className="btn-primary w-full text-center group/btn"
              >
                Explore Programming Team
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Development Team */}
            <div className="card-glass p-8 hover:border-secondary/50 transition-all group">
              <div className="w-20 h-20 bg-secondary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Github className="w-10 h-10 text-secondary" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 group-hover:text-secondary transition-colors">
                Development Team
              </h2>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Build real-world projects, contribute to open-source, and master modern web and app development technologies. Learn industry-standard practices and tools.
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Focus Areas:</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Web & App Development</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Open Source Contributions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>React, Next.js, Node.js</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Git, GitHub, CI/CD</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Active Program:</h3>
                <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                  <div className="font-semibold text-secondary mb-1">SANGAAM - Open Source Drive</div>
                  <div className="text-sm text-gray-400">Contribute to real projects • Mentorship • Certificates</div>
                </div>
              </div>

              <Link 
                href="/teams/development" 
                className="btn-secondary w-full text-center group/btn"
              >
                Explore Development Team
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>


            {/* Machine Learning Team */}
            <div className="card-glass p-8 hover:border-purple-500/50 transition-all group">
              <div className="w-20 h-20 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-10 h-10 text-purple-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                Machine Learning Team
              </h2>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Dive into Artificial Intelligence. Build models, analyze data, and create intelligent systems that solve real-world problems.
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Focus Areas:</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Data Science & Analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Deep Learning & NLP</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Computer Vision</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Active Program:</h3>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="font-semibold text-purple-400 mb-1">AI Study Circle</div>
                  <div className="text-sm text-gray-400">Weekly sessions • Projects</div>
                </div>
              </div>

               <Link 
                href="/teams/ml" 
                className="btn-outline w-full text-center group/btn border-purple-500/50 text-purple-400 hover:bg-purple-500/10 block"
              >
                Explore ML Team
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* PR & Management Team */}
            <div className="card-glass p-8 hover:border-orange-500/50 transition-all group">
              <div className="w-20 h-20 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Megaphone className="w-10 h-10 text-orange-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 group-hover:text-orange-400 transition-colors">
                PR & Management Team
              </h2>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                The voice of DCC. Handle event management, corporate relations, and community engagement. Lead with impact.
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Focus Areas:</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Event Management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Corporate Outreach</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Social Media</span>
                  </li>
                </ul>
              </div>

               <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Active Initiative:</h3>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <div className="font-semibold text-orange-400 mb-1">Campus Outreach</div>
                  <div className="text-sm text-gray-400">Planning & Sponsorships</div>
                </div>
              </div>

              <Link 
                href="/teams/pr" 
                className="btn-outline w-full text-center group/btn border-orange-500/50 text-orange-400 hover:bg-orange-500/10 block"
              >
                Explore PR Team
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Graphics & Design Team */}
            <div className="card-glass p-8 hover:border-pink-500/50 transition-all group">
              <div className="w-20 h-20 bg-pink-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-10 h-10 text-pink-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 group-hover:text-pink-400 transition-colors">
                Graphics & Design Team
              </h2>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Visualize ideas. Create stunning UI/UX designs, posters, swags, and video content. Define the visual identity of DCC.
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Focus Areas:</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>UI/UX Design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Branding & Identity</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Video Editing</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg">Tools We Use:</h3>
                <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                  <div className="font-semibold text-pink-400 mb-1">Creative Suite</div>
                  <div className="text-sm text-gray-400">Figma • Photoshop • Premiere Pro</div>
                </div>
              </div>

              <Link 
                href="/teams/design" 
                className="btn-outline w-full text-center group/btn border-pink-500/50 text-pink-400 hover:bg-pink-500/10 block"
              >
                 Explore Design Team
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold mb-4">Not Sure Which Team to Join?</h3>
              <p className="text-gray-400 mb-6">
                You can be part of both teams! Many of our members actively participate in both competitive programming and development projects. Choose based on your current interests, and you can always explore the other team later.
              </p>
              <Link href="/contact" className="btn-outline">
                Contact Us for Guidance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

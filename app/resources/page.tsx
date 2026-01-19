import Link from 'next/link';
import { Book, Code, Github, Youtube, FileText, ExternalLink, Download } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-dark pt-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">Learning Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Curated resources, roadmaps, and tutorials to help you excel in competitive programming and development
          </p>
        </div>
      </section>

      {/* Roadmaps */}
      <section className="section">
        <div className="container-custom">
          <h2 className="section-title text-center">Learning Roadmaps</h2>
          <p className="section-subtitle text-center">Step-by-step guides to master different domains</p>

          <div className="grid md:grid-cols-2 gap-8">
            <RoadmapCard
              title="Competitive Programming Roadmap"
              description="From beginner to expert - master DSA and competitive programming"
              topics={[
                'Basics: Arrays, Strings, Math',
                'Intermediate: Sorting, Searching, Recursion',
                'Advanced: DP, Graphs, Trees',
                'Expert: Segment Trees, FFT, Game Theory',
              ]}
              link="/resources/cp-roadmap"
            />
            <RoadmapCard
              title="Web Development Roadmap"
              description="Complete guide to becoming a full-stack web developer"
              topics={[
                'Frontend: HTML, CSS, JavaScript, React',
                'Backend: Node.js, Express, Databases',
                'DevOps: Git, Docker, CI/CD',
                'Advanced: Next.js, TypeScript, Testing',
              ]}
              link="/resources/web-roadmap"
            />
          </div>
        </div>
      </section>

      {/* Practice Sheets */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <h2 className="section-title text-center">Practice Sheets</h2>
          <p className="section-subtitle text-center">Topic-wise problem collections</p>

          <div className="grid md:grid-cols-3 gap-6">
            <PracticeSheetCard
              title="Arrays & Strings"
              problems={50}
              difficulty="Beginner - Intermediate"
              link="https://codeforces.com/problemset"
            />
            <PracticeSheetCard
              title="Dynamic Programming"
              problems={75}
              difficulty="Intermediate - Advanced"
              link="https://codeforces.com/problemset"
            />
            <PracticeSheetCard
              title="Graphs & Trees"
              problems={60}
              difficulty="Intermediate - Advanced"
              link="https://codeforces.com/problemset"
            />
            <PracticeSheetCard
              title="Number Theory"
              problems={40}
              difficulty="Intermediate"
              link="https://codeforces.com/problemset"
            />
            <PracticeSheetCard
              title="Greedy Algorithms"
              problems={45}
              difficulty="Beginner - Intermediate"
              link="https://codeforces.com/problemset"
            />
            <PracticeSheetCard
              title="Binary Search"
              problems={35}
              difficulty="Beginner - Intermediate"
              link="https://codeforces.com/problemset"
            />
          </div>
        </div>
      </section>

      {/* Tutorials */}
      <section className="section">
        <div className="container-custom">
          <h2 className="section-title text-center">Tutorials & Guides</h2>
          <p className="section-subtitle text-center">Learn from the best resources</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TutorialCard
              icon={<Book className="w-6 h-6" />}
              title="CP Algorithms"
              description="Comprehensive algorithms and data structures guide"
              link="https://cp-algorithms.com/"
            />
            <TutorialCard
              icon={<Code className="w-6 h-6" />}
              title="GeeksforGeeks"
              description="Tutorials, practice problems, and interview prep"
              link="https://www.geeksforgeeks.org/"
            />
            <TutorialCard
              icon={<Youtube className="w-6 h-6" />}
              title="Striver's A2Z DSA"
              description="Complete DSA course with video explanations"
              link="https://takeuforward.org/strivers-a2z-dsa-course/"
            />
            <TutorialCard
              icon={<FileText className="w-6 h-6" />}
              title="Codeforces Blogs"
              description="Community tutorials and editorials"
              link="https://codeforces.com/blog/entry/"
            />
            <TutorialCard
              icon={<Book className="w-6 h-6" />}
              title="USACO Guide"
              description="Structured competitive programming curriculum"
              link="https://usaco.guide/"
            />
            <TutorialCard
              icon={<Code className="w-6 h-6" />}
              title="LeetCode Patterns"
              description="Common problem-solving patterns"
              link="https://leetcode.com/discuss/study-guide/"
            />
          </div>
        </div>
      </section>

      {/* Development Resources */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <h2 className="section-title text-center">Development Resources</h2>
          <p className="section-subtitle text-center">Tools and documentation for developers</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DevResourceCard
              icon={<Github className="w-6 h-6" />}
              title="GitHub Docs"
              link="https://docs.github.com/"
            />
            <DevResourceCard
              icon={<Code className="w-6 h-6" />}
              title="MDN Web Docs"
              link="https://developer.mozilla.org/"
            />
            <DevResourceCard
              icon={<FileText className="w-6 h-6" />}
              title="React Documentation"
              link="https://react.dev/"
            />
            <DevResourceCard
              icon={<Book className="w-6 h-6" />}
              title="Next.js Docs"
              link="https://nextjs.org/docs"
            />
            <DevResourceCard
              icon={<Code className="w-6 h-6" />}
              title="TypeScript Handbook"
              link="https://www.typescriptlang.org/docs/"
            />
            <DevResourceCard
              icon={<FileText className="w-6 h-6" />}
              title="Tailwind CSS"
              link="https://tailwindcss.com/docs"
            />
            <DevResourceCard
              icon={<Book className="w-6 h-6" />}
              title="Node.js Docs"
              link="https://nodejs.org/docs/"
            />
            <DevResourceCard
              icon={<Github className="w-6 h-6" />}
              title="Git Documentation"
              link="https://git-scm.com/doc"
            />
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="section">
        <div className="container-custom">
          <h2 className="section-title text-center">Recommended Books</h2>
          <p className="section-subtitle text-center">Essential reading for programmers</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BookCard
              title="Competitive Programming 4"
              author="Steven & Felix Halim"
              description="The definitive guide to competitive programming"
            />
            <BookCard
              title="Introduction to Algorithms"
              author="CLRS"
              description="Comprehensive algorithms textbook"
            />
            <BookCard
              title="Cracking the Coding Interview"
              author="Gayle Laakmann McDowell"
              description="Interview preparation guide"
            />
            <BookCard
              title="Clean Code"
              author="Robert C. Martin"
              description="A handbook of agile software craftsmanship"
            />
            <BookCard
              title="You Don't Know JS"
              author="Kyle Simpson"
              description="Deep dive into JavaScript"
            />
            <BookCard
              title="Designing Data-Intensive Applications"
              author="Martin Kleppmann"
              description="System design and architecture"
            />
          </div>
        </div>
      </section>

      {/* YouTube Channels */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <h2 className="section-title text-center">YouTube Channels</h2>
          <p className="section-subtitle text-center">Learn from video tutorials</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <YoutubeChannelCard name="Striver" link="https://www.youtube.com/@takeUforward" />
            <YoutubeChannelCard name="Errichto" link="https://www.youtube.com/@Errichto" />
            <YoutubeChannelCard name="William Fiset" link="https://www.youtube.com/@WilliamFiset-videos" />
            <YoutubeChannelCard name="CodeWithHarry" link="https://www.youtube.com/@CodeWithHarry" />
            <YoutubeChannelCard name="Traversy Media" link="https://www.youtube.com/@TraversyMedia" />
            <YoutubeChannelCard name="Fireship" link="https://www.youtube.com/@Fireship" />
            <YoutubeChannelCard name="Web Dev Simplified" link="https://www.youtube.com/@WebDevSimplified" />
            <YoutubeChannelCard name="The Net Ninja" link="https://www.youtube.com/@NetNinja" />
          </div>
        </div>
      </section>
    </div>
  );
}

function RoadmapCard({ title, description, topics, link }: any) {
  return (
    <div className="card-glass p-8">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <div className="space-y-2 mb-6">
        {topics.map((topic: string, i: number) => (
          <div key={i} className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-300">{topic}</span>
          </div>
        ))}
      </div>
      <Link href={link} className="btn-primary w-full text-center text-sm">
        View Full Roadmap
      </Link>
    </div>
  );
}

function PracticeSheetCard({ title, problems, difficulty, link }: any) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card-hover">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Problems:</span>
          <span className="font-semibold">{problems}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Difficulty:</span>
          <span className="text-primary font-semibold">{difficulty}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-2 text-primary text-sm">
        <span>Start Practicing</span>
        <ExternalLink className="w-4 h-4" />
      </div>
    </a>
  );
}

function TutorialCard({ icon, title, description, link }: any) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card-hover">
      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <div className="flex items-center space-x-2 text-primary text-sm">
        <span>Visit Resource</span>
        <ExternalLink className="w-4 h-4" />
      </div>
    </a>
  );
}

function DevResourceCard({ icon, title, link }: any) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card-hover text-center">
      <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-3 text-secondary">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ExternalLink className="w-4 h-4 mx-auto text-gray-400" />
    </a>
  );
}

function BookCard({ title, author, description }: any) {
  return (
    <div className="card-glass p-6">
      <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 text-2xl">
        📚
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-3">by {author}</p>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}

function YoutubeChannelCard({ name, link }: any) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card-hover text-center">
      <Youtube className="w-12 h-12 mx-auto mb-3 text-red-500" />
      <h3 className="font-semibold">{name}</h3>
    </a>
  );
}

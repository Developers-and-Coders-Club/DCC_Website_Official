import { Users, Target, Lightbulb, Trophy, Calendar, Code2 } from 'lucide-react';


export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-dark pt-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">About DCC</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The premier technical club at NIT Agartala, fostering a culture of learning, innovation, and excellence in technology.
          </p>
        </div>
      </section>

      {/* What is DCC */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center">What is DCC?</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                The <span className="text-primary font-semibold">Developers & Coders Club (DCC)</span> is the flagship technical club of NIT Agartala, dedicated to nurturing coding talent and fostering a vibrant community of developers, programmers, and tech enthusiasts.
              </p>
              <p>
                Founded with the vision of creating a platform for students to learn, build, and compete, DCC has grown into a thriving community of over 500+ members who are passionate about technology and innovation.
              </p>
              <p>
                We organize workshops, hackathons, coding contests, and technical talks throughout the year, providing students with opportunities to enhance their skills, work on real-world projects, and connect with industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-glass p-8">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To empower students with cutting-edge technical skills, foster innovation through hands-on projects, and create a collaborative environment where aspiring developers can grow, learn, and excel in their coding journey.
              </p>
            </div>

            <div className="card-glass p-8">
              <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To be the leading technical community in NIT Agartala, producing skilled developers who contribute to open-source, excel in competitive programming, and become industry leaders driving technological innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section">
        <div className="container-custom">
          <h2 className="section-title text-center">What We Do</h2>
          <p className="section-subtitle text-center">Our core focus areas</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ActivityCard
              icon={<Code2 className="w-8 h-8" />}
              title="Competitive Programming"
              description="Master DSA, participate in contests, and climb the Codeforces ladder with our structured programs."
            />
            <ActivityCard
              icon={<Users className="w-8 h-8" />}
              title="Web & App Development"
              description="Build real-world projects using modern frameworks and technologies like React, Next.js, and React Native."
            />
            <ActivityCard
              icon={<Trophy className="w-8 h-8" />}
              title="Open Source Contributions"
              description="Contribute to open-source projects, learn industry practices, and build your developer portfolio."
            />
            <ActivityCard
              icon={<Calendar className="w-8 h-8" />}
              title="Workshops & Events"
              description="Regular workshops, hackathons, tech talks, and coding contests to enhance your skills."
            />
          </div>
        </div>
      </section>

      {/* Club Journey Timeline */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <h2 className="section-title text-center">Our Journey</h2>
          <p className="section-subtitle text-center">Key milestones in DCC&apos;s history</p>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <TimelineItem
                year="2018"
                title="Club Founded"
                description="DCC was established with a vision to create a strong coding culture at NIT Agartala."
              />
              <TimelineItem
                year="2019"
                title="First Hackathon"
                description="Organized our first 24-hour hackathon with 100+ participants."
              />
              <TimelineItem
                year="2020"
                title="21 Days Challenge Launched"
                description="Started the flagship competitive programming program that has trained 500+ students."
              />
              <TimelineItem
                year="2022"
                title="SANGAAM Initiative"
                description="Launched open-source contribution drive, helping students make their first PRs."
              />
              <TimelineItem
                year="2024"
                title="500+ Members"
                description="Reached a milestone of 500+ active members across both teams."
              />
              <TimelineItem
                year="2026"
                title="New Website Launch"
                description="Launched our new platform with enhanced features and better user experience."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Advisors */}
      <section className="section">
        <div className="container-custom">
          <h2 className="section-title text-center">Faculty Advisors</h2>
          <p className="section-subtitle text-center">Guiding our journey</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FacultyCard
              name="Dr. Rajesh Kumar"
              designation="Professor, CSE Department"
              role="Chief Advisor"
            />
            <FacultyCard
              name="Dr. Priya Sharma"
              designation="Associate Professor, CSE"
              role="Technical Advisor"
            />
            <FacultyCard
              name="Dr. Amit Verma"
              designation="Assistant Professor, CSE"
              role="Program Coordinator"
            />
          </div>
        </div>
      </section>


    </div>
  );
}

function ActivityCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card-glass p-6 hover:border-primary/50 transition-all">
      <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function TimelineItem({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          {year}
        </div>
        <div className="w-0.5 h-full bg-primary/30 mt-2"></div>
      </div>
      <div className="pb-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function FacultyCard({ name, designation, role }: { name: string; designation: string; role: string }) {
  return (
    <div className="card-glass p-6 text-center">
      <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-sm text-gray-400 mb-1">{designation}</p>
      <p className="text-sm text-primary font-semibold">{role}</p>
    </div>
  );
}

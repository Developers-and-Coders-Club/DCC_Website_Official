'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Brain, Users, BookOpen, ArrowRight, Database, CheckCircle, Loader2, ExternalLink } from 'lucide-react';

export default function MLTeamPage() {
  const { status: sessionStatus } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating registration check for now as backend endpoint might not support 'hasML' yet
    const checkRegistration = async () => {
      if (sessionStatus === 'authenticated') {
        // In a real scenario, we would fetch from API
        // For now, we assume false
        setIsRegistered(false);
      }
      setIsLoading(false);
    };

    checkRegistration();
  }, [sessionStatus]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section pt-32 relative">
        <div className="container-custom text-center">
          <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Machine Learning Team</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-purple-100">
            Data Science • Deep Learning • Artificial Intelligence
          </p>
        </div>
      </section>

      {/* Team Description */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-title">About the Team</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The Machine Learning Team delves into the fascinating world of Artificial Intelligence. 
              From analyzing complex datasets to building state-of-the-art deep learning models, 
              we explore the frontiers of technology. Our members actively participate in Kaggle competitions, 
              read research papers, and build intelligent applications.
            </p>
          </div>

          {/* Team Leads & Core Members */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Team Leads & Core Members</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TeamMemberCard
                name="Aisha Verma"
                role="Team Lead"
                year="4th Year"
                github="aisha-ai"
                specialization="NLP & Transformers"
              />
              <TeamMemberCard
                name="Rohan Das"
                role="Core Member"
                year="3rd Year"
                github="rohan-ml"
                specialization="Computer Vision"
              />
              <TeamMemberCard
                name="Vikram Singh"
                role="Core Member"
                year="3rd Year"
                github="vikram-data"
                specialization="Data Engineering"
              />
              <TeamMemberCard
                name="Priya Roy"
                role="Core Member"
                year="2nd Year"
                github="priya-stats"
                specialization="Statistical Analysis"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Active Program */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">AI Study Circle</h2>
              <p className="section-subtitle">Collaborative Learning & Research Initiatives</p>
            </div>

            {/* Program Info Card */}
            <div className="card-glass p-8 mb-8 border-purple-500/30">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Current Session Details</h3>
                  <div className="space-y-3">
                    <InfoRow label="Topic" value="Advanced NLP & LLMs" />
                    <InfoRow label="Meeting Day" value="Every Saturday" />
                    <InfoRow label="Time" value="6:00 PM - 8:00 PM" />
                    <InfoRow label="Next Session" value="Jan 24, 2026" highlight />
                    <InfoRow label="Active Members" value="40+" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Program Activities</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Detailed Review of ArXiv Research Papers</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Hands-on Implementation of Algorithms</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Kaggle Competition Squads</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">Guest Lectures from Industry Experts</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* About */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">About the Circle</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The AI Study Circle is a peer-to-peer learning environment where we break down complex machine learning concepts into understandable chunks.
                  It is designed for students who want to go beyond the basics and understand the mathematics and code behind modern AI systems.
                </p>
              </div>

              {/* Learning Tracks */}
              <div className="border-t border-white/10 pt-8 mt-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Learning Tracks</h3>
                <div className="grid md:grid-cols-2 gap-4">
                   <div className="bg-white/5 rounded-lg p-4">
                     <div className="text-purple-400 font-bold mb-2">Beginner Track</div>
                     <p className="text-sm text-gray-300">Python foundations, libraries (Pandas, NumPy), and intro to scikit-learn algorithms.</p>
                   </div>
                   <div className="bg-white/5 rounded-lg p-4">
                     <div className="text-purple-400 font-bold mb-2">Advanced Track</div>
                     <p className="text-sm text-gray-300">Deep Learning with PyTorch, Transformer architectures, and Generative Adversarial Networks (GANs).</p>
                   </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="#" className="btn-primary flex-1 text-center bg-purple-600 hover:bg-purple-700 border-none">
                  <Database className="inline-block w-5 h-5 mr-2" />
                  View Curriculum
                </Link>
                
                {isLoading ? (
                  <button className="btn-outline flex-1 text-center" disabled>
                    <Loader2 className="inline-block w-5 h-5 mr-2 animate-spin" />
                    Checking Status...
                  </button>
                ) : isRegistered ? (
                  <div className="btn-success flex-1 text-center flex items-center justify-center space-x-2 bg-green-500/20 border border-green-500/50 text-green-400 cursor-default">
                    <CheckCircle className="w-5 h-5" />
                    <span>Joined</span>
                  </div>
                ) : (
                  <Link href="/contact" className="btn-outline flex-1 text-center border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                    <Users className="inline-block w-5 h-5 mr-2" />
                    Join Study Circle
                  </Link>
                )}
              </div>
            </div>

            {/* Past Projects */}
            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold mb-6">Past Projects</h3>
              <div className="space-y-4">
                <PastProjectCard 
                  title="Plant Disease Detection"
                  tech="CNN, TensorFlow"
                  contributors="Project Squad Alpha"
                />
                <PastProjectCard 
                  title="Stock Price Predictor"
                  tech="LSTM, Time-Series Analysis"
                  contributors="Project Squad Beta"
                />
                 <PastProjectCard 
                  title="Chatbot for College FAQs"
                  tech="NLP, RAG, LangChain"
                  contributors="Project Squad Gamma"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center">Learning Resources</h2>
            <p className="section-subtitle text-center">Curated materials to master Machine Learning</p>

            <div className="grid md:grid-cols-2 gap-8">
              <ResourceCard
                title="Google ML Crash Course"
                description="Fast-paced, practical introduction to machine learning"
                link="https://developers.google.com/machine-learning/crash-course"
              />
              <ResourceCard
                title="Fast.ai Deep Learning"
                description="Top-down approach to deep learning for coders"
                link="https://course.fast.ai/"
              />
              <ResourceCard
                title="Kaggle Learn"
                description="Hands-on tutorials for data science skills"
                link="https://www.kaggle.com/learn"
              />
              <ResourceCard
                title="Hugging Face Course"
                description="The definitive guide to NLP and Transformers"
                link="https://huggingface.co/course/chapter1/1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to innovate?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-purple-100">
            Join the Machine Learning Team and shape the future with AI.
          </p>
          
           <Link href="/contact" className="btn bg-white text-purple-900 hover:bg-gray-100 text-lg">
              Get Started
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
        </div>
      </section>
    </div>
  );
}

function TeamMemberCard({
  name,
  role,
  year,
  github,
  specialization
}: {
  name: string;
  role: string;
  year: string;
  github: string;
  specialization: string;
}) {
  return (
    <div className="card-glass p-6 text-center hover:border-purple-500/50 transition-all">
      <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-400">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-purple-400 font-semibold mb-1">{role}</p>
      <p className="text-xs text-gray-400 mb-4">{year}</p>
      
      <div className="text-sm text-gray-300 mb-4">
        {specialization}
      </div>
      
       <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors text-sm"
        >
          <span>@{github}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}:</span>
      <span className={`font-semibold ${highlight ? 'text-purple-400' : ''}`}>{value}</span>
    </div>
  );
}

function PastProjectCard({ title, tech, contributors }: { title: string; tech: string; contributors: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-400">{tech}</div>
        </div>
        <div className="text-sm text-purple-400 font-semibold">
           {contributors}
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link href={link} target="_blank" className="card-glass hover:border-purple-500/50 transition-all group p-4 block h-full">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
          <BookOpen className="w-6 h-6 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

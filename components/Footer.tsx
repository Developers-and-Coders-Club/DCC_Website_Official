'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {

  return (
    <footer className="bg-dark-card border-t border-white/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10">
                <Image 
                  src="/assets/logo.png" 
                  alt="DCC Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-bold gradient-text">DCC</div>
                <div className="text-xs text-gray-400">NIT Agartala</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              The premier technical club at NIT Agartala focused on competitive programming, web development, and open-source contributions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/dccnita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-110 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/dccnita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-110 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/dccnita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-110 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/dccnita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-110 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/teams/programming" className="text-gray-400 hover:text-primary transition-colors">
                  Programming Team
                </Link>
              </li>
              <li>
                <Link href="/teams/development" className="text-gray-400 hover:text-primary transition-colors">
                  Development Team
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-primary transition-colors">
                  Events
                </Link>
              </li>

              <li>
                <Link href="/alumni" className="text-gray-400 hover:text-primary transition-colors">
                  Alumni
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link href="/resources#roadmaps" className="text-gray-400 hover:text-white transition-colors">
                  Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/resources#tutorials" className="text-gray-400 hover:text-white transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/resources#books" className="text-gray-400 hover:text-white transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-gray-400">
                <Mail className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:contact@dccnita.in" className="hover:text-primary transition-colors">
                  contact@dccnita.in
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <span>
                  National Institute of Technology<br />
                  Agartala, Tripura - 799046
                </span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <Phone className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Developers & Coders Club, NIT Agartala. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

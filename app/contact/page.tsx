import { Mail, MapPin, Phone, Send, Github, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-dark pt-32">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="card-glass p-8">
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="input"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="textarea"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">
                  <Send className="inline-block w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-glass p-8">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href="mailto:contact@dccnita.in" className="text-gray-400 hover:text-primary transition-colors">
                        contact@dccnita.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <a href="tel:+91XXXXXXXXXX" className="text-gray-400 hover:text-primary transition-colors">
                        +91 XXXXX XXXXX
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Address</div>
                      <p className="text-gray-400">
                        National Institute of Technology<br />
                        Jirania, Agartala<br />
                        Tripura - 799046, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card-glass p-8">
                <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://github.com/dccnita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-6 h-6 text-primary" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/company/dccnita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Linkedin className="w-6 h-6 text-primary" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://instagram.com/dccnita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Instagram className="w-6 h-6 text-primary" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://twitter.com/dccnita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Twitter className="w-6 h-6 text-primary" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-dark-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="How can I join DCC?"
                answer="You can join DCC by registering on our website and signing up for one of our active programs like the 21 Days Coding Challenge or SANGAAM. We welcome all students from NIT Agartala!"
              />
              <FAQItem
                question="Do I need prior coding experience?"
                answer="Not necessarily! We have programs for all skill levels. Beginners can start with our introductory workshops, while experienced coders can dive into competitive programming or open-source contributions."
              />
              <FAQItem
                question="Are there any membership fees?"
                answer="No, DCC membership is completely free for all NIT Agartala students. We believe in making technical education accessible to everyone."
              />
              <FAQItem
                question="How often do you organize events?"
                answer="We organize events regularly throughout the academic year, including weekly workshops, monthly hackathons, and quarterly coding contests. Check our events page for the latest schedule."
              />
              <FAQItem
                question="Can I be part of both Programming and Development teams?"
                answer="Absolutely! Many of our members actively participate in both teams. You can choose to focus on one or explore both areas based on your interests."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Find Us</h2>
          <div className="card-glass overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.123456789!2d91.4123456!3d23.8123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzQ0LjQiTiA5McKwMjQnNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="card-glass p-6 group">
      <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
        <span>{question}</span>
        <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <p className="mt-4 text-gray-400 leading-relaxed">{answer}</p>
    </details>
  );
}

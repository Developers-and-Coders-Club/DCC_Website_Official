import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-primary hover:text-primary-light text-sm mb-6 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last updated: January 19, 2026</p>

          <div className="card-glass p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using the DCC NIT Agartala website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are primarily intended for students of NIT Agartala. By registering, you confirm that you are a current student or have authorization to participate in our programs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you create an account with us, you must provide accurate and complete information. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your linked accounts (Codeforces, GitHub) are legitimate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Program Participation</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When participating in our programs (21 Days Coding Challenge, SANGAAM, etc.), you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Follow all program rules and guidelines</li>
                <li>Submit only your own original work</li>
                <li>Not engage in plagiarism or cheating</li>
                <li>Respect other participants and maintain a positive environment</li>
                <li>Complete verification processes honestly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Code of Conduct</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                All users must adhere to our code of conduct:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Be respectful and professional in all interactions</li>
                <li>No harassment, discrimination, or offensive behavior</li>
                <li>No spam or unauthorized advertising</li>
                <li>No sharing of inappropriate content</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                All content on this website, including text, graphics, logos, and software, is the property of DCC NIT Agartala or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. User-Generated Content</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                By submitting content (code, comments, projects), you grant us a non-exclusive, worldwide license to use, reproduce, and display your content for the purpose of operating and promoting our services. You retain ownership of your content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Leaderboards and Rankings</h2>
              <p className="text-gray-300 leading-relaxed">
                Leaderboard rankings are based on data fetched from external platforms (Codeforces, GitHub). We strive for accuracy but do not guarantee real-time updates. Manipulation of rankings through fraudulent means will result in disqualification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Violates these Terms of Service</li>
                <li>Is harmful to other users or the club</li>
                <li>Violates applicable laws or regulations</li>
                <li>Involves fraudulent or deceptive practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Disclaimer of Warranties</h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                DCC NIT Agartala shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of significant changes. Your continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>Email: <a href="mailto:contact@dccnita.in" className="text-primary hover:text-primary-light">contact@dccnita.in</a></li>
                <li>Address: NIT Agartala, Jirania, Tripura - 799046</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Copy, ExternalLink, Loader2 } from 'lucide-react';

export default function RegisterSangaamPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  // GitHub data
  const [githubUsername, setGithubUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [gistUrl, setGistUrl] = useState('');

  // Check if user already registered
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/user/registration-status');
          const data = await response.json();
          
          if (data.success && data.data.hasGithub) {
            setAlreadyRegistered(true);
            setGithubUsername(data.data.github.username);
          }
        } catch (error) {
          console.error('Error checking registration status:', error);
        } finally {
          setCheckingStatus(false);
        }
      } else {
        setCheckingStatus(false);
      }
    };

    checkRegistrationStatus();
  }, [status]);
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?returnUrl=/register/sangaam');
    }
  }, [status, router]);

  useEffect(() => {
    // Generate verification code
    if (step === 2) {
      const code = `DCC-SANGAAM-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setVerificationCode(code);
    }
  }, [step]);



  const checkGithubUsername = async () => {
    if (!githubUsername) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if username exists on GitHub
      const response = await fetch(`https://api.github.com/users/${githubUsername}`);
      
      if (response.ok) {
        setStep(2);
      } else if (response.status === 404) {
        setError('GitHub username not found. Please check and try again.');
      } else {
        setError('Error checking GitHub username. Please try again.');
      }
    } catch (err) {
      setError('Error checking GitHub username. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyGithubGist = async () => {
    if (!gistUrl) {
      setError('Please enter the Gist URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Extract gist ID from URL
      const gistIdMatch = gistUrl.match(/gist\.github\.com\/[^\/]+\/([a-f0-9]+)/);
      if (!gistIdMatch) {
        setError('Invalid Gist URL format');
        setLoading(false);
        return;
      }

      const gistId = gistIdMatch[1];

      // Fetch gist content
      const response = await fetch(`https://api.github.com/gists/${gistId}`);
      const data = await response.json();

      if (response.ok) {
        // Check if gist belongs to the user
        if (data.owner.login.toLowerCase() !== githubUsername.toLowerCase()) {
          setError('This Gist does not belong to the provided GitHub username');
          setLoading(false);
          return;
        }

        // Check if verification code is in gist content
        const files = Object.values(data.files) as any[];
        const hasVerificationCode = files.some((file) =>
          file.content && file.content.includes(verificationCode)
        );

        if (hasVerificationCode) {
          // Verify and link account
          const apiResponse = await fetch('/api/user/link-github', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ githubUsername, verificationCode })
          });

          const result = await apiResponse.json();

          if (apiResponse.ok) {
            setStep(3);
          } else {
            setError(result.error || 'Failed to link account. Please try again.');
          }
        } else {
          setError('Verification code not found in the Gist. Please check and try again.');
        }
      } else {
        setError('Error fetching Gist. Please check the URL and try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error verifying GitHub Gist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (status === 'loading' || checkingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (alreadyRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="card-glass p-8 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Already Registered! ✅</h2>
            <p className="text-gray-300 mb-6">
              You have already linked your GitHub account and are registered for SANGAAM.
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-8">
              <div className="text-sm text-gray-400 mb-1">Linked GitHub Username</div>
              <div className="font-semibold text-[#00acc1]">@{githubUsername}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="btn-secondary flex-1 text-center">
                Go to Dashboard
              </Link>
              <Link href="/teams/development/leaderboard" className="btn-outline flex-1 text-center">
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="card-glass p-8 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Registration Successful! 🎉</h2>
            <p className="text-gray-300 mb-6">
              You've successfully registered for SANGAAM. Your GitHub account has been verified.
            </p>
            <div className="space-y-3 mb-8">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">GitHub Username</div>
                <div className="font-semibold">@{githubUsername}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Program</div>
                <div className="font-semibold">SANGAAM 2026 - Open Source Drive</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="btn-secondary flex-1 text-center">
                Go to Dashboard
              </Link>
              <Link href="/teams/development/leaderboard" className="btn-outline flex-1 text-center">
                View Leaderboard
              </Link>
              <a
                href="https://github.com/darshan2006-op/academic-planner-deadline-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 text-center"
              >
                View Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/teams/development" className="text-secondary hover:text-secondary-light text-sm mb-4 inline-block">
              ← Back to Development Team
            </Link>
            <h1 className="text-4xl font-bold gradient-text mb-4">Register for SANGAAM</h1>
            <p className="text-gray-300">Join the open-source contribution drive</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {[
              { num: 1, label: 'GitHub' },
              { num: 2, label: 'Verify' },
              { num: 3, label: 'Done' },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                    step >= s.num ? 'bg-secondary text-white' : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {step > s.num ? <CheckCircle className="w-6 h-6" /> : s.num}
                </div>
                <div className={`text-sm ${step >= s.num ? 'text-white' : 'text-gray-400'}`}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-2 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Enter GitHub Username */}
          {step === 1 && (
            <div className="card-glass p-8">
              <h2 className="text-2xl font-bold mb-6">Enter GitHub Username</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub Username</label>
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    className="input"
                    placeholder="your-username"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Don't have a GitHub account?{' '}
                    <a
                      href="https://github.com/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-secondary-light"
                    >
                      Create one here
                    </a>
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={checkGithubUsername}
                    disabled={loading}
                    className="btn-secondary flex-1 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Check Username'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Verify GitHub via Gist */}
          {step === 2 && (
            <div className="card-glass p-8">
              <h2 className="text-2xl font-bold mb-6">Verify GitHub Ownership</h2>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-200">
                    To verify that you own this GitHub account, please create a public Gist with the verification code.
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium mb-2">Your Verification Code:</div>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono">
                      {verificationCode}
                    </code>
                    <button
                      onClick={() => copyToClipboard(verificationCode)}
                      className="btn-outline px-4"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="font-semibold">Instructions:</div>
                  <ol className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-secondary font-bold">1.</span>
                      <span>
                        Go to{' '}
                        <a
                          href="https://gist.github.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-secondary-light inline-flex items-center"
                        >
                          GitHub Gist
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-secondary font-bold">2.</span>
                      <span>Create a new public Gist</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-secondary font-bold">3.</span>
                      <span>Paste the verification code in the Gist content</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-secondary font-bold">4.</span>
                      <span>Create the Gist and copy its URL</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-secondary font-bold">5.</span>
                      <span>Paste the Gist URL below and verify</span>
                    </li>
                  </ol>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Gist URL</label>
                  <input
                    type="url"
                    value={gistUrl}
                    onChange={(e) => setGistUrl(e.target.value)}
                    className="input"
                    placeholder="https://gist.github.com/username/..."
                  />
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1">
                    Back
                  </button>
                  <button
                    onClick={verifyGithubGist}
                    disabled={loading}
                    className="btn-secondary flex-1 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Verify Now'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="card-glass p-8 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Verification Successful!</h2>
              <p className="text-gray-300 mb-8">
                Your GitHub account has been verified. Completing registration...
              </p>
              <button
                onClick={() => setSuccess(true)}
                className="btn-secondary"
              >
                Complete Registration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code, CheckCircle, AlertCircle, Copy, ExternalLink, Loader2 } from 'lucide-react';

export default function Register21DaysPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  // Codeforces data
  const [cfHandle, setCfHandle] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [cfVerified, setCfVerified] = useState(false);

  // Check if user already registered
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/user/registration-status');
          const data = await response.json();
          
          if (data.success && data.data.hasCodeforces) {
            setAlreadyRegistered(true);
            setCfHandle(data.data.codeforces.handle);
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
      router.push('/auth/signin?returnUrl=/register/21-days-coding');
    }
  }, [status, router]);

  useEffect(() => {
    // Generate verification code
    if (step === 2) {
      const code = `DCC-NITA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setVerificationCode(code);
    }
  }, [step]);



  const checkCfHandleAvailability = async () => {
    if (!cfHandle) {
      setError('Please enter a Codeforces handle');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if handle exists on Codeforces
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`);
      const data = await response.json();

      if (data.status === 'OK') {
        setStep(2);
      } else {
        setError('Codeforces handle not found. Please check and try again.');
      }
    } catch (err) {
      setError('Error checking Codeforces handle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyCfHandle = async () => {
    setLoading(true);
    setError('');

    try {
      // Call Codeforces API to verify
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`);
      const data = await response.json();

      if (data.status === 'OK' && data.result.length > 0) {
        const user = data.result[0];
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const fullName = `${firstName} ${lastName}`.toLowerCase();

        // Check if verification code is in name
        if (fullName.includes(verificationCode.toLowerCase())) {
          // Verify and link account
          const response = await fetch('/api/user/link-codeforces', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cfHandle, verificationCode })
          });
          
          const result = await response.json();
          
          if (response.ok) {
            setCfVerified(true);
            setStep(3);
          } else {
            setError(result.error || 'Failed to link account. Please try again.');
          }
        } else {
          setError('Verification code not found in your Codeforces profile. Please add it to your name and try again.');
        }
      } else {
        setError('Codeforces handle not found or API error.');
      }
    } catch (err) {
      console.error(err);
      setError('Error verifying Codeforces handle. Please try again.');
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
              You have already linked your Codeforces account and are registered for the 21 Days Coding Challenge.
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-8">
              <div className="text-sm text-gray-400 mb-1">Linked Codeforces Handle</div>
              <div className="font-semibold text-[#0d47a1]">{cfHandle}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="btn-outline flex-1 text-center">
                Go to Dashboard
              </Link>
              <Link href="/teams/programming/leaderboard" className="btn-primary flex-1 text-center">
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
              You've successfully registered for the 21 Days Coding Challenge. Your Codeforces handle has been verified.
            </p>
            <div className="space-y-3 mb-8">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Codeforces Handle</div>
                <div className="font-semibold">{cfHandle}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Program</div>
                <div className="font-semibold">21 Days Coding Challenge - Batch 5</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="btn-primary flex-1 text-center">
                Go to Dashboard
              </Link>
              <Link href="/teams/programming/leaderboard" className="btn-outline flex-1 text-center">
                View Leaderboard
              </Link>
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
            <Link href="/teams/programming" className="text-primary hover:text-primary-light text-sm mb-4 inline-block">
              ← Back to Programming Team
            </Link>
            <h1 className="text-4xl font-bold gradient-text mb-4">Register for 21 Days Challenge</h1>
            <p className="text-gray-300">Complete the steps below to join the challenge</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {[
              { num: 1, label: 'CF Handle' },
              { num: 2, label: 'Verify' },
              { num: 3, label: 'Done' },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                    step >= s.num ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'
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

          {/* Step 1: Enter CF Handle */}
          {step === 1 && (
            <div className="card-glass p-8">
              <h2 className="text-2xl font-bold mb-6">Enter Codeforces Handle</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Codeforces Handle</label>
                  <input
                    type="text"
                    value={cfHandle}
                    onChange={(e) => setCfHandle(e.target.value)}
                    className="input"
                    placeholder="your_handle"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Don't have a Codeforces account?{' '}
                    <a
                      href="https://codeforces.com/register"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-light"
                    >
                      Create one here
                    </a>
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={checkCfHandleAvailability}
                    disabled={loading}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Check Availability'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Verify CF Handle */}
          {step === 2 && (
            <div className="card-glass p-8">
              <h2 className="text-2xl font-bold mb-6">Verify Codeforces Ownership</h2>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-200">
                    To verify that you own this Codeforces account, please add the verification code to your profile name.
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
                      <span className="text-primary font-bold">1.</span>
                      <span>
                        Go to{' '}
                        <a
                          href="https://codeforces.com/settings/general"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-light inline-flex items-center"
                        >
                          Codeforces Settings
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">2.</span>
                      <span>Add the verification code to your First Name or Last Name</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">3.</span>
                      <span>Save your profile changes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">4.</span>
                      <span>Click "Verify Now" below</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">5.</span>
                      <span>You can remove the code from your name after verification</span>
                    </li>
                  </ol>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1">
                    Back
                  </button>
                  <button
                    onClick={verifyCfHandle}
                    disabled={loading}
                    className="btn-primary flex-1 disabled:opacity-50"
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
                Your Codeforces account has been verified. Completing registration...
              </p>
              <button
                onClick={() => setSuccess(true)}
                className="btn-primary"
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

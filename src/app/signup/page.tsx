"use client";

import React, { useState } from "react";
import styles from "./components/signup.module.css";

type FormState = {
  name: string;
  github: string;
  enrolment: string;
  email: string;
  password: string;
  confirm: string;
};

export default function SignupPage(): JSX.Element {
  const [form, setForm] = useState<FormState>({ name: "", github: "", enrolment: "", email: "", password: "", confirm: "" });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setPhoto(f);
      setPhotoPreview(URL.createObjectURL(f));
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.enrolment.trim() || !form.email.trim() || !form.password) {
      setError("Please fill all required fields.");
      return;
    }
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(form.email)) {
      setError("Enter a valid email.");
      return;
    }
    if (form.github.trim()) {
      try {
        new URL(form.github);
      } catch {
        setError("Enter a valid GitHub URL or leave it blank.");
        return;
      }
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!photo) {
      setError("Please upload a profile photo (required).");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess(`Signup successful — welcome, ${form.name}!`);
    setForm({ name: "", github: "", enrolment: "", email: "", password: "", confirm: "" });
    setPhoto(null);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logoRow}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dcc.jpeg" alt="DCC logo" className={styles.logoImg} />
        </div>
        <h1 className={styles.heading}>Join DCC</h1>
        <div className={styles.tagline}>LEARN. CONTRIBUTE. GROW WITH DCC</div>
        {/* <div className={styles.subtext}>Create an account to track your leaderboard progress.</div> */}
        {/* <div className={styles.subtitle}>Use your official enrolment and profile so teammates can recognise you on the leaderboard.</div> */}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} className={styles.input} placeholder="Hritabrata" required />
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor="enrolment">Enrolment number</label>
            <input id="enrolment" name="enrolment" value={form.enrolment} onChange={handleChange} className={styles.input} placeholder="e.g. 24UCH027" required />
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor="github">GitHub profile (optional)</label>
            <input id="github" name="github" type="url" value={form.github} onChange={handleChange} className={styles.input} placeholder="https://github.com/your-username" />
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={styles.input} placeholder="you@company.com" required />
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} className={styles.input} placeholder="At least 6 characters" required />
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor="confirm">Confirm password</label>
            <input id="confirm" name="confirm" type="password" value={form.confirm} onChange={handleChange} className={styles.input} placeholder="Re-enter your password" required />
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.label}>Profile photo (optional)</label>
            <div className={styles.fileRow}>
              <input type="file" accept="image/*" onChange={handlePhoto} className={styles.fileInput} aria-label="Upload profile photo" />
              <div className={styles.photoPreview}>
                {photoPreview ? (
                  <img src={photoPreview} alt="preview" style={{width:'100%',height:'100%',objectFit:'cover'}} />
                ) : (
                  <span className={styles.photoPlaceholderText}>Upload photo (required)</span>
                )}
              </div>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submit}>Create account</button>

          {success && <div className={styles.success}>{success}</div>}
        </form>

        <div className={styles.meta}>
          Already have an account?
          <a href="/signin" className={styles.footerLink}>Sign in</a>
        </div>

        <div className={styles.terms}>
          By creating an account you agree to our Terms of Use and Privacy Policy.
        </div>
      </div>
    </main>
  );
}

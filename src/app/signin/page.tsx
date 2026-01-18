"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./components/signin.module.css";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const [remember, setRemember] = useState(true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    alert('Signed in (mock)');
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <aside className={styles.brand}>
          <div className={styles.logoRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dcc.jpeg" alt="DCC logo" className={styles.logoImg} />
            <div>
              <div className={styles.brandTitle}>DCC</div>
              {/* <div className={styles.brandSubtitle}>Track contributions, celebrate top performers.</div> */}
              <div className={styles.tagline}>LEARN. CONTRIBUTE. GROW WITH DCC</div>
            </div>
          </div>
        </aside>

        <section className={styles.formCard} aria-labelledby="signin-heading">
          <h1 id="signin-heading" className={styles.formTitle}>Sign in to DCC</h1>
          {/* <p className={styles.formDesc}>Enter your email and password to continue to the leaderboard.</p> */}

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                className={styles.input}
                type="email"
                placeholder="you@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                className={styles.input}
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.row}>
              <label className={styles.remember}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>

              <Link className={styles.link} href="#">Forgot password?</Link>
            </div>


            <button className={styles.submit} type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>


            <div className={styles.footerLinks}>
              <Link className={styles.muted} href="/signup">New to DCC? Create an account</Link>
              <span className={styles.muted}>Need help? <Link href="#" className={styles.link}>Contact</Link></span>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isLogin ? 'Logged in' : 'Signed up';
    const userDetails = isLogin ? { email, password } : { name, email, password };
    alert(`${action} successfully! (Simulated)\n` + JSON.stringify(userDetails, null, 2));
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h1 className={styles.title}>{isLogin ? 'Log In to ReBuy' : 'Get Started with ReBuy'}</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Log In' : 'Create Account'}
          </button>
        </form>
        <div className={styles.switchAuth}>
          {isLogin ? (
            <>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Log in</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 
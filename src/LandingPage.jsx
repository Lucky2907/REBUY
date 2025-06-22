import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import { FaRecycle, FaShoppingCart, FaHandshake, FaArrowRight } from 'react-icons/fa';

const SocialProof = () => (
  <div className={styles.socialProof}>
    <p>POWERING THE CIRCULAR ECONOMY FOR BRANDS LIKE YOURS</p>
    <div className={styles.logos}>
      <div className={styles.logo}>EcoWear</div>
      <div className={styles.logo}>GreenHome</div>
      <div className={styles.logo}>RenewTech</div>
      <div className={styles.logo}>Sustainable Styles</div>
      <div className={styles.logo}>Re-Up Retail</div>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            Intelligent Return & Resale Experiences.
          </h1>
          <p className={styles.heroSubheadline}>
            Use our AI-driven platform to manage returns, reduce waste, and open new revenue streams through resale and recycling.
          </p>
          <div className={styles.heroButtons}>
            <button className={`${styles.ctaButton} ${styles.primary}`}>
              Get Started <FaArrowRight />
            </button>
            <Link to="/about" className={`${styles.ctaButton} ${styles.secondary}`}>
              Request a Demo
            </Link>
          </div>
        </div>
        <SocialProof />
      </main>

      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaRecycle /></div>
            <h3>For Retailers</h3>
            <p>Upload and classify your returned items. Our platform helps you identify whether to resell, repair, donate, or recycle, minimizing waste and recovering value.</p>
            <Link to="/dashboard" className={styles.featureLink}>Get Started <FaArrowRight /></Link>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaShoppingCart /></div>
            <h3>For Consumers</h3>
            <p>Shop for high-quality, pre-loved, and refurbished products at a great price. Every purchase you make contributes to a more sustainable future.</p>
            <Link to="/marketplace" className={styles.featureLink}>Browse Items <FaArrowRight /></Link>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaHandshake /></div>
            <h3>For NGOs</h3>
            <p>Connect with retailers to receive donated goods. Fulfill your mission by providing essential products to those who need them most.</p>
            <Link to="/ngo" className={styles.featureLink}>Request Donations <FaArrowRight /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 
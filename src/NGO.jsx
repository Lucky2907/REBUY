import React, { useState, useRef, useEffect } from 'react';
import styles from './NGO.module.css';
import { FaCheckCircle } from 'react-icons/fa';

function ConfettiOverlay({ show }) {
  const ref = useRef();
  useEffect(() => {
    if (!show) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const confetti = Array.from({length: 20}, () => ({
      x: Math.random() * W,
      y: Math.random() * -H,
      r: 6 + Math.random() * 6,
      d: 2 + Math.random() * 4,
      color: `hsl(${Math.random()*360},80%,60%)`,
      tilt: Math.random() * 10 - 5
    }));
    let frame;
    function draw() {
      ctx.clearRect(0,0,W,H);
      confetti.forEach(c => {
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, c.r, c.r/2, c.tilt, 0, 2*Math.PI);
        ctx.fillStyle = c.color;
        ctx.fill();
      });
    }
    function update() {
      confetti.forEach(c => {
        c.y += c.d;
        c.x += Math.sin(c.tilt);
        c.tilt += 0.05;
        if (c.y > H) { c.y = -10; c.x = Math.random() * W; }
      });
    }
    function loop() { draw(); update(); frame = requestAnimationFrame(loop); }
    loop();
    return () => cancelAnimationFrame(frame);
  }, [show]);
  return show ? <canvas ref={ref} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:999}} /> : null;
}

export default function NGO() {
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 800);
    setTimeout(() => setSubmitted(false), 3000);
    e.target.reset();
  };

  return (
    <div className={styles.pageWrapper}>
      <ConfettiOverlay show={confetti} />
      <section className={styles.section}>
        <h2>NGO Donation Request</h2>
        <form className={styles.form} onSubmit={handleSubmit} tabIndex={0} aria-label="NGO donation request form">
          <label className={styles.label}>NGO Name: <input className={styles.input} type="text" name="ngoName" required /></label>
          <label className={styles.label}>Contact Email: <input className={styles.input} type="email" name="ngoEmail" required /></label>
          <label className={styles.label}>Requested Items: <input className={styles.input} type="text" name="requestedItems" required /></label>
          <button className={styles.button} type="submit" aria-label="Request donation">Request Donation</button>
        </form>
        {submitted && <div className={`${styles.success} ${styles.fadeIn}`}><FaCheckCircle color="#43a047" style={{marginRight: 6}} aria-label="Success" />Donation request submitted! We will contact you soon.</div>}
      </section>
      <section className={styles.section}>
        <h2>Recycler & Repair Partner Info</h2>
        <p>If you are a recycler or certified repair partner, contact us at <a className={styles.link} href="mailto:partners@rebuy.com">partners@rebuy.com</a> to integrate with our platform.</p>
      </section>
    </div>
  );
} 
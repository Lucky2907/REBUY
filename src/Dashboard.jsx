import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { FaCheckCircle, FaTools, FaRecycle, FaHandHoldingHeart } from 'react-icons/fa';

function getStatusIcon(status) {
  switch (status) {
    case 'Resell':
      return <><FaCheckCircle color="#43a047" title="Resell" aria-label="Resell" /><span className={styles.tooltip}>Eligible for Resell: Like New/Open Box</span></>;
    case 'Repair':
      return <><FaTools color="#1976d2" title="Repair" aria-label="Repair" /><span className={styles.tooltip}>Needs Repair: Defective but fixable</span></>;
    case 'Recycle':
      return <><FaRecycle color="#fbc02d" title="Recycle" aria-label="Recycle" /><span className={styles.tooltip}>Recycle: Unusable, salvage materials</span></>;
    case 'Donate':
      return <><FaHandHoldingHeart color="#d81b60" title="Donate" aria-label="Donate" /><span className={styles.tooltip}>Donate: Usable but unsellable</span></>;
    default:
      return null;
  }
}

function classifyItem() {
  const buckets = ['Resell', 'Repair', 'Recycle', 'Donate'];
  return buckets[Math.floor(Math.random() * buckets.length)];
}

function useButtonRipple() {
  useEffect(() => {
    const handleRipple = e => {
      const btn = e.currentTarget;
      btn.classList.remove('button--ripple');
      void btn.offsetWidth; // force reflow
      btn.classList.add('button--ripple');
      setTimeout(() => btn.classList.remove('button--ripple'), 500);
    };
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => {
      btn.addEventListener('click', handleRipple);
    });
    return () => {
      buttons.forEach(btn => {
        btn.removeEventListener('click', handleRipple);
      });
    };
  }, []);
}

function ConfettiOverlay({ show }) {
  const ref = React.useRef();
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

export default function Dashboard({ triggerConfetti }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('rebuy_items') || '[]');
    setItems(stored);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const file = form.productImage.files[0];

    const itemData = {
      name: form.productName.value,
      sku: form.sku.value,
      category: form.category.value,
      reason: form.returnReason.value,
      status: classifyItem(),
      id: Date.now()
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedItems = [...items, { ...itemData, image: event.target.result }];
        setItems(updatedItems);
        localStorage.setItem('rebuy_items', JSON.stringify(updatedItems));
      };
      reader.readAsDataURL(file);
    } else {
      const updatedItems = [...items, { ...itemData, image: `https://source.unsplash.com/random/300x300?product,${itemData.category}` }];
      setItems(updatedItems);
      localStorage.setItem('rebuy_items', JSON.stringify(updatedItems));
    }
    
    form.reset();
    triggerConfetti();
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.dashboardContainer}>
        <section>
          <h2 className={styles.title}>Upload Product Return</h2>
          <form className={styles.form} id="uploadForm" onSubmit={handleSubmit}>
            <label className={styles.label}>
              Product Image
              <input className={styles.input} type="file" name="productImage" accept="image/*" />
            </label>
            <label className={styles.label}>Product Name: <input className={styles.input} type="text" name="productName" required /></label>
            <label className={styles.label}>SKU: <input className={styles.input} type="text" name="sku" required /></label>
            <label className={styles.label}>Category: <input className={styles.input} type="text" name="category" required /></label>
            <label className={styles.label}>Return Reason: <input className={styles.input} type="text" name="returnReason" required /></label>
            <button className={"button " + styles.button} type="submit" aria-label="Upload and classify return">Upload & Classify</button>
          </form>
        </section>

        <section>
          <h2 className={styles.title}>Classified Returns</h2>
          <div className={styles.itemsList}>
            {items.length > 0 ? items.map((item) => (
              <div className={styles.itemCard} key={item.id} tabIndex={0}>
                <img className={styles.itemImage} src={item.image} alt={item.name} />
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p><strong>SKU:</strong> {item.sku}</p>
                  <div className={styles.statusBadge}>
                    {getStatusIcon(item.status)}
                    <span>{item.status}</span>
                  </div>
                </div>
              </div>
            )) : (
              <p>No items have been classified yet. Use the form to add one!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
} 
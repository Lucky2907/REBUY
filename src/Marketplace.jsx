import React, { useState, useEffect } from 'react';
import styles from './Marketplace.module.css';
import { FaLeaf, FaCheckCircle, FaTools } from 'react-icons/fa';

function getProducts() {
  let items = JSON.parse(localStorage.getItem('rebuy_items') || '[]');
  return items.filter(item => item.status === 'Resell' || item.status === 'Repair');
}

function getTrustIcon(status) {
  if (status === 'Resell') return <><FaCheckCircle color="#43a047" title="Certified Pre-Loved" aria-label="Certified Pre-Loved" /><span className={styles.tooltip}>Certified Pre-Loved: Like New/Open Box</span></>;
  if (status === 'Repair') return <><FaTools color="#1976d2" title="Certified Refurbished" aria-label="Certified Refurbished" /><span className={styles.tooltip}>Certified Refurbished: Professionally repaired</span></>;
  return null;
}

function getEcoIcon(ecoImpact) {
  let color = ecoImpact === 'high' ? '#43a047' : ecoImpact === 'medium' ? '#fbc02d' : '#d81b60';
  let label = ecoImpact === 'high' ? 'High eco impact: lots of CO₂ saved' : ecoImpact === 'medium' ? 'Medium eco impact' : 'Low eco impact';
  return (
    <span className={styles.ecoImpact} tabIndex={0}>
      <FaLeaf color={color} title="Eco Impact" aria-label="Eco Impact" />
      <span className={styles.tooltip}>{label}</span>
    </span>
  );
}

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    condition: '',
    eco: '',
  });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    let results = products;
    if (filters.category !== '') {
      results = results.filter(p => p.category.toLowerCase().includes(filters.category.toLowerCase()));
    }
    if (filters.condition !== '') {
      results = results.filter(p => p.status.toLowerCase() === filters.condition.toLowerCase());
    }
    if (filters.eco !== '') {
      results = results.filter(p => p.ecoImpact === filters.eco);
    }
    if (filters.price !== '') {
      results = results.filter(p => (p.price || (Math.random() * 100 + 20)).toFixed(2) <= filters.price);
    }
    setFilteredProducts(results);
    if (products.length > 0) {
      setIsAnimating(true);
    }
  }, [filters, products]);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterSubmit = e => {
    e.preventDefault();
    let items = getProducts();
    setProducts(
      items.filter(item => {
        const price = (item.price || (Math.random() * 100 + 20)).toFixed(2);
        const ecoImpact = item.ecoImpact || ['high', 'medium', 'low'][Math.floor(Math.random()*3)];
        let show = true;
        if (filters.category && !item.category.toLowerCase().includes(filters.category.toLowerCase())) show = false;
        if (filters.condition && item.status.toLowerCase() !== filters.condition) show = false;
        if (filters.eco && ecoImpact !== filters.eco) show = false;
        if (filters.price && Number(price) > Number(filters.price)) show = false;
        return show;
      })
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.section}>
        <h2>Filter Products</h2>
        <form className={styles.filterForm} onSubmit={handleFilterSubmit}>
          <label className={styles.label}>Category: <input className={styles.input} type="text" name="category" value={filters.category} onChange={handleFilterChange} /></label>
          <label className={styles.label}>Price: <input className={styles.input} type="number" name="price" min="0" value={filters.price} onChange={handleFilterChange} /></label>
          <label className={styles.label}>Condition:
            <select className={styles.select} name="condition" value={filters.condition} onChange={handleFilterChange}>
              <option value="">Any</option>
              <option value="resell">Resell</option>
              <option value="repair">Refurbished</option>
            </select>
          </label>
          <label className={styles.label}>Eco-Impact:
            <select className={styles.select} name="eco" value={filters.eco} onChange={handleFilterChange}>
              <option value="">Any</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <button className={styles.button} type="submit">Apply Filters</button>
        </form>
      </section>
      <section className={styles.section}>
        <h2>Available Products</h2>
        <div className={styles.productList}>
          <div 
            className={`${styles.productGrid} ${isAnimating ? styles.flash : ''}`}
            onAnimationEnd={() => setIsAnimating(false)}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, idx) => {
                const price = (item.price || (Math.random() * 100 + 20)).toFixed(2);
                const ecoImpact = item.ecoImpact || ['high', 'medium', 'low'][Math.floor(Math.random()*3)];
                return (
                  <div className={styles.productCard} key={idx} tabIndex={0}>
                    <img className={styles.productImage} src={item.image} alt={item.name} />
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{item.name}</h3>
                      <div className={styles.productDetails}>
                        <p><strong>Category:</strong> {item.category}</p>
                        <p><strong>Condition:</strong> {item.status === 'Resell' ? 'Like New' : 'Refurbished'}</p>
                        <div>
                          <strong>Eco-Impact:</strong> {getEcoIcon(ecoImpact)} {ecoImpact.charAt(0).toUpperCase() + ecoImpact.slice(1)}
                        </div>
                      </div>
                      <p className={styles.productPrice}>${price}</p>
                    </div>
                    <div className={`${styles.trust} ${styles.fadeIn}`}>{getTrustIcon(item.status)}</div>
                  </div>
                );
              })
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 
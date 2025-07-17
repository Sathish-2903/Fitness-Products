import React from 'react';
import { useCart } from '../contexts/CartContext';

function About() {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = React.useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'quick-add-success';
    successMessage.innerHTML = `✅ ${product.name} added to cart!`;
    successMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #4CAF50, #45a049);
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      z-index: 10000;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(76, 175, 80, 0.3);
      animation: quickAddPop 0.5s ease-out;
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
      setAddedToCart(null);
      successMessage.remove();
    }, 2000);
  };

  const recommendedProducts = [
    {
      id: 101,
      name: 'Starter Gym Kit',
      price: '₹15,999',
      image: '🎽',
      description: 'Perfect starter kit for home workouts',
      category: 'Bundle'
    },
    {
      id: 102,
      name: 'Fitness Tracker',
      price: '₹8,999',
      image: '⌚',
      description: 'Track your progress with smart fitness watch',
      category: 'Tech'
    },
    {
      id: 103,
      name: 'Premium Water Bottle',
      price: '₹1,299',
      image: '💧',
      description: 'Insulated water bottle with measurement marks',
      category: 'Accessories'
    }
  ];

  const ourProducts = [
    {
      id: 301,
      name: 'Professional Dumbbells',
      price: '₹18,999',
      image: '🏋️‍♂️',
      description: 'Heavy-duty adjustable dumbbells for serious training',
      category: 'Weights'
    },
    {
      id: 302,
      name: 'Smart Treadmill',
      price: '₹95,999',
      image: '🏃‍♂️',
      description: 'AI-powered treadmill with personalized workouts',
      category: 'Cardio'
    },
    {
      id: 303,
      name: 'Yoga Master Set',
      price: '₹3,299',
      image: '🧘‍♀️',
      description: 'Complete yoga set with mat, blocks, and strap',
      category: 'Yoga'
    },
    {
      id: 304,
      name: 'Protein Power Pack',
      price: '₹6,999',
      image: '🥤',
      description: 'Premium whey protein with vitamins and minerals',
      category: 'Supplements'
    },
    {
      id: 305,
      name: 'Resistance Training Kit',
      price: '₹4,499',
      image: '💪',
      description: 'Complete resistance bands set with workout guide',
      category: 'Accessories'
    },
    {
      id: 306,
      name: 'Recovery Massage Gun',
      price: '₹12,999',
      image: '🔫',
      description: 'Professional percussion therapy device',
      category: 'Recovery'
    }
  ];
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <h1>About Fitness Products</h1>
          <p className="hero-subtitle">Your trusted partner in fitness journey</p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <div className="section-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, Fitness Products has been dedicated to providing high-quality 
                fitness equipment and supplements to help people achieve their health and wellness goals. 
                We believe that everyone deserves access to premium fitness gear that can transform 
                their lives.
              </p>
              <p>
                Our team consists of fitness enthusiasts, personal trainers, and wellness experts 
                who carefully curate every product in our catalog. We test each item to ensure it 
                meets our strict standards for quality, durability, and effectiveness.
              </p>
            </div>
            <div className="section-image">
              <span className="about-emoji">🏋️‍♀️</span>
            </div>
          </div>

          <div className="about-section reverse">
            <div className="section-image">
              <span className="about-emoji">🎯</span>
            </div>
            <div className="section-content">
              <h2>Our Mission</h2>
              <p>
                To make fitness accessible and enjoyable for everyone by providing top-quality 
                equipment, expert guidance, and exceptional customer service. We're committed to 
                supporting your fitness journey every step of the way.
              </p>
              <ul className="mission-list">
                <li>Provide premium quality fitness equipment</li>
                <li>Offer competitive prices with excellent value</li>
                <li>Deliver exceptional customer service</li>
                <li>Support fitness education and wellness</li>
              </ul>
            </div>
          </div>

          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <span className="value-icon">💪</span>
                <h3>Quality First</h3>
                <p>We never compromise on quality. Every product is tested and verified.</p>
              </div>
              <div className="value-card">
                <span className="value-icon">❤️</span>
                <h3>Customer Care</h3>
                <p>Your satisfaction is our priority. We're here to help you succeed.</p>
              </div>
              <div className="value-card">
                <span className="value-icon">🌱</span>
                <h3>Sustainability</h3>
                <p>We're committed to eco-friendly practices and sustainable products.</p>
              </div>
              <div className="value-card">
                <span className="value-icon">🤝</span>
                <h3>Community</h3>
                <p>Building a supportive community of fitness enthusiasts worldwide.</p>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h2>Our Impact</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">1,25,000+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">750+</span>
                <span className="stat-label">Premium Products</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">98.5%</span>
                <span className="stat-label">Customer Satisfaction</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Customer Support</span>
              </div>
            </div>
          </div>

          <div className="team-section">
            <h2>Meet Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">👨‍💼</div>
                <h3>Rajesh Kumar</h3>
                <p className="member-role">CEO & Founder</p>
                <p>Former national athlete with 15+ years in fitness industry</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👩‍⚕️</div>
                <h3>Priya Sharma</h3>
                <p className="member-role">Head of Product</p>
                <p>Sports scientist and certified nutrition specialist</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍🔬</div>
                <h3>Vikram Singh</h3>
                <p className="member-role">Quality Assurance</p>
                <p>Equipment testing and safety certification expert</p>
              </div>
            </div>
          </div>

          {/* Our Products Section */}
          <div className="our-products-section">
            <h2>Our Products</h2>
            <p className="section-subtitle">Explore our premium fitness equipment and supplements</p>
            <div className="our-products-grid">
              {ourProducts.map(product => (
                <div key={product.id} className="our-product-card">
                  <div className="our-product-header">
                    <div className="our-product-emoji">{product.image}</div>
                    <span className="our-product-category">{product.category}</span>
                  </div>
                  <div className="our-product-info">
                    <h3>{product.name}</h3>
                    <p className="our-product-description">{product.description}</p>
                    <div className="our-product-footer">
                      <span className="our-product-price">{product.price}</span>
                      <button 
                        className={`our-product-add-btn ${addedToCart === product.id ? 'added' : ''}`}
                        onClick={() => handleAddToCart(product)}
                      >
                        {addedToCart === product.id ? '✓ Added!' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Products Section */}
          <div className="recommended-section">
            <h2>Recommended for You</h2>
            <p className="section-subtitle">Handpicked products to start your fitness journey</p>
            <div className="recommended-grid">
              {recommendedProducts.map(product => (
                <div key={product.id} className="recommended-card">
                  <div className="recommended-emoji">{product.image}</div>
                  <h3>{product.name}</h3>
                  <p className="recommended-description">{product.description}</p>
                  <div className="recommended-footer">
                    <span className="recommended-price">{product.price}</span>
                    <button 
                      className={`recommended-add-btn ${addedToCart === product.id ? 'added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedToCart === product.id ? '✓ Added!' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

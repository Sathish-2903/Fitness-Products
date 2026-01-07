import React from 'react';
import { useCart } from '../contexts/CartContext';

function Home() {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = React.useState(null);

  const handleShopNow = () => {
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
      // Add a brief highlight effect to the products section
      productsSection.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%)';
      productsSection.style.transition = 'all 0.8s ease';
      
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });

      // Reset the background after animation
      setTimeout(() => {
        productsSection.style.background = '';
      }, 2000);
    }
  };

  const handleAddToCartQuick = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    
    // Enhanced add to cart success message
    const successMessage = document.createElement('div');
    successMessage.className = 'add-to-cart-success';
    successMessage.innerHTML = `
      <div class="cart-success-content">
        <span class="cart-success-emoji">🛒</span>
        <div class="cart-success-text">
          <strong>Added to Cart!</strong>
          <p>${product.name} - ${product.price}</p>
        </div>
      </div>
    `;
    successMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #FF6B35, #FF8E35);
      color: white;
      padding: 25px;
      border-radius: 20px;
      z-index: 10000;
      font-weight: 600;
      box-shadow: 0 20px 40px rgba(255, 107, 53, 0.4);
      animation: addToCartPop 0.6s ease-out;
      text-align: center;
      border: 3px solid rgba(255,255,255,0.3);
      min-width: 300px;
    `;
    
    document.body.appendChild(successMessage);
    
    // Add floating cart icon animation
    const floatingIcon = document.createElement('div');
    floatingIcon.innerHTML = '🛒';
    floatingIcon.style.cssText = `
      position: fixed;
      font-size: 2rem;
      z-index: 10001;
      pointer-events: none;
      animation: floatToCart 1.5s ease-out forwards;
      top: 50%;
      left: 50%;
    `;
    document.body.appendChild(floatingIcon);
    
    setTimeout(() => {
      setAddedToCart(null);
      successMessage.remove();
      floatingIcon.remove();
    }, 2000);
  };
  const products = [
    {
      id: 1,
      name: 'Adjustable Dumbbells',
      price: '₹4,999',
      image: '🏋️‍♂️',
      description: 'Professional adjustable dumbbells for home workouts',
      category: 'Weights'
    },
    {
      id: 2,
      name: 'Yoga Mat Premium',
      price: '₹699',
      image: '🧘‍♀️',
      description: 'High-quality non-slip yoga mat',
      category: 'Yoga'
    },
    {
      id: 3,
      name: 'Resistance Bands Set',
      price: '₹499',
      image: '💪',
      description: 'Complete resistance bands set with handles',
      category: 'Accessories'
    },
    {
      id: 4,
      name: 'Treadmill Pro',
      price: '₹30,000',
      image: '🏃‍♂️',
      description: 'Professional treadmill with digital display',
      category: 'Cardio'
    },
    {
      id: 5,
      name: 'Kettlebell Set',
      price: '₹2,999',
      image: '⚡',
      description: 'Cast iron kettlebell set (7kg, 11kg, 16kg)',
      category: 'Weights'
    },
    {
      id: 6,
      name: 'Pull-up Bar',
      price: '₹1,499',
      image: '🏗️',
      description: 'Doorway pull-up bar with multiple grips',
      category: 'Accessories'
    },
    {
      id: 7,
      name: 'Exercise Bike',
      price: '₹25,000',
      image: '🚴‍♀️',
      description: 'Stationary exercise bike with heart rate monitor',
      category: 'Cardio'
    },
    {
      id: 8,
      name: 'Foam Roller',
      price: '₹399',
      image: '🔧',
      description: 'High-density foam roller for muscle recovery',
      category: 'Recovery'
    },
    {
      id: 9,
      name: 'Whey Protein Powder',
      price: '₹999',
      image: '🥤',
      description: 'Whey protein powder for muscle building (2kg)',
      category: 'Supplements'
    },
    {
      id: 10,
      name: 'Weight Plates Set',
      price: '₹499',
      image: '⚙️',
      description: 'Olympic weight plates set (5kg, 10kg, 15kg, 20kg)',
      category: 'Weights'
    },
    {
      id: 11,
      name: 'Yoga Blocks',
      price: '₹499',
      image: '🧱',
      description: 'High-density foam yoga blocks for support',
      category: 'Yoga'
    },
    {
      id: 12,
      name: 'Rowing Machine',
      price: '₹24,999',
      image: '🚣‍♂️',
      description: 'Magnetic resistance rowing machine',
      category: 'Cardio'
    },
    {
      id: 13,
      name: 'Medicine Ball',
      price: '₹999',
      image: '⚽',
      description: 'Slam ball for functional training (8kg)',
      category: 'Functional'
    },
    {
      id: 14,
      name: 'Gym Gloves',
      price: '₹499',
      image: '🧤',
      description: 'Premium leather gym gloves with wrist support',
      category: 'Accessories'
    },
    {
      id: 15,
      name: 'Protein Shaker',
      price: '₹599',
      image: '🫙',
      description: 'BPA-free protein shaker with mixing ball',
      category: 'Accessories'
    },
    {
      id: 16,
      name: 'Pre-Workout Supplement',
      price: '₹999',
      image: '⚡',
      description: 'Energy boost pre-workout supplement',
      category: 'Supplements'
    },
    {
      id: 17,
      name: 'Olympic Barbell',
      price: '₹4,999',
      image: '🏋️',
      description: '20kg Olympic barbell with diamond knurling',
      category: 'Weights'
    },
    {
      id: 18,
      name: 'Battle Ropes',
      price: '₹499',
      image: '🪢',
      description: 'Heavy duty battle ropes for HIIT training',
      category: 'Functional'
    },
    {
      id: 19,
      name: 'Yoga Strap',
      price: '₹499',
      image: '🪢',
      description: 'Cotton yoga strap for flexibility training',
      category: 'Yoga'
    },
    {
      id: 20,
      name: 'Creatine Supplement',
      price: '₹1,000',
      image: '💊',
      description: 'Pure creatine monohydrate for strength',
      category: 'Supplements'
    },
    {
      id: 21,
      name: 'Elliptical Machine',
      price: '₹49,999',
      image: '🏃‍♀️',
      description: 'Cross-trainer elliptical with LCD display',
      category: 'Cardio'
    },
    {
      id: 22,
      name: 'Ab Wheel',
      price: '₹399',
      image: '⭕',
      description: 'Double wheel ab roller for core strengthening',
      category: 'Functional'
    },
    {
      id: 23,
      name: 'Massage Gun',
      price: '₹999',
      image: '🔫',
      description: 'Percussion massage gun for muscle recovery',
      category: 'Recovery'
    },
    {
      id: 24,
      name: 'Power Rack',
      price: '₹245,999',
      image: '🏗️',
      description: 'Heavy-duty power rack with safety bars',
      category: 'Weights'
    }
  ];

  const categories = ['All', 'Weights', 'Cardio', 'Yoga', 'Accessories', 'Recovery', 'Supplements', 'Functional'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Transform Your Fitness Journey</h1>
          <p>Discover premium fitness equipment and supplements to achieve your goals</p>
          <button className="cta-button" onClick={handleShopNow}>Shop Now</button>
        </div>
        <div className="hero-image">
          <span className="hero-emoji">🏋️‍♂️</span>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="featured-section">
        <div className="container">
          <h2>Featured Products</h2>
          <p className="featured-subtitle">Most popular items this month</p>
          <div className="featured-grid">
            {products.slice(0, 4).map(product => (
              <div key={product.id} className="featured-card">
                <div className="featured-emoji">{product.image}</div>
                <h3>{product.name}</h3>
                <p className="featured-price">{product.price}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCartQuick(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="products-section">
        <div className="container">
          <h2>Our Products</h2>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <span className="product-emoji">{product.image}</span>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button 
                      className={`add-to-cart-btn ${addedToCart === product.id ? 'added' : ''}`}
                      onClick={() => handleAddToCartQuick(product)}
                    >
                      {addedToCart === product.id ? '✓ Added!' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🚚</span>
              <h3>Free Shipping</h3>
              <p>Free delivery on orders over ₹8,299</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🏆</span>
              <h3>Premium Quality</h3>
              <p>Top-rated fitness equipment</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💬</span>
              <h3>24/7 Support</h3>
              <p>Expert customer service</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3>Secure Payment</h3>
              <p>Safe and secure transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

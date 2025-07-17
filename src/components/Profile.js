import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { updateProfile, updatePassword, onAuthStateChanged } from 'firebase/auth';
import { useCart } from '../contexts/CartContext';

function Profile() {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    phone: '',
    address: '',
    fitnessGoals: '',
    experience: 'beginner'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFormData(prev => ({
          ...prev,
          displayName: currentUser.displayName || '',
          email: currentUser.email || ''
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Update display name
      if (formData.displayName !== user.displayName) {
        await updateProfile(user, {
          displayName: formData.displayName
        });
      }

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.newPassword.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        await updatePassword(user, formData.newPassword);
      }

      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'profile-add-success';
    successMessage.innerHTML = `✅ ${product.name} added to cart!`;
    successMessage.style.cssText = `
      position: fixed;
      top: 20%;
      right: 20px;
      background: linear-gradient(135deg, #4CAF50, #45a049);
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      z-index: 10000;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(76, 175, 80, 0.3);
      animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
      setAddedToCart(null);
      successMessage.remove();
    }, 2000);
  };

  const personalizedProducts = [
    {
      id: 201,
      name: 'Beginner Workout Plan',
      price: '₹2,999',
      image: '📋',
      description: 'Customized workout plan for beginners',
      category: 'Training'
    },
    {
      id: 202,
      name: 'Nutrition Guide',
      price: '₹1,999',
      image: '🥗',
      description: 'Personalized nutrition and diet plan',
      category: 'Nutrition'
    }
  ];

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading-message">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" />
            ) : (
              <div className="avatar-placeholder">
                {(user.displayName || user.email).charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1>{user.displayName || 'User'}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-joined">
              Member since {new Date(user.metadata.creationTime).toLocaleDateString()}
            </p>
          </div>
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="profile-content">
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-section">
              <h2>Personal Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="displayName">Display Name</label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled={true}
                    className="form-input disabled"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Fitness Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="experience">Fitness Experience</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="fitnessGoals">Fitness Goals</label>
                <textarea
                  id="fitnessGoals"
                  name="fitnessGoals"
                  value={formData.fitnessGoals}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Describe your fitness goals..."
                  className="form-textarea"
                  rows="4"
                />
              </div>
            </div>

            {isEditing && (
              <div className="form-section">
                <h2>Change Password</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password (optional)"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`save-btn ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>

          <div className="profile-stats">
            <h2>Your Activity</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">🛒</span>
                <span className="stat-number">18</span>
                <span className="stat-label">Orders Placed</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">💰</span>
                <span className="stat-number">₹1,03,450</span>
                <span className="stat-label">Total Spent</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⭐</span>
                <span className="stat-number">12</span>
                <span className="stat-label">Reviews Given</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🏆</span>
                <span className="stat-number">Platinum</span>
                <span className="stat-label">Member Status</span>
              </div>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="personalized-section">
            <div className="container">
              <h2>Recommended for You</h2>
              <p className="section-subtitle">Based on your fitness goals and preferences</p>
              <div className="personalized-grid">
                {personalizedProducts.map(product => (
                  <div key={product.id} className="personalized-card">
                    <div className="personalized-emoji">{product.image}</div>
                    <h3>{product.name}</h3>
                    <p className="personalized-description">{product.description}</p>
                    <div className="personalized-footer">
                      <span className="personalized-price">{product.price}</span>
                      <button 
                        className={`personalized-add-btn ${addedToCart === product.id ? 'added' : ''}`}
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
    </div>
  );
}

export default Profile;

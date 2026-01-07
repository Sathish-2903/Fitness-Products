import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Payment() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handlePayNow = () => {
    const upiId = process.env.REACT_APP_UPI_ID || 'sathishprathash50@okhdfcbank';
    const upiName = process.env.REACT_APP_UPI_NAME || 'Fitness Products';

    if (!upiId) {
      alert('UPI ID is not configured. Please set REACT_APP_UPI_ID in your .env file.');
      return;
    }

    const amount = getCartTotal().toFixed(2);
    const note = 'Fitness Products order';

    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
      upiName
    )}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(note)}`;

    window.location.href = upiUrl;
  };

  const handleCancel = () => {
    navigate('/home');
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <h2>Your cart is empty</h2>
          <button className="primary-btn" onClick={() => navigate('/home')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Checkout</h2>
        <p className="payment-subtitle">Review your items and proceed to secure payment.</p>

        <div className="payment-items">
          {cartItems.map((item) => (
            <div key={item.id} className="payment-item">
              <div className="payment-item-info">
                <span className="item-emoji">{item.image}</span>
                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="payment-item-price">
                {item.price}
              </div>
            </div>
          ))}
        </div>

        <div className="payment-summary">
          <div className="payment-total-row">
            <span>Total Amount</span>
            <strong>{formatPrice(getCartTotal())}</strong>
          </div>
          <p className="payment-note">
            You will be redirected to a secure payment page to complete your purchase.
          </p>
        </div>

        <div className="payment-actions">
          <button className="secondary-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="primary-btn" onClick={handlePayNow}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;

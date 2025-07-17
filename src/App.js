import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { CartProvider } from './contexts/CartContext';
import './App.css';

// Components
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Cart from './components/Cart';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <span className="spinner-icon">💪</span>
          <p>Loading Fitness Products...</p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="App">
          {user && <Header />}
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={user ? <Navigate to="/home" /> : <Login />} 
              />
              <Route 
                path="/home" 
                element={user ? <Home /> : <Navigate to="/" />} 
              />
              <Route 
                path="/about" 
                element={user ? <About /> : <Navigate to="/" />} 
              />
              <Route 
                path="/profile" 
                element={user ? <Profile /> : <Navigate to="/" />} 
              />
            </Routes>
          </main>
          {user && <Cart />}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

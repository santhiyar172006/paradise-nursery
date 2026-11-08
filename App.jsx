import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductList, { Navbar } from './components/ProductList.jsx';
import CartItem from './components/CartItem.jsx';
import AboutUs from './components/AboutUs.jsx';

function LandingPage() {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <main className="landing-page">
      <div className="landing-shade" />
      <header className="landing-topbar">
        <div className="brand brand-light">🌿 Paradise Nursery</div>
        <button className="text-link light-link" onClick={() => setShowAbout(!showAbout)}>
          {showAbout ? 'Welcome' : 'About Us'}
        </button>
      </header>
      <section className="hero-content">
        {showAbout ? <AboutUs compact /> : (
          <>
            <p className="eyebrow">GROW A LITTLE HAPPINESS</p>
            <h1>Bring nature<br />home.</h1>
            <p className="hero-copy">Find your perfect plant and make every corner feel alive.</p>
            <button className="primary-button hero-button" onClick={() => navigate('/plants')}>Get Started <span>→</span></button>
          </>
        )}
      </section>
      <footer className="landing-footer">A little green goes a long way.</footer>
    </main>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plants" element={<><Navbar /><ProductList /></>} />
        <Route path="/cart" element={<><Navbar /><CartItem /></>} />
        <Route path="/about" element={<><Navbar /><AboutUs /></>} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, Shield, Zap } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background decoration */}
      <div className="hero-bg">
        <div className="hero-blob hero-blob-primary" />
        <div className="hero-blob hero-blob-accent" />
      </div>

      <div className="container">
        <div className="hero-grid">
          {/* Left content */}
          <motion.div 
            className="hero-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge">
              <Zap size={16} />
              <span>Smart Lost & Found Solution</span>
            </div>

            <h1 className="hero-title">
              Never Lose What
              <br />
              <span className="text-gradient">Matters Most</span>
            </h1>

            <p className="hero-lead">
              Protect your valuables with dynamic QR stickers. When someone finds your item, they can instantly contact you while your privacy stays protected.
            </p>

            <div className="hero-actions">
              <Link to="/auth?mode=register" className="btn btn-primary">Get Started Free</Link>
              <Link to="/how-it-works" className="btn btn-outline">See How It Works</Link>
            </div>

            <div className="hero-features">
              <div className="hero-feature-item"><Shield size={18} /> <span>Privacy Protected</span></div>
              <div className="hero-feature-item"><QrCode size={18} /> <span>Dynamic QR Codes</span></div>
            </div>
          </motion.div>

          {/* Right content - Interactive QR display */}
          <motion.div 
            className="qr-card-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="qr-card-main">
              <p className="text-muted text-sm mb-2">Sample QR Sticker</p>
              <h3 className="font-bold mb-4">MacBook Pro 14"</h3>

              <div className="qr-code-wrapper">
                <QRCodeSVG value="https://lostfoundqr.com/s/DEMO1234" size={200} level="H" includeMargin />
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted mb-2">Scan to see finder view</p>
                <div className="status-badge">
                  <span className="status-dot"/>Active
                </div>
              </div>
            </div>

            <motion.div 
              className="floating-card top-right animate-float"
              style={{ animationDelay: "0s" }}
            >
              <div className="floating-icon"><Shield size={20} /></div>
              <div className="floating-text">
                <span>Privacy</span>
                <h4>Protected</h4>
              </div>
            </motion.div>

            <motion.div 
              className="floating-card bottom-left animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="floating-icon"><Zap size={20} /></div>
              <div className="floating-text">
                <span>Instant</span>
                <h4>Contact</h4>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

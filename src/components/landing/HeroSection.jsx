import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, Shield, Zap, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="site-container hero-inner">
        <div className="hero-grid">
          {/* Left content */}
          <motion.div 
            className="hero-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="badge">
              <Zap />
              <span>Smart Lost & Found Solution</span>
            </div>

            <h1 className="hero-title">
              Never Lose What
              <br />
              <span className="hero-title-accent">Matters Most</span>
            </h1>

            <p className="hero-lead">
              Protect your valuables with dynamic QR stickers. When someone finds your item, they can instantly contact you while your privacy stays protected.
            </p>

            <div className="hero-ctas">
              <a href="/auth?mode=register" className="btn-hero">Get Started Free</a>
              <a href="/how-it-works" className="btn-outline">See How It Works</a>
            </div>

            <div className="hero-features">
              <div className="hero-feature"><Shield /> <span>Privacy Protected</span></div>
              <div className="hero-feature"><QrCode /> <span>Dynamic QR Codes</span></div>
            </div>
          </motion.div>

          {/* Right content - Interactive QR display */}
          <motion.div 
            className="hero-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="qr-card">
              <div className="qr-main">
                <p className="qr-label">Sample QR Sticker</p>
                <h3 className="qr-title">MacBook Pro 14"</h3>

                <div className="qr-image">
                  <QRCodeSVG value="https://lostfoundqr.com/s/DEMO1234" size={200} level="H" includeMargin />
                </div>

                <div className="qr-status">
                  <p className="qr-sub">Scan to see finder view</p>
                  <div className="status-pill"><span className="status-dot"/>Active</div>
                </div>
              </div>

              <motion.div className="floating floating-top">
                <div className="floating-inner">
                  <div className="floating-badge"><Shield /></div>
                  <div>
                    <p className="floating-sub">Privacy</p>
                    <p className="floating-title">Protected</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="floating floating-bottom">
                <div className="floating-inner">
                  <div className="floating-badge"><Zap /></div>
                  <div>
                    <p className="floating-sub">Instant</p>
                    <p className="floating-title">Contact</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

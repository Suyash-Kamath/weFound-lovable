import { Link } from "react-router-dom";
import { QrCode, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand-link">
              <div className="logo-badge small"><QrCode /></div>
              <span className="brand-name">Lost<span className="brand-accent">Found</span>QR</span>
            </Link>
            <p className="brand-desc">Smart QR stickers that help reunite lost items with their owners. Simple, secure, and effective.</p>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/enterprise">Enterprise</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="contact-list">
              <li><Mail /> <a href="mailto:support@lostfoundqr.com">support@lostfoundqr.com</a></li>
              <li><Phone /> <span>+1 (555) 123-4567</span></li>
              <li><MapPin /> <span>123 Innovation Street,<br/>Tech City, TC 12345</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} LostFoundQR. All rights reserved.</p>
          <div className="footer-links"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link></div>
        </div>
      </div>
    </footer>
  );
}

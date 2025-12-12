import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-bg" />

      <div className="site-container">
        <motion.div className="cta-inner" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="cta-badge"><Sparkles /> <span>Start Protecting Today</span></div>

          <h2 className="cta-title">Ready to Never Lose<br /><span>Your Valuables Again?</span></h2>

          <p className="cta-lead">Join thousands of smart users who protect their belongings with LostFoundQR. Get started in minutes, free forever for up to 3 items.</p>

          <div className="cta-actions">
            <a href="/auth?mode=register" className="btn-hero">Create Free Account</a>
            <a href="/pricing" className="btn-outline">View Pricing</a>
          </div>

          <p className="cta-note">No credit card required • 3 free stickers included • Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}

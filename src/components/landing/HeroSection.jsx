import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, Shield, Zap, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Smart Lost & Found Solution</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Never Lose What
              <br />
              <span className="text-gradient">Matters Most</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Protect your valuables with dynamic QR stickers. When someone finds your item, 
              they can instantly contact you while your privacy stays protected.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?mode=register">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Dynamic QR Codes</span>
              </div>
            </div>
          </motion.div>

          {/* Right content - Interactive QR display */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative mx-auto w-fit">
              {/* Main card */}
              <div className="bg-card rounded-3xl p-8 shadow-xl border border-border relative z-10">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Sample QR Sticker</p>
                  <h3 className="font-semibold text-lg">MacBook Pro 14"</h3>
                </div>
                
                <div className="bg-background rounded-2xl p-6 mb-6">
                  <QRCodeSVG 
                    value="https://lostfoundqr.com/s/DEMO1234"
                    size={200}
                    level="H"
                    includeMargin
                    className="mx-auto"
                  />
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Scan to see finder view</p>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-primary">Active</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-lg border border-border"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Privacy</p>
                    <p className="font-semibold text-sm">Protected</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-lg border border-border"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Instant</p>
                    <p className="font-semibold text-sm">Contact</p>
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

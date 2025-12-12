import { motion } from "framer-motion";
import { Package, QrCode, ScanLine, MessageCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Package,
    title: "Get Your Stickers",
    description: "Order our premium QR stickers. Each one comes with a unique, dynamic code ready to be activated.",
  },
  {
    step: "02",
    icon: QrCode,
    title: "Link to Your Items",
    description: "Scan or enter the sticker code to link it to any item. Add photos, description, and set your contact preferences.",
  },
  {
    step: "03",
    icon: ScanLine,
    title: "Someone Finds It",
    description: "When a finder scans the QR, they see a landing page with your item details and approved contact options.",
  },
  {
    step: "04",
    icon: MessageCircle,
    title: "Get Reunited",
    description: "Chat securely, arrange pickup or delivery, and get your item back. Optionally tip your helper!",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Four simple steps to protect your valuables and recover them when lost.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25 relative z-10">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shadow-md">
                    {step.step}
                  </div>
                </div>

                <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
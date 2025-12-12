import { motion } from "framer-motion";
import { 
  QrCode, 
  Shield, 
  MessageSquare, 
  Truck, 
  BarChart3, 
  Smartphone,
  Clock,
  Globe
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "Dynamic QR Codes",
    description: "One sticker, unlimited possibilities. Change which item it's linked to anytime without needing a new sticker.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Control exactly what contact info finders can see. Keep your personal details hidden while staying reachable.",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description: "Built-in chat system lets finders contact you without exposing your phone number or email.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Truck,
    title: "Easy Delivery",
    description: "Can't pick up your item? Arrange secure courier pickup with our integrated Shiprocket service.",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: BarChart3,
    title: "Scan Analytics",
    description: "Track every scan with detailed info including time, location, and device. Know your item's journey.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Beautiful finder experience on any device. Finders can reach you in seconds with just a tap.",
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    icon: Clock,
    title: "Instant Notifications",
    description: "Get alerted the moment someone scans your QR. Never miss a chance to recover your item.",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Globe,
    title: "Works Worldwide",
    description: "Whether you lose something locally or abroad, our system works anywhere in the world.",
    color: "bg-amber-500/10 text-amber-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <br />
            <span className="text-gradient">Protect Your Belongings</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Our comprehensive platform makes it easy to tag, track, and recover your valuables.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
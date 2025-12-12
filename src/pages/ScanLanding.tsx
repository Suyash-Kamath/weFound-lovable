import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useItemStore } from "@/stores/itemStore";
import { QrCode, Phone, MessageCircle, Mail, MapPin, Package, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ScanLanding() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const { getItemBySticker, stickers, recordScan } = useItemStore();

  const sticker = stickers.find((s) => s.shortCode === shortCode);
  const item = shortCode ? getItemBySticker(shortCode) : undefined;

  useEffect(() => {
    if (sticker) {
      recordScan(sticker.id, {
        browser: navigator.userAgent.includes("Chrome") ? "Chrome" : navigator.userAgent.includes("Safari") ? "Safari" : "Other",
        os: navigator.platform,
      });
    }
  }, [sticker]);

  if (!sticker || sticker.status !== "active" || !item) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-8">
            <QrCode className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Item Not Found</h1>
            <p className="text-muted-foreground">This QR code is not linked to any item or has been deactivated.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Found Item</span>
            </div>
            <h1 className="text-2xl font-bold">You Found Someone's {item.category}!</h1>
            <p className="text-muted-foreground">Help reunite this item with its owner</p>
          </div>

          {/* Item Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center">
                  <Package className="w-10 h-10 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-muted-foreground">{item.category}</p>
                </div>
              </div>
              {item.description && <p className="text-sm text-muted-foreground mb-4">{item.description}</p>}
              {item.returnInstructions && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-sm font-medium text-primary mb-1">Return Instructions</p>
                  <p className="text-sm">{item.returnInstructions}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Options */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Contact the Owner</h3>
              <div className="space-y-3">
                {item.contactOptions.showWhatsApp && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`https://wa.me/${item.contactOptions.whatsAppNumber?.replace(/\D/g, "")}`} target="_blank">
                      <MessageCircle className="w-5 h-5 mr-3 text-green-500" />WhatsApp
                    </a>
                  </Button>
                )}
                {item.contactOptions.showCall && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`tel:${item.contactOptions.phoneNumber}`}>
                      <Phone className="w-5 h-5 mr-3 text-blue-500" />Call Owner
                    </a>
                  </Button>
                )}
                {item.contactOptions.showEmail && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`mailto:${item.contactOptions.email}?subject=Found your ${item.name}`}>
                      <Mail className="w-5 h-5 mr-3 text-orange-500" />Send Email
                    </a>
                  </Button>
                )}
                {item.contactOptions.showInAppChat && (
                  <Button variant="default" className="w-full justify-start">
                    <MessageCircle className="w-5 h-5 mr-3" />Chat In-App
                  </Button>
                )}
                <Button variant="accent" className="w-full justify-start">
                  <Truck className="w-5 h-5 mr-3" />Arrange Delivery
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Powered by <span className="font-semibold">LostFoundQR</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import { useAuthStore } from "@/stores/authStore";
import { useItemStore } from "@/stores/itemStore";
import { ITEM_CATEGORIES, ContactOptions } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Package } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewItem() {
  const [searchParams] = useSearchParams();
  const stickerId = searchParams.get("sticker");
  const { user } = useAuthStore();
  const { addItem, stickers, mapStickerToItem, generateSticker } = useItemStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [returnInstructions, setReturnInstructions] = useState("");
  const [contactOptions, setContactOptions] = useState<ContactOptions>({
    showWhatsApp: true,
    showCall: true,
    showSms: false,
    showEmail: true,
    showInAppChat: true,
    whatsAppNumber: user?.phone || "",
    phoneNumber: user?.phone || "",
    email: user?.email || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    let finalStickerId = stickerId;
    if (!finalStickerId) {
      const newSticker = generateSticker(user.id);
      finalStickerId = newSticker.id;
    }

    const item = addItem({
      name,
      description,
      category,
      photos: [],
      estimatedValue: estimatedValue ? parseFloat(estimatedValue) : undefined,
      stickerId: finalStickerId,
      userId: user.id,
      contactOptions,
      returnInstructions,
    });

    mapStickerToItem(finalStickerId, item.id);

    toast({
      title: "Item created!",
      description: "Your item has been registered with a QR code.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/dashboard"><ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard</Link>
          </Button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
              <Package className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Add New Item</h1>
              <p className="text-muted-foreground">Register an item with a QR sticker</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Item Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. MacBook Pro" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {ITEM_CATEGORIES.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add any identifying details..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Estimated Value ($)</Label>
                  <Input id="value" type="number" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} placeholder="0.00" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Contact Options</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "showWhatsApp", label: "WhatsApp" },
                  { key: "showCall", label: "Phone Call" },
                  { key: "showEmail", label: "Email" },
                  { key: "showInAppChat", label: "In-App Chat" },
                ].map((opt) => (
                  <div key={opt.key} className="flex items-center justify-between">
                    <Label>{opt.label}</Label>
                    <Switch checked={contactOptions[opt.key as keyof ContactOptions] as boolean} onCheckedChange={(v) => setContactOptions({ ...contactOptions, [opt.key]: v })} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full">
              <Save className="w-4 h-4 mr-2" />Create Item & Generate QR
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

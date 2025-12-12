import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { useAuthStore } from "@/stores/authStore";
import { useItemStore } from "@/stores/itemStore";
import { Item, Sticker } from "@/types";
import {
  Plus,
  QrCode,
  Package,
  Eye,
  Trash2,
  Edit,
  BarChart3,
  Settings,
  Copy,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const { items, stickers, scans, generateSticker, getScansBySticker } = useItemStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const userItems = items.filter((item) => item.userId === user?.id);
  const userStickers = stickers.filter((sticker) => sticker.userId === user?.id);
  const totalScans = userStickers.reduce(
    (acc, sticker) => acc + getScansBySticker(sticker.id).length,
    0
  );

  const handleGenerateSticker = () => {
    if (!user) return;
    const sticker = generateSticker(user.id);
    toast({
      title: "Sticker generated!",
      description: `Your sticker code is ${sticker.shortCode}`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const getItemForSticker = (stickerId: string): Item | undefined => {
    const sticker = stickers.find((s) => s.id === stickerId);
    if (!sticker?.itemId) return undefined;
    return items.find((i) => i.id === sticker.itemId);
  };

  const stats = [
    {
      label: "Active Items",
      value: userItems.length,
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "QR Stickers",
      value: userStickers.length,
      icon: QrCode,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Total Scans",
      value: totalScans,
      icon: Eye,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Recovery Rate",
      value: "100%",
      icon: BarChart3,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-gradient">{user.name}</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your items and QR stickers from your dashboard.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button asChild>
            <Link to="/items/new">
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Link>
          </Button>
          <Button variant="outline" onClick={handleGenerateSticker}>
            <QrCode className="w-4 h-4 mr-2" />
            Generate Sticker
          </Button>
        </motion.div>

        {/* Items & Stickers Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Your Items
                </CardTitle>
                <CardDescription>
                  Items you've registered with QR stickers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">No items yet. Add your first item!</p>
                    <Button asChild size="sm">
                      <Link to="/items/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-16 h-16 rounded-lg bg-background flex items-center justify-center overflow-hidden">
                          {item.photos[0] ? (
                            <img
                              src={item.photos[0]}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-8 h-8 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {item.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/items/${item.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/s/${stickers.find(s => s.itemId === item.id)?.shortCode || ''}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Stickers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-accent" />
                  Your QR Stickers
                </CardTitle>
                <CardDescription>
                  Manage and view your QR codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userStickers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <QrCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">No stickers yet. Generate your first one!</p>
                    <Button size="sm" onClick={handleGenerateSticker}>
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate Sticker
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userStickers.map((sticker) => {
                      const item = getItemForSticker(sticker.id);
                      const scanCount = getScansBySticker(sticker.id).length;
                      
                      return (
                        <Dialog key={sticker.id}>
                          <DialogTrigger asChild>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                              <div className="w-16 h-16 rounded-lg bg-background p-2">
                                <QRCodeSVG
                                  value={`${window.location.origin}/s/${sticker.shortCode}`}
                                  size={48}
                                  level="M"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-mono font-medium">
                                    {sticker.shortCode}
                                  </h4>
                                  <Badge
                                    variant={
                                      sticker.status === "active"
                                        ? "default"
                                        : sticker.status === "pending"
                                        ? "secondary"
                                        : "destructive"
                                    }
                                  >
                                    {sticker.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {item ? item.name : "Not linked to item"}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-semibold">{scanCount}</p>
                                <p className="text-xs text-muted-foreground">scans</p>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>QR Code: {sticker.shortCode}</DialogTitle>
                              <DialogDescription>
                                {item ? `Linked to ${item.name}` : "Not linked to any item"}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center py-6">
                              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                                <QRCodeSVG
                                  value={`${window.location.origin}/s/${sticker.shortCode}`}
                                  size={200}
                                  level="H"
                                  includeMargin
                                />
                              </div>
                              <p className="text-sm text-muted-foreground mb-4">
                                {window.location.origin}/s/{sticker.shortCode}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(
                                      `${window.location.origin}/s/${sticker.shortCode}`
                                    )
                                  }
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copy Link
                                </Button>
                                {!item && (
                                  <Button asChild>
                                    <Link to={`/items/new?sticker=${sticker.id}`}>
                                      <Plus className="w-4 h-4 mr-2" />
                                      Link Item
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

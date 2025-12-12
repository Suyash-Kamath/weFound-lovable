import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Item, Sticker, Scan } from '@/types';

interface ItemState {
  items: Item[];
  stickers: Sticker[];
  scans: Scan[];
  
  // Item actions
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => Item;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  getItemBySticker: (shortCode: string) => Item | undefined;
  
  // Sticker actions
  generateSticker: (userId: string) => Sticker;
  claimSticker: (shortCode: string, userId: string) => boolean;
  mapStickerToItem: (stickerId: string, itemId: string) => void;
  deactivateSticker: (stickerId: string) => void;
  
  // Scan actions
  recordScan: (stickerId: string, deviceInfo: Scan['deviceInfo'], location?: Scan['location']) => Scan;
  getScansBySticker: (stickerId: string) => Scan[];
}

const generateShortCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const useItemStore = create<ItemState>()(
  persist(
    (set, get) => ({
      items: [],
      stickers: [],
      scans: [],

      addItem: (itemData) => {
        const newItem: Item = {
          ...itemData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ items: [...state.items, newItem] }));
        return newItem;
      },

      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
          ),
        }));
      },

      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      getItemBySticker: (shortCode) => {
        const sticker = get().stickers.find((s) => s.shortCode === shortCode);
        if (!sticker?.itemId) return undefined;
        return get().items.find((i) => i.id === sticker.itemId);
      },

      generateSticker: (userId) => {
        const newSticker: Sticker = {
          id: crypto.randomUUID(),
          shortCode: generateShortCode(),
          status: 'pending',
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ stickers: [...state.stickers, newSticker] }));
        return newSticker;
      },

      claimSticker: (shortCode, userId) => {
        const sticker = get().stickers.find((s) => s.shortCode === shortCode);
        if (!sticker || sticker.userId) return false;
        
        set((state) => ({
          stickers: state.stickers.map((s) =>
            s.shortCode === shortCode ? { ...s, userId, updatedAt: new Date() } : s
          ),
        }));
        return true;
      },

      mapStickerToItem: (stickerId, itemId) => {
        set((state) => ({
          stickers: state.stickers.map((s) =>
            s.id === stickerId
              ? { ...s, itemId, status: 'active' as const, updatedAt: new Date() }
              : s
          ),
        }));
      },

      deactivateSticker: (stickerId) => {
        set((state) => ({
          stickers: state.stickers.map((s) =>
            s.id === stickerId
              ? { ...s, status: 'inactive' as const, updatedAt: new Date() }
              : s
          ),
        }));
      },

      recordScan: (stickerId, deviceInfo, location) => {
        const scan: Scan = {
          id: crypto.randomUUID(),
          stickerId,
          timestamp: new Date(),
          deviceInfo,
          location,
        };
        set((state) => ({ scans: [...state.scans, scan] }));
        return scan;
      },

      getScansBySticker: (stickerId) => {
        return get().scans.filter((s) => s.stickerId === stickerId);
      },
    }),
    {
      name: 'lostfound-items',
    }
  )
);

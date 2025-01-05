import { Item } from '@/types/item';

// Example rogue BiS items for Phase 1
export const rogueBiSItems: Record<string, Item> = {
  head: {
    id: 1,
    name: "Crown of Endless Knowledge",
    quality: 'epic',
    itemLevel: 120,
    requiredLevel: 60,
    slot: 'head',
    iconUrl: '/item-icons/head.png',
    stats: {
      agility: 30,
      stamina: 25,
      criticalStrike: 2,
      hit: 1
    },
    source: {
      type: 'raid',
      location: 'Molten Core - Ragnaros',
      dropRate: 15
    }
  },
  // Add more BiS items...
};

// Database of all available items
export const itemDatabase: Record<string, Item[]> = {
  head: [
    rogueBiSItems.head,
    // Add more head items...
  ],
  // Add more slots...
};

// Search function
export const searchItems = (query: string, slot: string): Item[] => {
  const items = itemDatabase[slot] || [];
  const lowerQuery = query.toLowerCase();
  
  return items.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.source.location.toLowerCase().includes(lowerQuery)
  );
};
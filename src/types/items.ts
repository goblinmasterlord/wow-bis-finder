// src/data/items.ts
import { Item } from '../types/item';

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
  neck: {
    id: 2,
    name: "Pendant of Fatal Strikes",
    quality: 'epic',
    itemLevel: 115,
    requiredLevel: 60,
    slot: 'neck',
    iconUrl: '/item-icons/neck.png',
    stats: {
      agility: 20,
      stamina: 15,
      criticalStrike: 1,
      hit: 1
    },
    source: {
      type: 'raid',
      location: 'Molten Core - Golemagg',
      dropRate: 18
    }
  },
  // Add more BiS items for each slot...
};

// All available items for each slot
export const itemDatabase: Record<string, Item[]> = {
  head: [
    rogueBiSItems.head,
    {
      id: 101,
      name: "Mask of the Shadow Hunter",
      quality: 'rare',
      itemLevel: 110,
      requiredLevel: 58,
      slot: 'head',
      iconUrl: '/item-icons/head2.png',
      stats: {
        agility: 25,
        stamina: 20,
        criticalStrike: 1
      },
      source: {
        type: 'dungeon',
        location: 'Stratholme',
        dropRate: 20
      }
    },
    // Add more head items...
  ],
  neck: [
    rogueBiSItems.neck,
    {
      id: 102,
      name: "Assassin's Mark",
      quality: 'rare',
      itemLevel: 105,
      requiredLevel: 57,
      slot: 'neck',
      iconUrl: '/item-icons/neck2.png',
      stats: {
        agility: 15,
        stamina: 12,
        hit: 1
      },
      source: {
        type: 'dungeon',
        location: 'Scholomance',
        dropRate: 22
      }
    },
    // Add more neck items...
  ],
  // Add more slots...
};

// Function to search items
export const searchItems = (query: string, slot: string): Item[] => {
  const items = itemDatabase[slot] || [];
  const lowerQuery = query.toLowerCase();
  
  return items.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.source.location.toLowerCase().includes(lowerQuery)
  );
};
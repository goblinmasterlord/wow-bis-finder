import { Item } from '../types/item';

// BiS items for Phase 1
export const rogueBiSItems: Record<string, Item> = {
  head: {
    id: 1,
    name: "Bloodfang Hood",
    quality: 'epic',
    itemLevel: 76,
    requiredLevel: 60,
    slot: 'head',
    iconUrl: '/item-icons/head.png',
    stats: {
      agility: 40,
      stamina: 28,
      criticalStrike: 2,
      hit: 1
    },
    source: {
      type: 'raid',
      location: 'Blackwing Lair - Nefarian',
      dropRate: 15
    }
  }
};

// Database of all available items
export const itemDatabase: Record<string, Item[]> = {
  head: [
    {
      id: 101,
      name: "Crown of Endless Knowledge",
      quality: 'epic',
      itemLevel: 66,
      requiredLevel: 60,
      slot: 'head',
      iconUrl: '/item-icons/head.png',
      stats: {
        agility: 30,
        stamina: 25,
        criticalStrike: 1
      },
      source: {
        type: 'raid',
        location: 'Molten Core - Ragnaros',
        dropRate: 15
      }
    },
    rogueBiSItems.head,
    {
      id: 102,
      name: "Mask of the Unforgiven",
      quality: 'rare',
      itemLevel: 61,
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
        dropRate: 18
      }
    }
  ]
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

// Get BiS item for a slot
export const getBisItem = (slot: string): Item | undefined => {
  return rogueBiSItems[slot];
};
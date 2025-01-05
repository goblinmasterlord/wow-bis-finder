export type ItemQuality = 'poor' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type ItemSlot = 
  | 'head' 
  | 'neck' 
  | 'shoulders' 
  | 'back' 
  | 'chest' 
  | 'wrists' 
  | 'hands' 
  | 'waist' 
  | 'legs' 
  | 'feet' 
  | 'ring1' 
  | 'ring2' 
  | 'trinket1' 
  | 'trinket2' 
  | 'mainhand' 
  | 'offhand';

export interface ItemStats {
  stamina?: number;
  strength?: number;
  agility?: number;
  intellect?: number;
  spirit?: number;
  criticalStrike?: number;
  hit?: number;
  attackPower?: number;
  spellPower?: number;
  defense?: number;
  dodge?: number;
  armor?: number;
}

export interface ItemSource {
  type: 'raid' | 'dungeon' | 'quest' | 'crafting' | 'pvp';
  location: string;
  dropRate?: number;
}

export interface Item {
  id: string;
  name: string;
  quality: ItemQuality;
  itemLevel: number;
  requiredLevel: number;
  slot: ItemSlot;
  iconUrl: string;
  stats: ItemStats;
  source: ItemSource;
} 
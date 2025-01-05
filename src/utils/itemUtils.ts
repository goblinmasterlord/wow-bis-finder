// src/utils/itemUtils.ts
import { Item, ItemStats } from '../types/item';

export const calculateStatDifference = (current: ItemStats, compared: ItemStats): ItemStats => {
  const difference: Partial<ItemStats> = {};
  
  // Combine all possible stat keys
  const allStats = new Set([
    ...Object.keys(current),
    ...Object.keys(compared)
  ]);
  
  allStats.forEach(stat => {
    const currentValue = current[stat as keyof ItemStats] || 0;
    const comparedValue = compared[stat as keyof ItemStats] || 0;
    difference[stat as keyof ItemStats] = comparedValue - currentValue;
  });
  
  return difference as ItemStats;
};

export const getItemScore = (item: Item): number => {
  const weights = {
    agility: 2.5,
    strength: 1,
    stamina: 1,
    attackPower: 1,
    criticalStrike: 2,
    hit: 3
  };

  return Object.entries(item.stats).reduce((score, [stat, value]) => {
    return score + (value * (weights[stat as keyof typeof weights] || 1));
  }, 0);
};

export const getBetterItem = (item1: Item, item2: Item): Item => {
  const score1 = getItemScore(item1);
  const score2 = getItemScore(item2);
  return score1 >= score2 ? item1 : item2;
};

export const formatStatValue = (stat: string, value: number): string => {
  if (stat === 'criticalStrike' || stat === 'hit') {
    return `${value}%`;
  }
  return value.toString();
};

export const getStatDisplayName = (stat: string): string => {
  const displayNames: Record<string, string> = {
    agility: 'Agility',
    strength: 'Strength',
    stamina: 'Stamina',
    intellect: 'Intellect',
    spirit: 'Spirit',
    armor: 'Armor',
    attackPower: 'Attack Power',
    criticalStrike: 'Critical Strike',
    hit: 'Hit'
  };
  
  return displayNames[stat] || stat;
};

export const getUpgradeQuality = (currentItem: Item, bisItem: Item): 'major' | 'minor' | 'none' => {
  const currentScore = getItemScore(currentItem);
  const bisScore = getItemScore(bisItem);
  const difference = bisScore - currentScore;
  
  if (difference <= 0) return 'none';
  if (difference > currentScore * 0.2) return 'major';
  return 'minor';
};
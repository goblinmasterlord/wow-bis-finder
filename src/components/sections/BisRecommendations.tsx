// src/components/sections/BisRecommendations.tsx
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Percent } from 'lucide-react';
import WowTooltip from '../ui/WowTooltip';
import { Item, ItemStats } from '../../types/item';
import { rogueBiSItems } from '../../data/items';

interface BisRecommendationsProps {
  selectedSlot: string | null;
  currentItem?: Item;
  onUpgradeClick?: (item: Item) => void;
}

const StatComparison = ({ current, bis }: { current?: number; bis?: number }) => {
  if (!current && !bis) return null;
  
  const diff = (bis || 0) - (current || 0);
  const isPositive = diff > 0;
  
  return (
    <span className={`text-sm ${isPositive ? 'text-quality-upgrade' : 'text-quality-downgrade'} wow-stat-text`}>
      {diff > 0 ? '+' : ''}{diff}
    </span>
  );
};

const StatDisplay = ({ stats, comparisonStats }: { stats: ItemStats; comparisonStats?: ItemStats }) => {
  return (
    <div className="space-y-1 text-sm">
      {Object.entries(stats).map(([stat, value]) => (
        <div key={stat} className="flex items-center justify-between">
          <span className="text-gray-300 capitalize">
            {stat.replace(/([A-Z])/g, ' $1').trim()}
          </span>
          <div className="flex items-center space-x-2">
            <span className="wow-stat-text">{value}</span>
            {comparisonStats && (
              <StatComparison
                current={value}
                bis={comparisonStats[stat as keyof ItemStats]}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function BisRecommendations({ selectedSlot, currentItem, onUpgradeClick }: BisRecommendationsProps) {
  if (!selectedSlot) {
    return (
      <div className="p-6 text-center text-gray-400">
        Select an equipment slot to see BiS recommendations
      </div>
    );
  }

  const bisItem = rogueBiSItems[selectedSlot];

  if (!bisItem) {
    return (
      <div className="p-6 text-center text-gray-400">
        No BiS recommendation available for this slot
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {currentItem && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="wow-item-panel"
        >
          <h3 className="text-lg font-medium mb-4">Currently Equipped</h3>
          <WowTooltip item={currentItem}>
            <div className="flex items-start space-x-4 cursor-help">
              <div className="w-12 h-12 bg-background-dark rounded flex items-center justify-center wow-item-border">
                <img src={currentItem.iconUrl} alt={currentItem.name} className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h4 className={`font-medium item-quality-${currentItem.quality} wow-item-glow`}>
                  {currentItem.name}
                </h4>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <MapPin size={14} className="mr-1" />
                  {currentItem.source.location}
                </div>
                <div className="mt-3">
                  <StatDisplay stats={currentItem.stats} comparisonStats={bisItem.stats} />
                </div>
              </div>
            </div>
          </WowTooltip>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="wow-item-panel wow-bis-panel"
        onClick={() => onUpgradeClick?.(bisItem)}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Best in Slot</h3>
          {currentItem && currentItem.id !== bisItem.id && (
            <div className="flex items-center text-sm">
              <ArrowRight size={14} className="mr-1 text-primary" />
              <span className="text-primary">Recommended Upgrade</span>
            </div>
          )}
        </div>

        <WowTooltip item={bisItem}>
          <div className="flex items-start space-x-4 cursor-help">
            <div className="w-12 h-12 bg-background-dark rounded flex items-center justify-center wow-item-border">
              <img src={bisItem.iconUrl} alt={bisItem.name} className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h4 className={`font-medium item-quality-${bisItem.quality} wow-item-glow`}>
                {bisItem.name}
              </h4>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  {bisItem.source.location}
                </div>
                {bisItem.source.dropRate && (
                  <div className="flex items-center">
                    <Percent size={14} className="mr-1" />
                    {bisItem.source.dropRate}% drop rate
                  </div>
                )}
              </div>
              <div className="mt-3">
                <StatDisplay stats={bisItem.stats} />
              </div>
            </div>
          </div>
        </WowTooltip>
      </motion.div>
    </div>
  );
}
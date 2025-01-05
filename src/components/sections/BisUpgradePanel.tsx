import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Item } from '../types/item';
import { getBisItem } from '@/data/items';
import BisItemCard from '../ui/BisItemCard';

interface BisUpgradePanelProps {
  selectedSlot: string | null;
  currentItem?: Item;
  onEquip: (item: Item) => void;
}

export default function BisUpgradePanel({ selectedSlot, currentItem, onEquip }: BisUpgradePanelProps) {
  if (!selectedSlot) {
    return (
      <div className="wow-panel p-6 text-center text-gray-400">
        <Star className="w-8 h-8 mx-auto mb-3 opacity-20" />
        <p>Select an equipment slot to see BiS recommendations</p>
      </div>
    );
  }

  const bisItem = getBisItem(selectedSlot);

  if (!bisItem) {
    return (
      <div className="wow-panel p-6 text-center text-gray-400">
        <p>No BiS recommendation available for this slot yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Current Item Section */}
      {currentItem && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="wow-panel p-4"
        >
          <h3 className="text-lg font-medium mb-3 flex items-center">
            Currently Equipped
          </h3>
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-background-dark rounded-lg flex items-center justify-center wow-item-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <img
                src={currentItem.iconUrl}
                alt={currentItem.name}
                className="w-10 h-10 relative z-10"
              />
            </div>
            <div>
              <div className={`font-medium item-quality-${currentItem.quality} wow-item-glow`}>
                {currentItem.name}
              </div>
              <div className="text-sm text-gray-400">
                Item Level {currentItem.itemLevel}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Upgrade Arrow */}
      {currentItem && (
        <div className="flex justify-center">
          <ArrowRight className="text-primary/60" size={24} />
        </div>
      )}

      {/* BiS Item Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <BisItemCard
          bisItem={bisItem}
          currentItem={currentItem}
          onEquip={onEquip}
        />
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="wow-panel p-4"
      >
        <h3 className="text-lg font-medium mb-3">Additional Notes</h3>
        <div className="text-sm text-gray-400 space-y-2">
          <p>
            This item is part of the Bloodfang Armor set, which provides powerful set bonuses for Rogues.
          </p>
          <p>
            Alternative options might be available depending on your specific build and playstyle.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 
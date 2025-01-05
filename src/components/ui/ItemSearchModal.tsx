// src/components/ui/ItemSearchModal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Percent, ArrowRight, Star } from 'lucide-react';
import { Item } from '../../types/item';
import { searchItems, getBisItem } from '../../data/items';
import BisItemCard from './BisItemCard';

interface ItemSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: Item) => void;
  slot: string;
  currentItem?: Item;
  position?: 'center' | 'right' | 'bottom';
}

const ItemCard = ({ item, onClick, showSource = true }: { item: Item; onClick: () => void; showSource?: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 hover:bg-background-hover cursor-pointer transition-colors rounded-lg"
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-background-dark rounded-lg flex items-center justify-center wow-item-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <img src={item.iconUrl} alt={item.name} className="w-10 h-10 relative z-10" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium item-quality-${item.quality} truncate wow-item-glow`}>
          {item.name}
        </h3>
        {showSource && (
          <div className="flex items-center space-x-4 text-sm mt-1">
            <div className="flex items-center text-gray-400">
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              <span className="truncate">{item.source.location}</span>
            </div>
            {item.source.dropRate && (
              <div className="flex items-center text-gray-400 flex-shrink-0">
                <Percent size={14} className="mr-1" />
                <span>{item.source.dropRate}%</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const StatComparison = ({ currentItem, bisItem }: { currentItem?: Item; bisItem: Item }) => {
  const allStats = Array.from(new Set([
    ...Object.keys(currentItem?.stats || {}),
    ...Object.keys(bisItem.stats)
  ])).filter(stat => (currentItem?.stats[stat as keyof typeof currentItem.stats] || 0) > 0 || 
                     (bisItem.stats[stat as keyof typeof bisItem.stats] || 0) > 0);

  return (
    <div className="mt-4 p-4 bg-background-dark/50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-300 mb-3">Stat Comparison</h4>
      <div className="space-y-2">
        {allStats.map(stat => {
          const currentValue = currentItem?.stats[stat as keyof typeof currentItem.stats] || 0;
          const bisValue = bisItem.stats[stat as keyof typeof bisItem.stats] || 0;
          const diff = bisValue - currentValue;

          return (
            <div key={stat} className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{stat.replace(/([A-Z])/g, ' $1').trim()}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">{currentValue}</span>
                <ArrowRight size={14} className="text-gray-600" />
                <span className="text-gray-300">{bisValue}</span>
                {diff !== 0 && (
                  <span className={diff > 0 ? 'text-green-400' : 'text-red-400'}>
                    ({diff > 0 ? '+' : ''}{diff})
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function ItemSearchModal({ 
  isOpen, 
  onClose, 
  onSelectItem, 
  slot,
  currentItem,
  position = 'center' 
}: ItemSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const bisItem = getBisItem(slot);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      handleSearch('');
    }
  }, [isOpen, slot]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    setTimeout(() => {
      const results = searchItems(query, slot);
      setItems(results);
      setLoading(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: position === 'right' ? '100%' : 0, y: position === 'bottom' ? '100%' : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: position === 'right' ? '100%' : 0, y: position === 'bottom' ? '100%' : 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`absolute ${
              position === 'right' 
                ? 'right-0 top-0 bottom-0 w-[480px]' 
                : position === 'bottom'
                ? 'bottom-0 left-0 right-0 max-h-[80vh]'
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh]'
            } bg-background border border-gray-800/50 rounded-lg shadow-2xl overflow-hidden`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-xl font-display">
                  Select {slot.charAt(0).toUpperCase() + slot.slice(1)}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Search input */}
              <div className="sticky top-0 z-20 p-4 border-b border-gray-800 bg-background/95 backdrop-blur-sm">
                <div className="relative">
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    size={20} 
                  />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full pl-10 pr-4 py-2 bg-background rounded-lg border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {/* BiS Recommendation */}
                {bisItem && (
                  <div className="p-4 border-b border-gray-800/50">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-lg font-medium">Best in Slot</h3>
                    </div>

                    {/* Current vs BiS Comparison */}
                    <div className="space-y-4">
                      {currentItem && (
                        <>
                          <div>
                            <div className="text-sm text-gray-400 mb-2">Currently Equipped</div>
                            <div className="wow-panel-inner p-3 bg-background-dark/30 rounded-lg">
                              <ItemCard item={currentItem} onClick={() => {}} showSource={false} />
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <ArrowRight className="text-primary/60" size={24} />
                          </div>
                        </>
                      )}
                      <div>
                        <div className="text-sm text-gray-400 mb-2">Recommended BiS</div>
                        <div className="wow-panel-inner p-3 bg-background-dark/30 rounded-lg">
                          <ItemCard item={bisItem} onClick={() => onSelectItem(bisItem)} showSource={false} />
                        </div>
                      </div>

                      {/* Stat Comparison */}
                      {currentItem && <StatComparison currentItem={currentItem} bisItem={bisItem} />}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 p-4 bg-background-secondary/50 rounded-lg">
                      <div className="text-sm text-gray-400">
                        <p>
                          This item is part of the Bloodfang Armor set, which provides powerful set bonuses for Rogues.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Search Results */}
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-4">All Items</h3>
                  {loading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 text-center text-gray-400"
                    >
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"/>
                    </motion.div>
                  ) : items.length > 0 ? (
                    <div className="space-y-2">
                      {items.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          onClick={() => onSelectItem(item)}
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 text-center text-gray-400"
                    >
                      {searchQuery.length > 0 ? (
                        <>No items found for "{searchQuery}"</>
                      ) : (
                        <>Start typing to search for items</>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
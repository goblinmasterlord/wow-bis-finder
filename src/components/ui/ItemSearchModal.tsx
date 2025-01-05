// src/components/ui/ItemSearchModal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Percent } from 'lucide-react';
import { Item, ItemQuality } from '../../types/item';
import { searchItems } from '@/data/items';

interface ItemSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: Item) => void;
  slot: string;
  position?: 'center' | 'right';
}

const getQualityClass = (quality: ItemQuality) => {
  return `item-quality-${quality}`;
};

const ItemCard = ({ item }: { item: Item }) => (
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 bg-background-dark rounded flex items-center justify-center wow-item-border">
      <img src={item.iconUrl} alt={item.name} className="w-10 h-10" />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className={`font-medium ${getQualityClass(item.quality)} truncate wow-item-glow`}>
        {item.name}
      </h3>
      <div className="flex items-center space-x-4 text-sm mt-1">
        <div className="flex items-center text-gray-400">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{item.source.location}</span>
        </div>
        {item.source.dropRate && (
          <div className="flex items-center text-gray-400">
            <Percent size={14} className="mr-1" />
            <span>{item.source.dropRate}%</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function ItemSearchModal({ 
  isOpen, 
  onClose, 
  onSelectItem, 
  slot,
  position = 'center' 
}: ItemSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

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

  const modalVariants = {
    center: {
      hidden: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    },
    right: {
      hidden: { opacity: 0, x: '100%', transition: { duration: 0.2 } },
      visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
      exit: { opacity: 0, x: '100%', transition: { duration: 0.2 } }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className={`${
            position === 'center' 
              ? 'fixed inset-0' 
              : 'fixed top-0 right-0 bottom-0 w-[480px]'
          } z-50 overflow-y-auto`}
        >
          <div className={`flex items-center justify-center min-h-screen ${position === 'center' ? 'p-4' : 'p-0'}`}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${position === 'center' ? 'fixed inset-0' : 'fixed inset-0 -z-10'} bg-black bg-opacity-50`}
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              variants={modalVariants[position]}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`wow-panel relative w-full max-w-2xl max-h-[80vh] overflow-hidden z-10 ${
                position === 'right' ? 'h-full rounded-l-lg rounded-r-none' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-xl font-display">Select {slot.charAt(0).toUpperCase() + slot.slice(1)}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search input */}
              <div className="p-4 border-b border-gray-800">
                <div className="relative">
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    size={20} 
                  />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full pl-10 pr-4 py-2 bg-background rounded border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Results */}
              <div className="overflow-y-auto max-h-[calc(80vh-180px)]">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center text-gray-400"
                  >
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"/>
                  </motion.div>
                ) : items.length > 0 ? (
                  <div className="divide-y divide-gray-800">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 hover:bg-background-hover cursor-pointer transition-colors"
                        onClick={() => onSelectItem(item)}
                      >
                        <ItemCard item={item} />
                      </motion.div>
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
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
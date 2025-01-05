import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Percent } from 'lucide-react';
import { Item } from '../../types/item';

interface WowTooltipProps {
  children: React.ReactNode;
  item: Item;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export default function WowTooltip({ children, item, position = 'right' }: WowTooltipProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-gray-800/80 border-l-transparent border-r-transparent border-b-transparent';
      case 'right':
        return 'left-[-6px] top-1/2 -translate-y-1/2 border-r-gray-800/80 border-t-transparent border-b-transparent border-l-transparent';
      case 'bottom':
        return 'top-[-6px] left-1/2 -translate-x-1/2 border-b-gray-800/80 border-l-transparent border-r-transparent border-t-transparent';
      case 'left':
        return 'right-[-6px] top-1/2 -translate-y-1/2 border-l-gray-800/80 border-t-transparent border-b-transparent border-r-transparent';
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`fixed ${getPositionClasses()} z-[99999] min-w-[300px] max-w-[400px]`}
            style={{ pointerEvents: 'none' }}
          >
            {/* Arrow */}
            <div className={`absolute w-0 h-0 border-[6px] ${getArrowClasses()}`} />

            {/* Tooltip Content */}
            <div className="relative bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 overflow-hidden">
              {/* Header */}
              <div className="p-3 border-b border-gray-700/50">
                <div className={`text-lg font-medium item-quality-${item.quality} wow-item-glow`}>
                  {item.name}
                </div>
                <div className="text-sm text-gray-400">
                  Item Level {item.itemLevel}
                </div>
              </div>

              {/* Stats */}
              <div className="p-3 space-y-1">
                {Object.entries(item.stats).map(([stat, value]) => (
                  value ? (
                    <div key={stat} className="text-sm">
                      <span className="text-green-400">+{value} </span>
                      <span className="text-gray-300">{stat.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                  ) : null
                ))}
              </div>

              {/* Source */}
              <div className="p-3 bg-gray-900/50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <MapPin size={14} className="mr-1" />
                    <span>{item.source.location}</span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
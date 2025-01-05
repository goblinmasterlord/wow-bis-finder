import React from 'react';
import { Item } from '@/types/item';

type WowTooltipProps = {
  item: Item;
  children: React.ReactNode;
}

const WowTooltip = ({ item, children }: WowTooltipProps) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-50 mt-2 -translate-x-1/2 left-1/2">
        <div className="wow-tooltip min-w-[300px] p-3 rounded border border-gray-700 bg-gray-900/95 shadow-xl">
          <div className={`text-lg font-medium item-quality-${item.quality}`}>
            {item.name}
          </div>
          <div className="text-gray-400 text-sm mb-2">
            {item.slot.charAt(0).toUpperCase() + item.slot.slice(1)}
          </div>
          <div className="border-t border-gray-700 my-2" />
          <div className="space-y-1">
            {Object.entries(item.stats).map(([stat, value]) => (
              <div key={stat} className="text-sm">
                {value > 0 && (
                  <span className="text-green-400">
                    +{value} {stat.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 my-2" />
          <div className="text-sm italic text-gray-400">
            Item Level {item.itemLevel}
          </div>
          <div className="text-sm text-gray-300 mt-1">
            Requires Level {item.requiredLevel}
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Source: {item.source.location}
            {item.source.dropRate && ` (${item.source.dropRate}% drop rate)`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WowTooltip;
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Item } from '../types/item';

interface BisItemCardProps {
  bisItem: Item;
  currentItem?: Item;
  onEquip: (item: Item) => void;
}

const StatComparison = ({ current, bis }: { current?: number; bis?: number }) => {
  if (!current || !bis) return null;
  const diff = bis - current;
  
  if (diff === 0) {
    return (
      <span className="flex items-center text-gray-400">
        <Minus size={14} className="mr-1" />
        {bis}
      </span>
    );
  }

  return (
    <span className={`flex items-center ${diff > 0 ? 'text-green-400' : 'text-red-400'}`}>
      {diff > 0 ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
      {Math.abs(diff)}
    </span>
  );
};

export default function BisItemCard({ bisItem, currentItem, onEquip }: BisItemCardProps) {
  const getStatComparison = () => {
    const allStats = new Set([
      ...Object.keys(bisItem.stats),
      ...(currentItem ? Object.keys(currentItem.stats) : [])
    ]);

    return Array.from(allStats).map(stat => ({
      name: stat,
      current: currentItem?.stats[stat as keyof typeof currentItem.stats] || 0,
      bis: bisItem.stats[stat as keyof typeof bisItem.stats] || 0
    }));
  };

  return (
    <div className="wow-panel p-4 space-y-4">
      {/* Item Header */}
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-background-dark rounded-lg flex items-center justify-center wow-item-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <img
            src={bisItem.iconUrl}
            alt={bisItem.name}
            className="w-10 h-10 relative z-10"
          />
        </div>
        <div>
          <div className={`font-medium item-quality-${bisItem.quality} wow-item-glow`}>
            {bisItem.name}
          </div>
          <div className="text-sm text-gray-400">
            Item Level {bisItem.itemLevel}
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="space-y-2">
        {getStatComparison().map(({ name, current, bis }) => (
          <div key={name} className="flex items-center justify-between text-sm">
            <span className="text-gray-400 capitalize">
              {name.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <div className="flex items-center space-x-4">
              {currentItem && (
                <>
                  <span className="text-gray-500">{current}</span>
                  <StatComparison current={current} bis={bis} />
                </>
              )}
              <span className="text-green-400">{bis}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Source Info */}
      <div className="text-sm space-y-1">
        <div className="text-blue-400/90">
          {bisItem.source.type.charAt(0).toUpperCase() + bisItem.source.type.slice(1)}
        </div>
        <div className="text-gray-400">
          {bisItem.source.location}
          {bisItem.source.dropRate && (
            <span className="ml-1">
              ({bisItem.source.dropRate}% drop rate)
            </span>
          )}
        </div>
      </div>

      {/* Equip Button */}
      {(!currentItem || currentItem.id !== bisItem.id) && (
        <button
          onClick={() => onEquip(bisItem)}
          className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg text-primary-foreground transition-colors"
        >
          Equip BiS Item
        </button>
      )}
    </div>
  );
} 
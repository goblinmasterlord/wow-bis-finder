// src/pages/CharacterGear.tsx
import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Swords, Heart, ChevronRight } from 'lucide-react';
import EquipmentPanel from '../components/sections/EquipmentPanel';
import ItemEquipNotification from '../components/ui/ItemEquipNotification';
import ItemSearchModal from '../components/ui/ItemSearchModal';
import { Item } from '../types/item';

interface StatSummary {
  stamina: number;
  strength: number;
  agility: number;
  intellect: number;
  spirit: number;
  criticalStrike: number;
  hit: number;
  attackPower: number;
  spellPower: number;
  defense: number;
  dodge: number;
  armor: number;
}

export default function CharacterGear() {
  const { className } = useParams();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentGear, setCurrentGear] = useState<Record<string, Item>>({});
  const [lastEquippedItem, setLastEquippedItem] = useState<Item | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Calculate total stats from all equipped items
  const totalStats = useMemo(() => {
    return Object.values(currentGear).reduce((total, item) => {
      Object.entries(item.stats).forEach(([stat, value]) => {
        if (value) {
          total[stat as keyof StatSummary] = (total[stat as keyof StatSummary] || 0) + value;
        }
      });
      return total;
    }, {} as StatSummary);
  }, [currentGear]);

  const handleGearUpdate = (slotId: string, item: Item | null) => {
    setCurrentGear(prev => {
      if (item === null) {
        const newGear = { ...prev };
        delete newGear[slotId];
        return newGear;
      }
      return {
        ...prev,
        [slotId]: item
      };
    });
    if (item) {
      setLastEquippedItem(item);
      setShowNotification(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-gray-800/50 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-display">
              {className?.charAt(0).toUpperCase()}{className?.slice(1)} BiS Gear
            </h1>
            <div className="flex items-center text-gray-400 text-sm">
              <ChevronRight size={16} className="mx-1" />
              <span>Item Level {
                Object.values(currentGear).length > 0
                  ? Math.round(
                      Object.values(currentGear).reduce((sum, item) => sum + item.itemLevel, 0) /
                      Object.values(currentGear).length
                    )
                  : 0
              }</span>
              <ChevronRight size={16} className="mx-1" />
              <span>{Object.keys(currentGear).length}/16 Items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Equipment */}
          <div className="lg:col-span-8">
            <EquipmentPanel
              onSlotSelect={setSelectedSlot}
              onGearUpdate={handleGearUpdate}
              currentGear={currentGear}
            />
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="wow-panel p-4 space-y-6 sticky top-6 backdrop-blur-sm"
            >
              <h2 className="text-xl font-display mb-4">Character Stats</h2>

              {/* Core Stats */}
              <div className="wow-panel-inner p-4 rounded-lg bg-background-secondary/30">
                <h3 className="text-lg font-medium text-gray-300 flex items-center mb-3">
                  <Heart className="w-5 h-5 mr-2 text-red-400" />
                  Core Stats
                </h3>
                <div className="space-y-2">
                  <StatRow label="Stamina" value={totalStats.stamina} />
                  <StatRow label="Strength" value={totalStats.strength} />
                  <StatRow label="Agility" value={totalStats.agility} />
                  <StatRow label="Intellect" value={totalStats.intellect} />
                  <StatRow label="Spirit" value={totalStats.spirit} />
                </div>
              </div>

              {/* Offensive Stats */}
              <div className="wow-panel-inner p-4 rounded-lg bg-background-secondary/30">
                <h3 className="text-lg font-medium text-gray-300 flex items-center mb-3">
                  <Swords className="w-5 h-5 mr-2 text-orange-400" />
                  Offensive
                </h3>
                <div className="space-y-2">
                  <StatRow label="Critical Strike" value={totalStats.criticalStrike} suffix="%" />
                  <StatRow label="Hit" value={totalStats.hit} suffix="%" />
                  <StatRow label="Attack Power" value={totalStats.attackPower} />
                  <StatRow label="Spell Power" value={totalStats.spellPower} />
                </div>
              </div>

              {/* Defensive Stats */}
              <div className="wow-panel-inner p-4 rounded-lg bg-background-secondary/30">
                <h3 className="text-lg font-medium text-gray-300 flex items-center mb-3">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Defensive
                </h3>
                <div className="space-y-2">
                  <StatRow label="Armor" value={totalStats.armor} />
                  <StatRow label="Defense" value={totalStats.defense} />
                  <StatRow label="Dodge" value={totalStats.dodge} suffix="%" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Item Search Modal */}
      <ItemSearchModal
        isOpen={selectedSlot !== null}
        onClose={() => setSelectedSlot(null)}
        onSelectItem={(item) => {
          if (selectedSlot) {
            handleGearUpdate(selectedSlot, item);
            setSelectedSlot(null);
          }
        }}
        slot={selectedSlot || ''}
        currentItem={selectedSlot ? currentGear[selectedSlot] : undefined}
        position="right"
      />

      {lastEquippedItem && (
        <ItemEquipNotification
          item={lastEquippedItem}
          isVisible={showNotification}
          onHide={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

const StatRow = ({ label, value = 0, suffix = '' }: { label: string; value?: number; suffix?: string }) => (
  <div className="flex items-center justify-between p-2 rounded bg-background-dark/50">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="text-gray-200 font-medium text-sm">
      {value.toLocaleString()}{suffix}
    </span>
  </div>
);
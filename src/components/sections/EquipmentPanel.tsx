// src/components/sections/EquipmentPanel.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import ItemSearchModal from '../ui/ItemSearchModal';
import WowTooltip from '../ui/WowTooltip';
import { Item } from '../../types/item';

interface EquipmentSlot {
  id: string;
  name: string;
  position: [number, number];
}

interface EquipmentPanelProps {
  onSlotSelect: (slot: string | null) => void;
  onGearUpdate: (slotId: string, item: Item | null) => void;
  currentGear: Record<string, Item>;
}

// Layout matches WoW's equipment panel
const equipmentSlots: EquipmentSlot[] = [
  // Left Column
  { id: 'head', name: 'Head', position: [0, 0] },
  { id: 'neck', name: 'Neck', position: [1, 0] },
  { id: 'shoulders', name: 'Shoulders', position: [2, 0] },
  { id: 'back', name: 'Back', position: [3, 0] },
  { id: 'chest', name: 'Chest', position: [4, 0] },
  { id: 'wrists', name: 'Wrists', position: [5, 0] },
  { id: 'hands', name: 'Hands', position: [6, 0] },
  { id: 'waist', name: 'Waist', position: [7, 0] },
  // Right Column
  { id: 'legs', name: 'Legs', position: [0, 2] },
  { id: 'feet', name: 'Feet', position: [1, 2] },
  { id: 'ring1', name: 'Ring 1', position: [2, 2] },
  { id: 'ring2', name: 'Ring 2', position: [3, 2] },
  { id: 'trinket1', name: 'Trinket 1', position: [4, 2] },
  { id: 'trinket2', name: 'Trinket 2', position: [5, 2] },
  { id: 'mainhand', name: 'Main Hand', position: [6, 2] },
  { id: 'offhand', name: 'Off Hand', position: [7, 2] },
];

export default function EquipmentPanel({ onSlotSelect, onGearUpdate, currentGear }: EquipmentPanelProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const getSlotStyle = (position: [number, number]) => {
    const [row, col] = position;
    return {
      gridRow: `${row + 1}`,
      gridColumn: `${col + 1}`
    };
  };

  const handleSlotClick = (slotId: string) => {
    setSelectedSlot(slotId);
    onSlotSelect(slotId);
  };

  const handleSelectItem = (item: Item) => {
    onGearUpdate(selectedSlot!, item);
    setSelectedSlot(null);
    onSlotSelect(null);
  };

  const handleRemoveItem = (slotId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onGearUpdate(slotId, null);
  };

  return (
    <>
      <div className="wow-panel p-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{ backgroundImage: 'url(/patterns/wow-pattern.png)' }} />
        </div>

        <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: 'repeat(8, minmax(48px, auto))' }}>
          {/* Equipment Slots */}
          {equipmentSlots.map((slot) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={getSlotStyle(slot.position)}
              onMouseEnter={() => setHoveredSlot(slot.id)}
              onMouseLeave={() => setHoveredSlot(null)}
              className={`relative p-2 border rounded-lg transition-all duration-200 ${
                hoveredSlot === slot.id
                  ? 'border-primary/50 bg-background-hover shadow-lg shadow-primary/10'
                  : 'border-gray-800/50 bg-background-secondary'
              } hover:border-primary/50 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-primary/10`}
              onClick={() => handleSlotClick(slot.id)}
            >
              {currentGear[slot.id] ? (
                <WowTooltip item={currentGear[slot.id]} position={slot.position[1] === 0 ? 'right' : 'left'}>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-background-dark rounded-lg flex items-center justify-center wow-item-border relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                      <img
                        src={currentGear[slot.id].iconUrl}
                        alt={currentGear[slot.id].name}
                        className="w-8 h-8 relative z-10"
                      />
                    </div>
                    <div className="flex-1 min-w-0 relative group">
                      <p className="text-sm font-medium truncate">{slot.name}</p>
                      <div className="flex items-center space-x-1">
                        <p className={`text-xs truncate item-quality-${currentGear[slot.id].quality} wow-item-glow flex-1`}>
                          {currentGear[slot.id].name}
                        </p>
                        {/* Remove Button - Now next to item name */}
                        <button
                          onClick={(e) => handleRemoveItem(slot.id, e)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-400 p-0.5"
                          title="Remove item"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </WowTooltip>
              ) : (
                <div className="flex items-center space-x-2 group">
                  <div className="w-10 h-10 bg-background-dark rounded-lg flex items-center justify-center border border-gray-800/30 group-hover:border-primary/30 transition-colors">
                    <Plus size={20} className="text-gray-600 group-hover:text-primary/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{slot.name}</p>
                    <p className="text-xs text-gray-500 truncate group-hover:text-primary/60">Click to equip</p>
                  </div>
                </div>
              )}

              {/* Slot Highlight Effect */}
              {hoveredSlot === slot.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-lg ring-1 ring-primary/30 pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Item Search Modal */}
      <ItemSearchModal
        isOpen={selectedSlot !== null}
        onClose={() => {
          setSelectedSlot(null);
          onSlotSelect(null);
        }}
        onSelectItem={handleSelectItem}
        slot={selectedSlot || ''}
        currentItem={selectedSlot ? currentGear[selectedSlot] : undefined}
        position={window.innerWidth >= 768 ? 'right' : 'bottom'}
      />
    </>
  );
}
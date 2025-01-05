// src/components/sections/EquipmentPanel.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import ItemSearchModal from '../ui/ItemSearchModal';
import WowTooltip from '../ui/WowTooltip';
import { Item } from '@/types/items';

interface EquipmentSlot {
  id: string;
  name: string;
  position: [number, number];
}

interface EquipmentPanelProps {
  onSlotSelect: (slot: string | null) => void;
  onGearUpdate: (slotId: string, item: Item) => void;
  currentGear: Record<string, Item>;
}

const equipmentSlots: EquipmentSlot[] = [
  { id: 'head', name: 'Head', position: [0, 1] },
  { id: 'neck', name: 'Neck', position: [1, 1] },
  { id: 'shoulders', name: 'Shoulders', position: [2, 1] },
  { id: 'back', name: 'Back', position: [3, 1] },
  { id: 'chest', name: 'Chest', position: [4, 1] },
  { id: 'wrists', name: 'Wrists', position: [5, 1] },
  { id: 'hands', name: 'Hands', position: [6, 1] },
  { id: 'waist', name: 'Waist', position: [7, 1] },
  { id: 'legs', name: 'Legs', position: [8, 1] },
  { id: 'feet', name: 'Feet', position: [9, 1] },
  { id: 'ring1', name: 'Ring 1', position: [6, 2] },
  { id: 'ring2', name: 'Ring 2', position: [7, 2] },
  { id: 'trinket1', name: 'Trinket 1', position: [8, 2] },
  { id: 'trinket2', name: 'Trinket 2', position: [9, 2] },
  { id: 'mainhand', name: 'Main Hand', position: [10, 1] },
  { id: 'offhand', name: 'Off Hand', position: [10, 2] },
];

export default function EquipmentPanel({ onSlotSelect, onGearUpdate, currentGear }: EquipmentPanelProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const getSlotStyle = (position: [number, number]) => {
    const [row, col] = position;
    return `grid-row-start: ${row + 1}; grid-column-start: ${col}`;
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

  return (
    <>
      <div className="wow-panel p-6">
        <div className="grid grid-cols-2 gap-4 relative" style={{ gridTemplateRows: 'repeat(11, minmax(60px, auto))' }}>
          {/* Character Model Space - Center Column */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="text-center">
              <p className="font-display">Character Model</p>
              <p className="text-sm">(Coming Soon)</p>
            </div>
          </div>

          {/* Equipment Slots */}
          {equipmentSlots.map((slot) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ style: getSlotStyle(slot.position) }}
              onMouseEnter={() => setHoveredSlot(slot.id)}
              onMouseLeave={() => setHoveredSlot(null)}
              className={`p-2 border rounded transition-all duration-200 ${
                hoveredSlot === slot.id
                  ? 'border-primary bg-background-hover'
                  : 'border-gray-800 bg-background-secondary'
              } hover:border-primary cursor-pointer transform hover:scale-105`}
              onClick={() => handleSlotClick(slot.id)}
            >
              {currentGear[slot.id] ? (
                <WowTooltip item={currentGear[slot.id]}>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-background-dark rounded flex items-center justify-center wow-item-border">
                      <img
                        src={currentGear[slot.id].iconUrl}
                        alt={currentGear[slot.id].name}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{slot.name}</p>
                      <p className={`text-xs truncate item-quality-${currentGear[slot.id].quality} wow-item-glow`}>
                        {currentGear[slot.id].name}
                      </p>
                    </div>
                  </div>
                </WowTooltip>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-background-dark rounded flex items-center justify-center">
                    <div className="w-8 h-8 bg-background-darker rounded-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{slot.name}</p>
                    <p className="text-xs text-gray-500 truncate">Empty slot</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <ItemSearchModal
          isOpen={selectedSlot !== null}
          onClose={() => {
            setSelectedSlot(null);
            onSlotSelect(null);
          }}
          onSelectItem={handleSelectItem}
          slot={selectedSlot || ''}
        />
      </div>
      <div className="hidden md:block">
        {selectedSlot && (
          <ItemSearchModal
            isOpen={selectedSlot !== null}
            onClose={() => {
              setSelectedSlot(null);
              onSlotSelect(null);
            }}
            onSelectItem={handleSelectItem}
            slot={selectedSlot || ''}
            position="right"
          />
        )}
      </div>
    </>
  );
}
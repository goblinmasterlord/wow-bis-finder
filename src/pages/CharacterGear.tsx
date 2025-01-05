// src/pages/CharacterGear.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import EquipmentPanel from '../components/sections/EquipmentPanel';
import BisRecommendations from '../components/sections/BisRecommendations';
import ItemEquipNotification from '../components/ui/ItemEquipNotification';
import { Item } from '../types/item';
import { getUpgradeQuality } from '../utils/itemUtils';

export default function CharacterGear() {
  const { className } = useParams();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentGear, setCurrentGear] = useState<Record<string, Item>>({});
  const [lastEquippedItem, setLastEquippedItem] = useState<Item | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleGearUpdate = (slotId: string, item: Item) => {
    setCurrentGear(prev => ({
      ...prev,
      [slotId]: item
    }));
    setLastEquippedItem(item);
    setShowNotification(true);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display mb-2">
            {className?.charAt(0).toUpperCase()}{className?.slice(1)} BiS Gear
          </h1>
          <p className="text-gray-400">
            Select your current gear and see recommended upgrades
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <EquipmentPanel
            onSlotSelect={setSelectedSlot}
            onGearUpdate={handleGearUpdate}
            currentGear={currentGear}
          />
          <div className="wow-panel">
            <h2 className="text-2xl font-display mb-4">Gear Details</h2>
            <BisRecommendations
              selectedSlot={selectedSlot}
              currentItem={selectedSlot ? currentGear[selectedSlot] : undefined}
              onUpgradeClick={(item) => {
                if (selectedSlot) {
                  handleGearUpdate(selectedSlot, item);
                }
              }}
            />
          </div>
        </div>
      </div>

      {lastEquippedItem && (
        <ItemEquipNotification
          item={lastEquippedItem}
          isVisible={showNotification}
          onHide={() => setShowNotification(false)}
        />
      )}
    </>
  );
}
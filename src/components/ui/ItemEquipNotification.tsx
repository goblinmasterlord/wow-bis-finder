// src/components/ui/ItemEquipNotification.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { Item } from '../../types/item';

interface ItemEquipNotificationProps {
  item: Item;
  isVisible: boolean;
  onHide: () => void;
}

export default function ItemEquipNotification({ item, isVisible, onHide }: ItemEquipNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-4 right-4 z-50"
          onAnimationComplete={() => {
            setTimeout(onHide, 2000);
          }}
        >
          <div className="wow-panel bg-background-secondary p-4 flex items-center space-x-3">
            <img src={item.iconUrl} alt={item.name} className="w-8 h-8" />
            <div>
              <p className={`font-medium item-quality-${item.quality}`}>
                {item.name}
              </p>
              <p className="text-sm text-gray-400">
                Item equipped
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
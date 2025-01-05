// src/pages/ClassSelection.tsx
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WowClass {
  id: string;
  name: string;
  enabled: boolean;
  iconUrl: string;
  color: string;
}

const classes: WowClass[] = [
  {
    id: 'rogue',
    name: 'Rogue',
    enabled: true,
    iconUrl: '/class-icons/rogue.png',
    color: '#FFF468'
  },
  {
    id: 'warrior',
    name: 'Warrior',
    enabled: false,
    iconUrl: '/class-icons/warrior.png',
    color: '#C69B6D'
  },
  // Add other classes here...
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ClassSelection() {
  const navigate = useNavigate();

  const handleClassSelect = (wowClass: WowClass) => {
    if (wowClass.enabled) {
      navigate(`/gear/${wowClass.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display mb-4 text-glow">
            Choose Your Class
          </h1>
          <p className="text-gray-400">
            Select your class to find the best gear for your character
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {classes.map((wowClass) => (
            <motion.div
              key={wowClass.id}
              variants={item}
              onClick={() => handleClassSelect(wowClass)}
              className={`wow-panel relative group cursor-pointer transition-all duration-300 hover:border-gray-700 ${
                !wowClass.enabled && 'opacity-50 cursor-not-allowed'
              }`}
              style={{
                '--hover-color': wowClass.color
              } as React.CSSProperties}
            >
              <div className="flex flex-col items-center p-4">
                <img
                  src={wowClass.iconUrl}
                  alt={wowClass.name}
                  className="w-16 h-16 mb-3"
                />
                <h3
                  className="font-display text-lg"
                  style={{ color: wowClass.color }}
                >
                  {wowClass.name}
                </h3>
                {!wowClass.enabled && (
                  <div className="absolute inset-0 bg-background-secondary bg-opacity-90 flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Lock size={16} />
                      <span>Coming Soon</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
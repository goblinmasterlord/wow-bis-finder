// src/layouts/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-display text-primary">
                WoW BiS Finder
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="relative w-20 h-20 mx-auto mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 border-4 border-primary-200 dark:border-primary-900 border-t-primary-500 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🐾</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading PetX V...</h2>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Preparing your pet experience</p>
      </motion.div>
    </div>
  );
};

export default LoadingSkeleton;

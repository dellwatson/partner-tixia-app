import { motion } from 'motion/react';
import { TextureCard } from '~/components/ui/texture-card';
import React from 'react';

interface MobileCompactHeaderProps {
  info: React.ReactNode;
  onExpand: () => void;
}

export const MobileCompactHeader: React.FC<MobileCompactHeaderProps> = ({ info, onExpand }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onExpand}
      className="w-full md:hidden"
    >
      <TextureCard className="w-full">
        <div className="px-4 py-3">
          <div className="flex items-start gap-3">
            {/* <ChevronLeft className="h-5 w-5 mt-0.5" /> */}
            <div className="flex-1 text-left">{info}</div>
          </div>
        </div>
      </TextureCard>
    </motion.div>
  );
};

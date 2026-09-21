import React from 'react';
import { Megaphone, X } from 'lucide-react';

interface AdBannerProps {
  isDark?: boolean;
  onDismiss: () => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({ isDark = true, onDismiss }) => {
  return (
    <div></div>
  );
};

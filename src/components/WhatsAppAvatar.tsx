import React, { useId } from 'react';

interface WhatsAppAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isGroup?: boolean;
  avatar?: string;
  className?: string;
}

export const WhatsAppAvatar: React.FC<WhatsAppAvatarProps> = ({
  size = 'md',
  isGroup = false,
  avatar,
  className = '',
}) => {
  const clipId = useId();

  // Dimensions matching WhatsApp scale
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
  }[size];

  // Group avatar uses dark teal green background with group icon
  if (isGroup) {
    return (
      <div
        className={`${sizeClasses} rounded-full bg-[#00473e] flex items-center justify-center overflow-hidden shrink-0 ${className}`}
      >
        {avatar ? (
          <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-[#25d366]"
            fill="currentColor"
          >
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        )}
      </div>
    );
  }

  if (avatar) {
    return (
      <div
        className={`${sizeClasses} rounded-full overflow-hidden shrink-0 relative flex items-center justify-center select-none ${className}`}
      >
        <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  // Exact WhatsApp Default Avatar matching uploaded no-profile.jpg:
  // - Background Circle: Pure White (#FFFFFF)
  // - Silhouette (Head & Torso): Neutral WhatsApp Grey (#8696a0)
  // - Proportions: Head radius 19.5 at (50, 40.5), smooth shoulder dome from y=66.5
  return (
    <div
      className={`${sizeClasses} rounded-full overflow-hidden shrink-0 relative flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx="50" cy="50" r="50" />
          </clipPath>
        </defs>

        {/* Outer Background Circle: Pure White (#FFFFFF) */}
        <circle cx="50" cy="50" r="50" fill="#FFFFFF" />

        {/* Head: Neutral Grey Circle (#8696a0) */}
        <circle cx="50" cy="40.5" r="19.5" fill="#8696a0" />

        {/* Torso/Shoulders: Smooth dome clipped to outer circle (#8696a0) */}
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M 50 66.5 C 33 66.5 17 74 13 87 L 5 105 L 95 105 L 87 87 C 83 74 67 66.5 50 66.5 Z"
            fill="#8696a0"
          />
        </g>
      </svg>
    </div>
  );
};

import React from 'react';

interface WhatsAppCheckProps {
  type?: 'single' | 'double';
  color?: 'blue' | 'grey';
  className?: string;
}

export const WhatsAppCheck: React.FC<WhatsAppCheckProps> = ({
  type = 'double',
  color = 'grey',
  className = '',
}) => {
  // WhatsApp official colors:
  // - Blue tick: #53bdeb (dark mode WhatsApp cyan-blue)
  // - Grey tick: #8696a0 (WhatsApp neutral grey)
  const colorClass = color === 'blue' ? 'grey' : 'text-[#8696a0]';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${colorClass}`}
      title={color === 'grey' ? 'Dibaca (Centang Biru)' : 'Terkirim (Centang Abu-abu)'}
    >
      {/* WhatsApp Official wds-ic-read SVG */}
      <svg
        viewBox="0 0 24 24"
        className={className || 'w-4 h-4'}
        preserveAspectRatio="xMidYMid meet"
        fill="currentColor"
      >
        <title>{type === 'double' ? 'wds-ic-read' : 'wds-ic-delivered'}</title>
        {type === 'single' ? (
          <path
            fill="currentColor"
            d="M16.14 5.86a1 1 0 0 0-1.41.15l-7.99 9.86-3.25-3.29a.99.99 0 0 0-1.41 0 .99.99 0 0 0 0 1.41l4.03 4.09c.19.19.45.3.71.3h.05a1 1 0 0 0 .73-.37l8.7-10.73a1 1 0 0 0-.15-1.41l-.01-.01Z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M14.73 6.01a1 1 0 0 1 1.41-.15l.01.01a1 1 0 0 1 .15 1.41L7.6 18.01a1 1 0 0 1-.73.37h-.05c-.26 0-.52-.11-.71-.3l-4.03-4.09a.99.99 0 0 1 0-1.41.99.99 0 0 1 1.41 0l3.25 3.29 7.99-9.86Zm5.71.12a1 1 0 0 1 1.41-.15h-.01a1 1 0 0 1 .15 1.41l-8.41 10.45a1 1 0 0 1-.73.37h-.05a1 1 0 0 1-.71-.3l-1.36-1.26a.55.55 0 0 1-.02-.81l.56-.68c.21-.2.53-.21.75-.03l.71.58 7.71-9.58Z"
          />
        )}
      </svg>
    </span>
  );
};

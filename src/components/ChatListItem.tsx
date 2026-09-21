import React, { useRef } from 'react';
import { Check, Clock } from 'lucide-react';
import { ChatItem } from '../types';
import { WhatsAppCheck } from './WhatsAppCheck';
import { WhatsAppAvatar } from './WhatsAppAvatar';

const getDelayedDisplayTime = (time: string, secondsAhead = 5): string => {
  const match = /^([0-1]\d|2[0-3])\.([0-5]\d)(?:\.([0-5]\d))?$/.exec(time.trim());

  if (!match) {
    return time;
  }

  const [hours, minutes, seconds = '00'] = match.slice(1);
  const currentDate = new Date();
  const shiftedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    Number(hours),
    Number(minutes),
    Number(seconds),
    0,
  );

  shiftedDate.setSeconds(shiftedDate.getSeconds() + secondsAhead);

  return `${String(shiftedDate.getHours()).padStart(2, '0')}.${String(shiftedDate.getMinutes()).padStart(2, '0')}`;
};

interface ChatListItemProps {
  chat: ChatItem;
  isSelectionMode: boolean;
  isSelected: boolean;
  isDark?: boolean;
  onToggleSelect: (id: string) => void;
  onOpenChat: (chat: ChatItem) => void;
  onLongPress: (id: string) => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  isSelectionMode,
  isSelected,
  isDark = true,
  onToggleSelect,
  onOpenChat,
  onLongPress,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressTriggered = useRef(false);
  const previewText = (chat.lastMessage || '').replace(/\*_|_\*/g, '').replace(/[_*]/g, '');
  const displayTime = getDelayedDisplayTime(chat.time);
  const hasLastMessageImage = Boolean(chat.lastMessageImage);
  const handleTouchStart = () => {
    isLongPressTriggered.current = false;
    timerRef.current = setTimeout(() => {
      isLongPressTriggered.current = true;
      onLongPress(chat.id);
    }, 450);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isLongPressTriggered.current) {
      e.preventDefault();
      return;
    }
    if (isSelectionMode) {
      onToggleSelect(chat.id);
    } else {
      onOpenChat(chat);
    }
  };

  return (
    <div
      id={`chat-item-${chat.id}`}
      onClick={handleClick}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress(chat.id);
      }}
      className={`flex items-center px-4 py-3 gap-3.5 cursor-pointer transition-colors select-none ${
        isSelected
          ? isDark
            ? 'bg-[#1c222b]'
            : 'bg-[#f0f2f5]'
          : isDark
          ? 'bg-[#0D1015] hover:bg-[#161c24]/60 active:bg-[#161c24]'
          : 'bg-white hover:bg-gray-50 active:bg-gray-100'
      }`}
    >
      {/* Avatar with bottom-right white checkmark badge when selected (Matching Image 1) */}
      <div className="relative shrink-0 w-12 h-12">
        <WhatsAppAvatar
          size="md"
          isGroup={chat.isGroup}
          avatar={chat.avatar}
        />

        {/* Selected checkmark badge at bottom-right corner - matching IMG-20260910-WA0074 */}
        {isSelected && (
          <div
            id={`selected-badge-${chat.id}`}
            className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md animate-in zoom-in duration-100 ring-1 ring-black/10"
          >
            <Check className="w-3.5 h-3.5 text-[#0D1015] stroke-[3.5]" />
          </div>
        )}
      </div>

      {/* Chat info matching typography */}
      <div
        className={`flex-1 min-w-0 pb-3 -mb-3`}
      >
        <div className="flex items-center justify-between">
          <h4
            className={`text-[14px] font-medium truncate tracking-tight ${
              isDark ? 'text-[#e9edef]' : 'text-[#111b21]'
            }`}
          >
            {chat.name}
          </h4>
          <span
            className={`text-xs text-[#8696a0]`}
          >
            {displayTime}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-0.5 text-[13px] text-[#8696a0]">
          {chat.hasTimer ? (
            <Clock className="w-3.5 h-3.5 text-[#8696a0] shrink-0" />
          ) : !chat.isGroup ? (
            <WhatsAppCheck
              type={chat.status === 'sent' ? 'single' : 'double'}
              color={chat.status === 'read' ? 'blue' : 'grey'}
              className="w-4 h-4 shrink-0"
            />
          ) : null}

          {hasLastMessageImage && (
            <svg
              viewBox="0 0 24 24"
              height="20"
              width="18"
              preserveAspectRatio="xMidYMid meet"
              className="text-[#8696a0] shrink-0"
              fill="currentColor"
              aria-hidden="true"
            >
              <title>ic-image</title>
              <path
                fill="currentColor"
                d="M5 21c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V5c0-.55.2-1.02.59-1.41C3.98 3.19 4.45 3 5 3h14c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v14c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H5Zm0-2h14V5H5v14Zm2-2h10c.2 0 .35-.1.45-.27a.44.44 0 0 0-.05-.53l-2.75-3.67a.48.48 0 0 0-.4-.2c-.17 0-.3.06-.4.2L11.25 16 9.4 13.53a.48.48 0 0 0-.4-.2c-.17 0-.3.06-.4.2l-2 2.67a.44.44 0 0 0-.05.53c.1.18.25.27.45.27Z"
              />
            </svg>
          )}

          <p className="truncate text-[#8696a0] leading-tight">
            {previewText}
          </p>
        </div>
      </div>
    </div>
  );
};

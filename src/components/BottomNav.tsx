import React from 'react';
import { MainTab } from '../types';

interface BottomNavProps {
  activeTab: MainTab;
  isDark?: boolean;
  onChangeTab: (tab: MainTab) => void;
  onNewChat: () => void;
  onMetaAIClick?: () => void;
  unreadChatCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  isDark = true,
  onChangeTab,
  onNewChat,
}) => {
  return (
    <>
      {/* Floating Action Button (FAB) - wds-ic-new-chat-filled */}
      <div className="absolute right-4 bottom-20 z-30 pointer-events-auto">
        <button
          id="new-chat-fab"
          type="button"
          onClick={onNewChat}
          className="w-14 h-14 rounded-[18px] bg-white text-[#0D1015] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Obrolan baru"
          aria-label="Obrolan baru"
        >
          {/* wds-ic-new-chat-filled */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>wds-ic-new-chat-filled</title>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M19.33 4C20.81 4 22 5.2 22 6.67v10.66c0 1.48-1.2 2.67-2.67 2.67H5.67A2.67 2.67 0 0 1 3 17.33V8.85L.94 5.53A1 1 0 0 1 1.8 4h17.54Zm-9.8 9h1.98v1.97c0 .43.25.85.67.98a1 1 0 0 0 1.31-.94v-2.02h1.98c.43 0 .85-.25.98-.67a1 1 0 0 0-.94-1.31h-2.02V9.03c0-.43-.25-.85-.67-.98a1 1 0 0 0-1.31.94v2.02H9.49a1 1 0 0 0-.94 1.31c.13.42.55.67.98.67Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Bar Navigation - 100% matched to IMG-20260910-WA0076.jpg */}
      <nav
        id="bottom-navigation-bar"
        className={`border-t h-[70px] flex items-center justify-around px-1 relative z-20 shrink-0 select-none transition-colors ${
          isDark
            ? 'bg-[#0D1015] border-[#1c222b]'
            : 'bg-white border-gray-100'
        }`}
      >
        {/* Tab 1: Chat (wds-ic-chat-filled) */}
        <button
          id="tab-chat"
          type="button"
          onClick={() => onChangeTab('chat')}
          className="flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer"
        >
          <div className="relative">
            {/* Active Pill */}
            <div
              className={`px-5 py-0.5 rounded-full transition-colors flex items-center justify-center ${
                activeTab === 'chat'
                  ? isDark
                    ? 'bg-[#202c33]'
                    : 'bg-[#d9fdd3]'
                  : ''
              }`}
            >
              {/* WhatsApp Official wds-ic-chat-filled */}
              <svg
                viewBox="0 0 24 24"
                className={`w-6 h-6 ${
                  activeTab === 'chat'
                    ? isDark
                      ? 'text-white'
                      : 'text-[#008069]'
                    : 'text-[#8696a0]'
                }`}
                preserveAspectRatio="xMidYMid meet"
                fill="currentColor"
              >
                <title>wds-ic-chat-filled</title>
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M22 6.67C22 5.19 20.8 4 19.33 4H1.8a1 1 0 0 0-.85 1.53L3 9v8.33C3 18.81 4.2 20 5.67 20h13.66c1.48 0 2.67-1.2 2.67-2.67V6.67ZM7 10a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H8Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <span
            className={`text-[12.5px] mt-1 tracking-tight ${
              activeTab === 'chat'
                ? isDark
                  ? 'text-white font-bold'
                  : 'text-[#008069] font-bold'
                : 'text-[#8696a0] font-medium'
            }`}
          >
            Chat
          </span>
        </button>

        {/* Tab 2: Panggilan (ic-call) */}
        <button
          id="tab-panggilan"
          type="button"
          onClick={() => onChangeTab('panggilan')}
          className="flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer"
        >
          <div
            className={`px-5 py-0.5 rounded-full transition-colors flex items-center justify-center ${
              activeTab === 'panggilan'
                ? isDark
                  ? 'bg-[#202c33]'
                  : 'bg-[#d9fdd3]'
                : ''
            }`}
          >
            {/* WhatsApp Official ic-call */}
            <svg
              viewBox="0 0 24 24"
              className={`w-6 h-6 ${
                activeTab === 'panggilan'
                  ? isDark
                    ? 'text-white'
                    : 'text-[#008069]'
                  : 'text-[#8696a0]'
              }`}
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-call</title>
              <path
                fill="currentColor"
                d="M19.95 21c-2.08 0-4.14-.45-6.17-1.36a18.3 18.3 0 0 1-5.55-3.87 18.47 18.47 0 0 1-3.87-5.54C3.46 8.18 3 6.13 3 4.04A1.02 1.02 0 0 1 4.05 3H8.1c.23 0 .44.08.63.24a.9.9 0 0 1 .32.56l.65 3.5c.03.27.03.5-.02.67-.05.19-.15.35-.28.48L6.97 10.9c.34.62.73 1.21 1.2 1.79.45.57.96 1.13 1.5 1.66A17.59 17.59 0 0 0 13.1 17l2.35-2.35a1.61 1.61 0 0 1 1.3-.4l3.45.7c.23.07.43.19.57.36.16.18.23.37.23.59v4.05A1.02 1.02 0 0 1 19.95 21ZM6.03 9l1.64-1.65L7.25 5H5.03c.08.68.2 1.36.34 2.03.16.66.37 1.32.66 1.97Zm8.95 8.95a12.42 12.42 0 0 0 4.02 1v-2.2l-2.35-.48-1.67 1.68Z"
              />
            </svg>
          </div>
          <span
            className={`text-[12.5px] mt-1 tracking-tight ${
              activeTab === 'panggilan'
                ? isDark
                  ? 'text-white font-bold'
                  : 'text-[#008069] font-bold'
                : 'text-[#8696a0] font-medium'
            }`}
          >
            Panggilan
          </span>
        </button>

        {/* Tab 3: Pembaruan (wds-ic-status) */}
        <button
          id="tab-pembaruan"
          type="button"
          onClick={() => onChangeTab('pembaruan')}
          className="flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer"
        >
          <div
            className={`px-5 py-0.5 rounded-full transition-colors flex items-center justify-center ${
              activeTab === 'pembaruan'
                ? isDark
                  ? 'bg-[#202c33]'
                  : 'bg-[#d9fdd3]'
                : ''
            }`}
          >
            {/* WhatsApp Official wds-ic-status */}
            <svg
              viewBox="0 0 24 24"
              className={`w-6 h-6 ${
                activeTab === 'pembaruan'
                  ? isDark
                    ? 'text-white'
                    : 'text-[#008069]'
                  : 'text-[#8696a0]'
              }`}
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>wds-ic-status</title>
              <path
                fill="currentColor"
                d="M13.56 3.14c.1-.55.62-.92 1.15-.77a10 10 0 0 1 6.98 12.1.91.91 0 0 1-1.23.6c-.52-.18-.78-.75-.66-1.3a8 8 0 0 0-5.44-9.41c-.53-.17-.9-.68-.8-1.22Zm5.34 14.65c.42.35.48.98.08 1.37a10 10 0 0 1-13.96 0c-.4-.39-.34-1.02.08-1.38a1.11 1.11 0 0 1 1.46.09 8 8 0 0 0 10.88 0c.4-.38 1.03-.44 1.45-.09ZM3.54 15.08c-.52.19-1.1-.08-1.23-.62A10 10 0 0 1 9.29 2.37c.53-.15 1.05.22 1.15.77.1.54-.27 1.05-.8 1.22a8 8 0 0 0-5.44 9.42c.12.54-.14 1.1-.66 1.3Z"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span
            className={`text-[12.5px] mt-1 tracking-tight ${
              activeTab === 'pembaruan'
                ? isDark
                  ? 'text-white font-bold'
                  : 'text-[#008069] font-bold'
                : 'text-[#8696a0] font-medium'
            }`}
          >
            Pembaruan
          </span>
        </button>

        {/* Tab 4: Fitur / Fitur Bisnis (storefront) */}
        <button
          id="tab-fitur"
          type="button"
          onClick={() => onChangeTab('fitur')}
          className="flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer"
        >
          <div className="relative">
            <div
              className={`px-5 py-0.5 rounded-full transition-colors flex items-center justify-center ${
                activeTab === 'fitur'
                  ? isDark
                    ? 'bg-[#202c33]'
                    : 'bg-[#d9fdd3]'
                  : ''
              }`}
            >
              {/* WhatsApp Official storefront */}
              <svg
                viewBox="0 0 24 24"
                className={`w-6 h-6 ${
                  activeTab === 'fitur'
                    ? isDark
                      ? 'text-white'
                      : 'text-[#008069]'
                    : 'text-[#8696a0]'
                }`}
                preserveAspectRatio="xMidYMid meet"
                fill="currentColor"
              >
                <title>storefront</title>
                <path
                  fill="currentColor"
                  d="M4 3h16c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 20 5H4a.97.97 0 0 1-.71-.29A.97.97 0 0 1 3 4c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29Zm0 18a.97.97 0 0 1-.71-.29A.97.97 0 0 1 3 20v-6h-.17a.96.96 0 0 1-.78-.36.94.94 0 0 1-.2-.84l1-6a.99.99 0 0 1 .35-.58c.18-.14.4-.22.63-.22h16.35a.99.99 0 0 1 .98.8l.99 6c.07.32 0 .6-.2.84a.96.96 0 0 1-.77.36H21v6c0 .28-.1.52-.29.71A.94.94 0 0 1 20 21a.97.97 0 0 1-.71-.29A.97.97 0 0 1 19 20v-6h-4v6c0 .28-.1.52-.29.71A.94.94 0 0 1 14 21H4Zm1-2h8v-5H5v5Zm-.95-7h15.9l-.6-4H4.65l-.6 4Z"
                />
              </svg>
            </div>

            {/* Bright Green Notification Dot on top-right of Fitur icon - matching screenshot */}
            <span
              id="fitur-green-dot"
              className="absolute -top-0.5 right-3.5 w-3 h-3 rounded-full bg-[#25D366] ring-2 ring-[#0D1015]"
            />
          </div>
          <span
            className={`text-[12.5px] mt-1 tracking-tight ${
              activeTab === 'fitur'
                ? isDark
                  ? 'text-white font-bold'
                  : 'text-[#008069] font-bold'
                : 'text-[#8696a0] font-medium'
            }`}
          >
            Fitur
          </span>
        </button>
      </nav>
    </>
  );
};

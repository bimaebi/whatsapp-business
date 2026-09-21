import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Camera,
  Send,
  User,
  Link as LinkIcon,
} from 'lucide-react';
import { ChatItem, Message } from '../types';
import { HokiBanner } from './HokiBanner';
import { WhatsAppCheck } from './WhatsAppCheck';
import { WhatsAppAvatar } from './WhatsAppAvatar';
import { ProfileView } from './ProfileView';

interface ChatDetailProps {
  chat: ChatItem;
  isDark?: boolean;
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

const getLinkCount = (text: string): number => {
  const urlRegex = /(https?:\/\/[^\s]+|(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:[/?#][^\s]*)?)/gi;
  const matches = text.match(urlRegex);
  return matches ? matches.length : 0;
};

export const ChatDetail: React.FC<ChatDetailProps> = ({
  chat,
  isDark = true,
  onBack,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const messageText = chat.messages[0]?.text ?? chat.lastMessage;
  const linkCount = getLinkCount(messageText);

  const renderInlineFormatting = (text: string, keyPrefix = 'inline'): React.ReactNode[] => {
    const tokenRegex = /(\*_.*?_\*|\*[^*]+\*|_[^_]+_)/g;
    const segments: React.ReactNode[] = [];
    let lastIndex = 0;
    let tokenMatch: RegExpExecArray | null;

    while ((tokenMatch = tokenRegex.exec(text)) !== null) {
      const token = tokenMatch[0];
      const tokenStart = tokenMatch.index;

      if (tokenStart > lastIndex) {
        segments.push(text.slice(lastIndex, tokenStart));
      }

      if (token.startsWith('*_') && token.endsWith('_*')) {
        const innerText = token.slice(2, -2);
        segments.push(
          <strong key={`${keyPrefix}-bold-italic-${tokenStart}`}>
            <em>{innerText}</em>
          </strong>,
        );
      } else if (token.startsWith('*')) {
        const innerText = token.slice(1, -1);
        segments.push(<strong key={`${keyPrefix}-bold-${tokenStart}`}>{innerText}</strong>);
      } else {
        const innerText = token.slice(1, -1);
        segments.push(<em key={`${keyPrefix}-italic-${tokenStart}`}>{innerText}</em>);
      }

      lastIndex = tokenStart + token.length;
    }

    if (lastIndex < text.length) {
      segments.push(text.slice(lastIndex));
    }

    return segments;
  };

  const renderFormattedText = (text: string): React.ReactNode[] => {
    const urlRegex = /(https?:\/\/[^\s]+|(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:[/?#][^\s]*)?)/gi;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = urlRegex.exec(text)) !== null) {
      const rawUrl = match[0];
      const start = match.index;

      if (start > lastIndex) {
        const plainSegment = text.slice(lastIndex, start);
        parts.push(...renderInlineFormatting(plainSegment, `text-${start}`));
      }

      const normalizedUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? rawUrl : `https://${rawUrl}`;

      parts.push(
        <a
          key={`url-${start}`}
          href={normalizedUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[#53bdeb] underline underline-offset-2 break-all"
        >
          {rawUrl}
        </a>,
      );

      lastIndex = start + rawUrl.length;
    }

    if (lastIndex < text.length) {
      parts.push(...renderInlineFormatting(text.slice(lastIndex), `text-${lastIndex}`));
    }

    return parts;
  };

  const formatDisplayTime = (time: string): string => {
    if (!time) return '';

    const parts = time.split('.');
    if (parts.length >= 3) {
      return `${parts[0]}.${parts[1]}`;
    }

    return time;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  if (isProfileOpen) {
    return <ProfileView chat={chat} isDark={isDark} onBack={() => setIsProfileOpen(false)} />;
  }

  return (
    <div
      id="chat-detail-view"
      className={`flex flex-col h-full relative overflow-hidden select-none ${
        isDark ? 'bg-[#0D1015]' : 'bg-white'
      }`}
    >
      {/* Top Header */}
      <header
        id="chat-detail-header"
        className={`px-3 py-2 flex items-center justify-between shadow-xs z-20 border-b ${
          isDark
            ? 'bg-[#0D1015] border-[#1c222b] text-white'
            : 'bg-white border-gray-200 text-[#111b21]'
        }`}
      >
        <div className="flex items-center gap-1">
          <button
            id="back-to-list-btn"
            type="button"
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <WhatsAppAvatar
            size="sm"
            isGroup={chat.isGroup}
            avatar={chat.avatar}
          />

          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className="ml-1 cursor-pointer text-left"
            aria-label={`Buka profil ${chat.name}`}
          >
            <h2 className="text-[17px] font-medium text-white leading-tight">
              {chat.name}
            </h2>
          </button>
        </div>

        <div className="flex items-center gap-4 text-white pr-1">
          {/* ic-videocam - 100% official WhatsApp SVG */}
          <button
            type="button"
            className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            title="Panggilan video"
            onClick={() => alert('Panggilan video ke ' + chat.name)}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-videocam</title>
              <path
                fill="currentColor"
                d="M4 20c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V6c0-.55.2-1.02.59-1.41C2.98 4.19 3.45 4 4 4h12c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v4.5l3.15-3.15c.17-.17.35-.2.55-.13.2.09.3.25.3.48v8.6c0 .23-.1.4-.3.47-.2.09-.38.05-.55-.12L18 13.5V18c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H4Zm0-2h12V6H4v12Z"
              />
            </svg>
          </button>

          {/* ic-call - 100% official WhatsApp SVG */}
          <button
            type="button"
            className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            title="Panggilan suara"
            onClick={() => alert('Panggilan suara ke ' + chat.name)}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-call</title>
              <path
                fill="currentColor"
                d="M19.95 21c-2.08 0-4.14-.45-6.17-1.36a18.3 18.3 0 0 1-5.55-3.87 18.47 18.47 0 0 1-3.87-5.54C3.46 8.18 3 6.13 3 4.04A1.02 1.02 0 0 1 4.05 3H8.1c.23 0 .44.08.63.24a.9.9 0 0 1 .32.56l.65 3.5c.03.27.03.5-.02.67-.05.19-.15.35-.28.48L6.97 10.9c.34.62.73 1.21 1.2 1.79.45.57.96 1.13 1.5 1.66A17.59 17.59 0 0 0 13.1 17l2.35-2.35a1.61 1.61 0 0 1 1.3-.4l3.45.7c.23.07.43.19.57.36.16.18.23.37.23.59v4.05A1.02 1.02 0 0 1 19.95 21ZM6.03 9l1.64-1.65L7.25 5H5.03c.08.68.2 1.36.34 2.03.16.66.37 1.32.66 1.97Zm8.95 8.95a12.42 12.42 0 0 0 4.02 1v-2.2l-2.35-.48-1.67 1.68Z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            title="Menu lainnya"
            onClick={() => alert('Opsi kontak')}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages area with Smiley Wallpaper matching images.jpeg */}
      <div
        id="chat-messages-container"
        className="flex-1 overflow-y-auto p-3 space-y-3 relative"
        style={{
          backgroundColor: '#0D1015',
          backgroundImage: "url('/chat-wallpaper.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Subtle dark tint for chat legibility while preserving vibrant smiley faces */}
        <div className="absolute inset-0 pointer-events-none" />

        {/* Date Badge: Hari ini matching Screenshot_20260911_093411_Clone App.jpg */}
        <div className="flex justify-center my-2 relative z-10">
          <span className="bg-[#182229] text-[#8696a0] text-[11px] font-bold px-3.5 py-1 rounded-[8px] shadow-sm select-none">
            Hari ini
          </span>
        </div>

        {/* End-to-end Encryption Banner matching Screenshot_20260911_093411_Clone App.jpg */}
        <div className="flex justify-center mb-3 px-3 relative z-10">
          <div className="bg-[#0D1015] text-[#ffd279] text-[11px] px-3.5 py-2 rounded-[8px] max-w-[350px] text-center shadow-sm select-none">
            <svg
              viewBox="0 0 24 24"
              height="10"
              width="10"
              preserveAspectRatio="xMidYMid meet"
              className="inline-block mr-1.5 -mt-0.5 align-middle"
              fill="currentColor"
            >
              <title>ic-lock-filled</title>
              <path
                fill="currentColor"
                d="M6 22c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V10c0-.55.2-1.02.59-1.41C4.98 8.19 5.45 8 6 8h1V6c0-1.38.49-2.56 1.46-3.54A4.82 4.82 0 0 1 12 1c1.38 0 2.56.49 3.54 1.46A4.82 4.82 0 0 1 17 6v2h1c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v10c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H6Zm6-5c.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41-.39-.4-.86-.59-1.41-.59-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41 0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59ZM9 8h6V6c0-.83-.3-1.54-.88-2.13A2.9 2.9 0 0 0 12 3c-.83 0-1.54.3-2.13.88A2.9 2.9 0 0 0 9 6v2Z"
              />
            </svg>
            <span>
              Pesan dan telepon terenkripsi secara end-to-end. Hanya orang di obrolan ini yang bisa membaca, mendengarkan, atau membagikannya.{' '}
            </span>
            <span
              className="font-bold cursor-pointer hover:underline"
              onClick={() => alert('Info enkripsi end-to-end')}
            >
              Pelajari selengkapnya.
            </span>
          </div>
        </div>

        {/* Main Message Bubble matching IMG-20260910-WA0075.jpg & Screenshot_20260911_093411_Clone App.jpg */}
        <div className="flex items-end justify-end gap-2 my-2 relative z-10">
          {/* Quick Forward curved arrow floating on the left of bubble */}
          {/* <button
            type="button"
            onClick={() => alert('Teruskan pesan')}
            className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer mb-2 shrink-0"
            title="Teruskan pesan"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
              <polyline points="15 4 20 9 15 14" />
            </svg>
          </button> */}

          {/* Dark Green WhatsApp Bubble (#005c4b) */}
          <div className="max-w-[80%] sm:max-w-[300px] bg-[#134D37] text-[#e9edef] rounded-2xl rounded-tr-xs p-1 shadow-md relative text-[13.5px] leading-relaxed select-text">
            {/* Rich Link Preview Card */}

            {chat.lastMessageImage && (
              <div className="overflow-hidden rounded-xl border border-[#1c222b] bg-[#0D1015]">
                <img
                  src={chat.lastMessageImage}
                  alt="Preview gambar chat"
                  className="max-h-56 w-full object-cover"
                />
              </div>
            )}

            {/* Formatted Message Content matching Image 2 & Screenshot */}
            <div className="p-2 text-[13.5px] font-sans">
              <div className="whitespace-pre-wrap break-words text-white leading-relaxed">
                {renderFormattedText(messageText)}
              </div>
            </div>

            {/* Message Time and Grey Double Checkmarks (Default Centang Abu-Abu) */}
            <div className="flex items-center justify-end gap-1 mt-1.5 text-[11px] text-[#8696a0] pr-1">
              <span>{formatDisplayTime(chat.time)}</span>
              <WhatsAppCheck
                type={chat.status === 'sent' ? 'single' : 'double'}
                color="grey"
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Additional outgoing messages if user types */}
        {chat.messages
          .filter((m) => !m.id.startsWith('msg-'))
          .map((msg) => (
            <div key={msg.id} className="flex justify-end my-1">
              <div className="max-w-[80%] bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-xs p-2.5 shadow-md text-[13.5px]">
                <p className="whitespace-pre-wrap break-words">{renderFormattedText(msg.text)}</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10.5px] text-[#8696a0]">
                  <span>{formatDisplayTime(msg.time)}</span>
                  <WhatsAppCheck
                    type={msg.status === 'sent' ? 'single' : 'double'}
                    color="grey"
                    className="w-3.5 h-3.5"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Chat bottom input bar */}
      <footer
        id="chat-input-bar"
        className={`p-2 flex items-center gap-1 z-10 ${
          isDark ? 'bg-[#0D1015]' : 'bg-white border-t border-gray-100'
        }`}
      >
        <form
          onSubmit={handleSend}
          className={`flex-1 rounded-full flex items-center px-2 py-2 shadow-xs transition-colors ${
            isDark ? 'bg-[#1c222b]' : 'bg-[#f0f2f5]'
          }`}
        >
          <button
            type="button"
            className="text-[#8696a0] hover:text-white p-1 cursor-pointer transition-colors"
            title="Emoji"
          >
            {/* wds-ic-sticker-smiley */}
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>wds-ic-sticker-smiley</title>
              <path
                fill="currentColor"
                d="M8.5 10.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8.5-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.82 19.98A6.97 6.97 0 0 1 12 22H9.27A7.27 7.27 0 0 1 2 14.73V9.27A7.27 7.27 0 0 1 9.27 2h5.46A7.27 7.27 0 0 1 22 9.27v2.54c0 1.94-.77 3.8-2.15 5.17l-3.03 3ZM14.72 4H9.28A5.27 5.27 0 0 0 4 9.27v5.46A5.27 5.27 0 0 0 9.27 20h2.06a.9.9 0 0 0 .68-.88l-.02-2.26v-.11a5.5 5.5 0 0 1-4.65-2.6.6.6 0 0 1 .03-.6c.12-.2.3-.3.53-.3h5.7a4.8 4.8 0 0 1 3.22-1.23l2.26.01c.5 0 .9-.4.9-.9V9.07H20A5.27 5.27 0 0 0 14.73 4Zm-.71 15.11c0 .15-.01.3-.04.44a4.96 4.96 0 0 0 1.44-.99l3.03-3c.46-.46.83-.99 1.09-1.56-.15.02-.3.03-.46.03h-2.26A2.8 2.8 0 0 0 14 16.84l.02 2.26Z"
              />
            </svg>
          </button>

          <input
            id="chat-message-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pesan"
            className="flex-1 bg-transparent px-2.5 text-sm text-[#e9edef] outline-none placeholder-[#8696a0]"
          />

          <div className="flex items-center gap-2 text-[#8696a0]">
            <button
              type="button"
              className="p-1 hover:text-white"
              title="Lampiran"
            >
              <Paperclip className="w-5 h-5 -rotate-45" />
            </button>
            <button
              type="button"
              className="p-1 hover:text-white"
              title="Kamera"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </form>

        <button
          id="chat-send-or-mic-btn"
          type="button"
          onClick={inputText.trim() ? handleSend : () => alert('Perekam suara')}
          className="w-11 h-11 rounded-full bg-[#FFFFFF] hover:bg-[#008f6f] text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer transition-colors"
        >
          {inputText.trim() ? (
            <Send className="w-5 h-5 ml-0.5" />
          ) : (
            /* Filled Microphone Icon matching WhatsApp */
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-black"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>mic-filled</title>
              <path
                fill="currentColor"
                d="M12 14a2.9 2.9 0 0 1-2.13-.88A2.9 2.9 0 0 1 9 11V5c0-.83.3-1.54.88-2.13A2.9 2.9 0 0 1 12 2c.83 0 1.54.3 2.13.88.58.58.87 1.29.87 2.12v6c0 .83-.3 1.54-.88 2.13A2.9 2.9 0 0 1 12 14Zm0 7a1 1 0 0 1-1-1v-2.07a6.66 6.66 0 0 1-4.3-2.33A6.79 6.79 0 0 1 5.06 12c-.07-.55.39-1 .94-1 .55 0 .99.45 1.09 1a4.8 4.8 0 0 0 1.37 2.54A4.82 4.82 0 0 0 12 16c1.38 0 2.56-.49 3.54-1.46a4.8 4.8 0 0 0 1.37-2.55c.1-.54.54-.99 1.09-.99s1 .45.94 1a6.8 6.8 0 0 1-1.64 3.6 6.66 6.66 0 0 1-4.3 2.33V20a1 1 0 0 1-1 1Z"
              />
            </svg>
          )}
        </button>
      </footer>
    </div>
  );
};

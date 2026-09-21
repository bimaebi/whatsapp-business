import React from 'react';
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  MessageSquareText,
  MoreVertical,
  Phone,
  Search,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { ChatItem } from '../types';
import { WhatsAppAvatar } from './WhatsAppAvatar';

interface ProfileViewProps {
  chat: ChatItem;
  isDark?: boolean;
  onBack: () => void;
}

const ListPeopleRefreshedIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    height="24"
    width="24"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <title>list-people-refreshed</title>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 18.38c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.4v-12c0-.56.2-1.03.59-1.42.39-.4.86-.59 1.41-.59h12c.55 0 1.02.2 1.41.59.4.4.59.86.59 1.41v12c0 .55-.2 1.02-.59 1.41-.39.4-.86.6-1.41.6H8Zm7.74-2.75c.56.17 1.08.42 1.56.75h-6.6a5.52 5.52 0 0 1 3.3-1c.6 0 1.18.08 1.74.25ZM4 22.38c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.4v-13c0-.3.1-.53.29-.72.19-.2.43-.29.71-.29.28 0 .52.1.71.29.2.2.29.43.29.71v13h13c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71-.19.2-.43.3-.71.3H4Zm4-6.3a7.77 7.77 0 0 1 6-2.7 7.77 7.77 0 0 1 6 2.7V4.38H8v11.7Zm8.13-5.07a2.9 2.9 0 0 1-2.13.87 2.9 2.9 0 0 1-2.13-.87A2.9 2.9 0 0 1 11 8.88c0-.83.3-1.54.88-2.12A2.9 2.9 0 0 1 14 5.88c.83 0 1.54.3 2.13.88.58.58.87 1.29.87 2.12 0 .83-.3 1.54-.88 2.13ZM15 8.88a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    />
  </svg>
);

const PersonAddIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    height="24"
    width="24"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <title>ic-person-add</title>
    <path
      fill="currentColor"
      d="M18 11h-2a.97.97 0 0 1-.71-.29A.97.97 0 0 1 15 10c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h2V7c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29.28 0 .52.1.71.29.2.19.29.43.29.71v2h2c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 22 11h-2v2c0 .28-.1.52-.29.71A.94.94 0 0 1 19 14a.97.97 0 0 1-.71-.29A.97.97 0 0 1 18 13v-2Zm-9 1a3.9 3.9 0 0 1-2.83-1.18A3.85 3.85 0 0 1 5 8c0-1.1.4-2.04 1.17-2.83A3.85 3.85 0 0 1 9 4c1.1 0 2.04.4 2.82 1.17A3.85 3.85 0 0 1 13 8c0 1.1-.4 2.04-1.18 2.82A3.85 3.85 0 0 1 9 12Zm-8 6v-.8c0-.57.15-1.09.44-1.56a2.9 2.9 0 0 1 1.16-1.09 13.76 13.76 0 0 1 9.65-1.16c1.07.26 2.12.64 3.15 1.16.48.25.87.61 1.16 1.09.3.47.44 1 .44 1.56v.8c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H3c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41Zm2 0h12v-.8a.97.97 0 0 0-.5-.85c-.9-.45-1.8-.79-2.72-1.01a11.6 11.6 0 0 0-5.55 0c-.92.22-1.83.56-2.73 1.01a.97.97 0 0 0-.5.85v.8Zm6-8c.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41C10.02 6.19 9.55 6 9 6c-.55 0-1.02.2-1.41.59C7.19 6.98 7 7.45 7 8c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59Z"
    />
  </svg>
);

const NoteIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    height="24"
    width="24"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <title>ic-note</title>
    <path
      fill="currentColor"
      d="M6 21c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V5c0-.55.2-1.02.59-1.41C4.98 3.19 5.45 3 6 3h7.59c.27 0 .52.1.71.29l4.41 4.41c.19.19.29.44.29.71V19c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H6Zm7-14h4.59L13 4.41V7Zm-5 4h8v2H8v-2Zm0 4h8v2H8v-2Z"
    />
  </svg>
);

const PermMediaIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    height="24"
    width="24"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <title>ic-perm-media</title>
    <path
      fill="currentColor"
      d="M3 21c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V7c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29.28 0 .52.1.71.29.2.19.29.43.29.71v12h16c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 19 21H3Zm4-4c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V4c0-.55.2-1.02.59-1.41C5.98 2.19 6.45 2 7 2h4.18a1.97 1.97 0 0 1 1.4.58L14 4h7c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v9c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H7Zm0-2h14V6h-7.82l-2-2H7v11Zm6.25-3.5L12.1 10a.48.48 0 0 0-.4-.2c-.17 0-.3.07-.4.2l-1.68 2.2a.47.47 0 0 0-.06.53c.1.18.25.27.46.27h7.96c.21 0 .37-.1.46-.28.09-.18.07-.35-.07-.52l-2.42-3.17a.48.48 0 0 0-.4-.2c-.17 0-.3.06-.4.2l-1.9 2.47Z"
    />
  </svg>
);

const UnmuteNotificationsRefreshedIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    height="24"
    width="24"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <title>unmute-notifications-refreshed</title>
    <path
      fill="currentColor"
      d="M5 19a1 1 0 1 1 0-2h1v-7a5.9 5.9 0 0 1 1.25-3.69A5.77 5.77 0 0 1 10.5 4.2v-.7c0-.42.15-.77.44-1.06.29-.3.64-.44 1.06-.44.42 0 .77.15 1.06.44.3.29.44.64.44 1.06v.7a5.77 5.77 0 0 1 3.25 2.11A5.86 5.86 0 0 1 18 10v7h1a1 1 0 1 1 0 2H5Zm7 3c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41h4c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59Zm-4-5h8v-7c0-1.1-.4-2.04-1.18-2.83A3.85 3.85 0 0 0 12 6c-1.1 0-2.04.4-2.82 1.17A3.85 3.85 0 0 0 8 10v7Z"
    />
  </svg>
);

const ImageMediaIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    height="20"
    width="18"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <title>ic-image</title>
    <path
      fill="currentColor"
      d="M5 21c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V5c0-.55.2-1.02.59-1.41C3.98 3.19 4.45 3 5 3h14c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v14c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H5Zm0-2h14V5H5v14Zm2-2h10c.2 0 .35-.1.45-.27a.44.44 0 0 0-.05-.53l-2.75-3.67a.48.48 0 0 0-.4-.2c-.17 0-.3.06-.4.2L11.25 16 9.4 13.53a.48.48 0 0 0-.4-.2c-.17 0-.3.06-.4.2l-2 2.67a.44.44 0 0 0-.05.53c.1.18.25.27.45.27Z"
    />
  </svg>
);

const getLinkCount = (text: string): number => {
  const urlRegex = /(https?:\/\/[^\s]+|(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:[/?#][^\s]*)?)/gi;
  const matches = text.match(urlRegex);
  return matches ? matches.length : 0;
};

export const ProfileView: React.FC<ProfileViewProps> = ({
  chat,
  isDark = true,
  onBack,
}) => {
  const messageText = chat.messages[0]?.text ?? chat.lastMessage;
  const linkCount = getLinkCount(messageText);
  const mediaPreview = chat.lastMessageImage || chat.avatar;

  const actionItems = [
    { icon: Phone, label: 'Panggilan' },
    { icon: Video, label: 'Video' },
    { icon: PersonAddIcon, label: 'Simpan' },
    { icon: Search, label: 'Cari' },
  ];

  return (
    <div
      id="profile-view"
      className={`flex h-full flex-col overflow-hidden ${
        isDark
          ? 'bg-[#0b141a] text-[#e9edef]'
          : 'bg-white text-[#111b21]'
      }`}
    >
      {/* HEADER */}
      <header className="flex h-16 shrink-0 items-center justify-between px-2">
        <button
          type="button"
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-[#202c33]"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-[#202c33]"
          aria-label="Menu"
        >
          <MoreVertical className="h-6 w-6" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">

        {/* PROFILE */}
        <div className="flex flex-col items-center px-4 pb-5 pt-2">
          <WhatsAppAvatar
            size="xl"
            isGroup={chat.isGroup}
            avatar={chat.avatar}
          />

          <h2 className="mt-3 text-[26px] font-normal">
            {chat.name}
          </h2>

          {/* <p className="mt-0.5 text-[14px] text-[#8696a0]">
            +62 858-1245-3592
          </p> */}
        </div>

        {/* ACTION BUTTONS */}
        <div className="px-4 pb-5">
          <div className="grid grid-cols-4 gap-3 px-1">
            {actionItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex flex-col items-center rounded-xl py-1.5 hover:bg-[#202c33]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1f2a33]">
                  <Icon className="h-7 w-7" />
                </div>

                <span className="mt-2 text-[11px] text-[#d1d7db]">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION DIVIDER
        <div className="h-2 bg-[#111b21]" /> */}

        {/* MENU */}
        <div>
          <button
            type="button"
            className="flex h-14 w-full items-center px-4 hover:bg-[#202c33]"
          >
            <ListPeopleRefreshedIcon className="mr-4 h-5 w-5 text-[#aebac1]" />

            <span className="text-[14px]">
              Tambah ke daftar
            </span>
          </button>

          <button
            type="button"
            className="flex h-14 w-full items-center px-4 hover:bg-[#202c33]"
          >
            <NoteIcon className="mr-4 h-5 w-5 text-[#aebac1]" />

            <span className="text-[14px]">
              Tambah catatan
            </span>
          </button>
        </div>

        {/* MEDIA */}
        <div className="mt-2 bg-[#0b141a] px-4 py-3">
          <div className="flex items-center">
            {/* <FileText className="mr-3 h-5 w-5 text-[#aebac1]" /> */}

            <span className="flex-1 text-[14px]">
              Media, tautan, dan dok
            </span>

            <span className="flex items-center text-[13px] text-[#8696a0]">
              {linkCount}
              <ChevronRight className="ml-1 h-4 w-4" />
            </span>
          </div>

          {/* THUMBNAIL */}
          <div className="mt-3 flex gap-1">
            {mediaPreview && (
              <img
                src={mediaPreview}
                alt=""
                className="h-[128px] w-[128px] rounded object-cover"
              />
            )}

            {/* <div className="h-[128px] w-[128px] rounded bg-[#202c33]" /> */}
          </div>
        </div>

        {/* STORAGE */}
        <button
          type="button"
          className="flex min-h-[62px] w-full items-center px-4 hover:bg-[#202c33]"
        >
          <PermMediaIcon className="mr-4 h-5 w-5 text-[#aebac1]" />

          <div className="text-left">
            <p className="text-[14px]">
              Kelola penyimpanan
            </p>

            <p className="mt-0.5 text-[11px] text-[#8696a0]">
              178 kB
            </p>
          </div>
        </button>

        {/* SECTION DIVIDER
        <div className="h-2 bg-[#111b21]" /> */}

        {/* SETTINGS */}
        <button
          type="button"
          className="flex min-h-[62px] w-full items-center px-4 hover:bg-[#202c33]"
        >
          <UnmuteNotificationsRefreshedIcon className="mr-4 h-5 w-5 text-[#aebac1]" />

          <div className="text-left">
            <p className="text-[14px]">
              Notifikasi
            </p>

            <p className="mt-0.5 text-[11px] text-[#8696a0]">
              Aktif
            </p>
          </div>
        </button>

        <button
          type="button"
          className="flex min-h-[62px] w-full items-center px-4 hover:bg-[#202c33]"
        >
          <ImageMediaIcon className="mr-4 h-5 w-5 text-[#aebac1]" />

          <div className="text-left">
            <p className="text-[14px]">
              Visibilitas media
            </p>

            <p className="mt-0.5 text-[11px] text-[#8696a0]">
              Semua orang dapat melihat
            </p>
          </div>
        </button>

        <button
          type="button"
          className="flex min-h-[62px] w-full items-center px-4 hover:bg-[#202c33]"
        >
          <ShieldCheck className="mr-5 h-5 w-5 text-[#aebac1]" />

          <div className="text-left">
            <p className="text-[14px]">
              Enkripsi
            </p>

            <p className="mt-0.5 text-[11px] text-[#8696a0]">
              Pesan terenkripsi secara aman
            </p>
          </div>
        </button>

        {/* BOTTOM SPACE */}
        <div className="h-8" />
      </div>
    </div>
  );
};
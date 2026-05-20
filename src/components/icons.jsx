import React from 'react';

export const PhoneIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.1 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.3 7.6a16 16 0 006.16 6.16l1.02-1.02a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

export const CartIcon = ({ count = 0 }) => (
  <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
    {count > 0 && (
      <span style={{ position: 'absolute', top: -8, right: -8, background: '#E8A838', color: '#1A2B1E', borderRadius: '50%', width: 17, height: 17, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit',sans-serif" }}>
        {count > 9 ? '9+' : count}
      </span>
    )}
  </span>
);

export const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export const PlusIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export const MinusIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
);

export const CloseIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export const StarIcon = ({ filled = false, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#E8A838' : 'none'} stroke="#E8A838" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export const MapPinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export const ClockIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
);

export const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
);

export const IconNatural = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#E8F4E8" stroke="#4A8A5A" strokeWidth="1.5"/>
    <path d="M24 36 C24 36 14 28 14 20 C14 15.6 18.7 12 24 12 C29.3 12 34 15.6 34 20 C34 28 24 36 24 36Z" fill="#5AA860" opacity="0.2"/>
    <path d="M24 34 C24 34 16 27 16 20.5 C16 16.9 19.7 14 24 14 C28.3 14 32 16.9 32 20.5 C32 27 24 34 24 34Z" fill="#4A8A5A" opacity="0.5"/>
    <path d="M24 32 C24 32 18.5 26.5 18.5 21.5 C18.5 18.7 21 16.5 24 16.5 C27 16.5 29.5 18.7 29.5 21.5 C29.5 26.5 24 32 24 32Z" fill="#2D6B3A"/>
    <line x1="24" y1="34" x2="24" y2="38" stroke="#2D6B3A" strokeWidth="2" strokeLinecap="round"/>
    <line x1="21" y1="37" x2="27" y2="37" stroke="#2D6B3A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconSpeed = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#FFF4E8" stroke="#C4673A" strokeWidth="1.5"/>
    <path d="M24 14 L26 22 L32 18 L26 24 L34 26 L24 28 L22 36 L20 28 L12 30 L20 24 L14 18 L22 22 Z" fill="#C4673A" opacity="0.7"/>
    <circle cx="24" cy="24" r="3" fill="#C4673A"/>
  </svg>
);

export const IconPrice = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#FFF8E8" stroke="#E8A838" strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="12" stroke="#E8A838" strokeWidth="2" fill="none"/>
    <text x="24" y="29" textAnchor="middle" fontSize="14" fontWeight="700" fill="#C4673A" fontFamily="sans-serif">₽</text>
  </svg>
);

export const IconFresh = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#E8F0FF" stroke="#4A6A9A" strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="10" stroke="#4A6A9A" strokeWidth="2" fill="none"/>
    <path d="M24 14 L24 16 M24 32 L24 34 M14 24 L16 24 M32 24 L34 24" stroke="#4A6A9A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 24 L23 21 L26 24 L23 27 Z" fill="#4A6A9A"/>
  </svg>
);

export const LogoMark = () => (
  <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #C4673A, #E8A838)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  </div>
);

export const FoodIllustration = ({ cat, size = 60 }) => {
  const configs = {
    soups:    { bg: '#E8D5B7', emoji: '🍲' },
    mains:    { bg: '#C8DFC8', emoji: '🍽️' },
    salads:   { bg: '#D4EAD4', emoji: '🥗' },
    desserts: { bg: '#F0D4D4', emoji: '🍰' },
    drinks:   { bg: '#D4DCF0', emoji: '🥤' },
    bakery:   { bg: '#F0E4C8', emoji: '🥐' },
  };
  const cfg = configs[cat] || { bg: '#F0EDE8', emoji: '🍴' };
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.45 }}>
      {cfg.emoji}
    </div>
  );
};

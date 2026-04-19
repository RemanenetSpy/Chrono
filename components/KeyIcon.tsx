import React from 'react';

interface KeyIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const KeyIcon: React.FC<KeyIconProps> = ({ className = '', ...props }) => (
  <svg viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
    <path d="M12 2 C 6 2, 4 6, 4 10 C 4 14, 8 16, 12 16 C 16 16, 20 14, 20 10 C 20 6, 18 2, 12 2 Z" />
    <circle cx="12" cy="9" r="2" />
    <path d="M12 16 L12 46" />
    <path d="M12 36 L18 36 L18 39 L15 39 L15 42 L18 42 L18 45 L12 45" />
    <path d="M10 46 L12 48 L14 46 Z" fill="currentColor" />
  </svg>
);

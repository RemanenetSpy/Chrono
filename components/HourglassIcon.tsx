import React from 'react';
import { Hourglass } from 'lucide-react';

interface HourglassIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const HourglassIcon: React.FC<HourglassIconProps> = ({ className = '', ...props }) => (
  <Hourglass className={className} strokeWidth={1.5} {...props} />
);

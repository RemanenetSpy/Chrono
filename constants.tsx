
import { TemporalGate } from './types';

export const THEMES = {
  neon: 'from-zinc-800 to-zinc-900 border-indigo-500/20',
  sunset: 'from-zinc-800 to-zinc-900 border-amber-500/20',
  ocean: 'from-zinc-800 to-zinc-900 border-sky-500/20',
  minimal: 'from-zinc-800 to-zinc-900 border-white/10',
};

export interface TimeOption {
  label: string;
  value: number;
  isPublic: boolean;
  gate: TemporalGate;
}

export const TIME_OPTIONS: TimeOption[] = [
  { label: 'Moments', value: 60 * 1000, isPublic: true, gate: 'MOMENT' },
  { label: 'A Day', value: 24 * 60 * 60 * 1000, isPublic: true, gate: 'DAILY' },
  { label: 'A Moon', value: 30 * 24 * 60 * 60 * 1000, isPublic: true, gate: 'MOON' },
  { label: 'A Year', value: 365 * 24 * 60 * 60 * 1000, isPublic: false, gate: 'YEAR' },
  { label: 'A Decade', value: 10 * 365 * 24 * 60 * 60 * 1000, isPublic: false, gate: 'DECADE' },
];

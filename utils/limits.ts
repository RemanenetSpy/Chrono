import { TemporalGate } from '../types';

export interface GateLimits {
  creationLimit: { count: number; period: 'day' | 'week' | 'year' | 'unlimited' };
  activeLimit: number | 'unlimited';
  maxImages: number;
  maxAudioMinutes: number;
  isLocked: boolean;
}

export const getGateLimits = (gate: TemporalGate, isPremium: boolean): GateLimits => {
  if (gate === 'MOMENT') {
    return isPremium 
      ? { creationLimit: { count: -1, period: 'unlimited' }, activeLimit: 'unlimited', maxImages: 1, maxAudioMinutes: 3, isLocked: false }
      : { creationLimit: { count: 3, period: 'day' }, activeLimit: 'unlimited', maxImages: 0, maxAudioMinutes: 0, isLocked: false };
  }
  if (gate === 'DAILY') {
    return isPremium
      ? { creationLimit: { count: 1, period: 'day' }, activeLimit: 'unlimited', maxImages: 3, maxAudioMinutes: 5, isLocked: false }
      : { creationLimit: { count: 1, period: 'day' }, activeLimit: 'unlimited', maxImages: 1, maxAudioMinutes: 0, isLocked: false };
  }
  if (gate === 'MOON') {
    return isPremium
      ? { creationLimit: { count: 1, period: 'day' }, activeLimit: 'unlimited', maxImages: 10, maxAudioMinutes: 10, isLocked: false }
      : { creationLimit: { count: 1, period: 'day' }, activeLimit: 3, maxImages: 1, maxAudioMinutes: 0, isLocked: false };
  }
  if (gate === 'YEAR') {
    return isPremium
      ? { creationLimit: { count: 1, period: 'week' }, activeLimit: 'unlimited', maxImages: 20, maxAudioMinutes: 15, isLocked: false }
      : { creationLimit: { count: 0, period: 'unlimited' }, activeLimit: 0, maxImages: 0, maxAudioMinutes: 0, isLocked: true };
  }
  if (gate === 'DECADE') {
    return isPremium
      ? { creationLimit: { count: 1, period: 'year' }, activeLimit: 'unlimited', maxImages: 50, maxAudioMinutes: 30, isLocked: false }
      : { creationLimit: { count: 0, period: 'unlimited' }, activeLimit: 0, maxImages: 0, maxAudioMinutes: 0, isLocked: true };
  }
  
  return { creationLimit: { count: 0, period: 'unlimited' }, activeLimit: 0, maxImages: 0, maxAudioMinutes: 0, isLocked: true };
};

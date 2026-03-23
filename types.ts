
export type TemporalGate = 'MOMENT' | 'DAILY' | 'MOON' | 'YEAR' | 'DECADE';

export interface Capsule {
  id: string;
  content: string;
  imageUrl?: string;
  audioUrl?: string;
  createdAt: number;
  unlockAt: number;
  isUnlocked: boolean;
  title: string;
  sender: string;
  theme: 'neon' | 'sunset' | 'ocean' | 'minimal';
  hasReflection?: boolean;
  reflection?: string;
  gate: TemporalGate;
}

export interface UserProfile {
  name: string;
  bio: string;
  joinedDate: number;
  isPremium?: boolean;
}

export type ViewState = 'VAULT' | 'CREATE' | 'DETAIL' | 'PROFILE';

export interface AppState {
  capsules: Capsule[];
  currentView: ViewState;
  selectedCapsuleId: string | null;
  profile: UserProfile;
}

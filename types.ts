
export type CapsuleType = 'TEXT' | 'IMAGE';

export interface Capsule {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: number;
  unlockAt: number;
  isUnlocked: boolean;
  title: string;
  sender: string;
  theme: 'neon' | 'sunset' | 'ocean' | 'minimal';
  hasReflection?: boolean;
  reflection?: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  joinedDate: number;
}

export type ViewState = 'VAULT' | 'CREATE' | 'DETAIL' | 'PROFILE';

export interface AppState {
  capsules: Capsule[];
  currentView: ViewState;
  selectedCapsuleId: string | null;
  profile: UserProfile;
}

import CryptoJS from 'crypto-js';
import { Capsule } from '../types';

// A static salt/key for the MVP client-side encryption.
// In a full production app with a backend, this would be derived from a user password
// or a secure key exchange mechanism. For the local-storage MVP, this ensures
// the data is AES-256 encrypted at rest.
const SECRET_KEY = 'chronos_mvp_aes_256_secure_key_!@#';

export const encryptCapsuleData = (capsule: Capsule & { _isEncrypted?: boolean }): Capsule => {
  // If it's already encrypted (e.g. decryption failed earlier), don't double-encrypt
  if (capsule._isEncrypted) {
    return capsule as Capsule;
  }

  // We only encrypt the sensitive content. Metadata like unlockAt is kept plain
  // so the UI can render the countdown timers.
  const encryptedContent = CryptoJS.AES.encrypt(capsule.content, SECRET_KEY).toString();
  
  let encryptedReflection = capsule.reflection;
  if (capsule.reflection) {
    encryptedReflection = CryptoJS.AES.encrypt(capsule.reflection, SECRET_KEY).toString();
  }

  let encryptedImageUrl = capsule.imageUrl;
  if (capsule.imageUrl) {
    encryptedImageUrl = CryptoJS.AES.encrypt(capsule.imageUrl, SECRET_KEY).toString();
  }

  let encryptedAudioUrl = capsule.audioUrl;
  if (capsule.audioUrl) {
    encryptedAudioUrl = CryptoJS.AES.encrypt(capsule.audioUrl, SECRET_KEY).toString();
  }

  return {
    ...capsule,
    content: encryptedContent,
    reflection: encryptedReflection,
    imageUrl: encryptedImageUrl,
    audioUrl: encryptedAudioUrl,
    // Add a flag so we know this capsule is encrypted in storage
    _isEncrypted: true,
  } as Capsule & { _isEncrypted?: boolean };
};

export const decryptCapsuleData = (capsule: Capsule & { _isEncrypted?: boolean }): Capsule => {
  // If it's an old capsule that wasn't encrypted, return it as is
  if (!capsule._isEncrypted) {
    return capsule;
  }

  try {
    const decryptedContent = CryptoJS.AES.decrypt(capsule.content, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    
    let decryptedReflection = capsule.reflection;
    if (capsule.reflection) {
      decryptedReflection = CryptoJS.AES.decrypt(capsule.reflection, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }

    let decryptedImageUrl = capsule.imageUrl;
    if (capsule.imageUrl) {
      decryptedImageUrl = CryptoJS.AES.decrypt(capsule.imageUrl, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }

    let decryptedAudioUrl = capsule.audioUrl;
    if (capsule.audioUrl) {
      decryptedAudioUrl = CryptoJS.AES.decrypt(capsule.audioUrl, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }

    const { _isEncrypted, ...rest } = capsule;
    
    return {
      ...rest,
      content: decryptedContent,
      reflection: decryptedReflection,
      imageUrl: decryptedImageUrl,
      audioUrl: decryptedAudioUrl,
    } as Capsule;
  } catch (e) {
    console.error("Failed to decrypt capsule", e);
    return capsule; // Fallback, though it will show gibberish
  }
};

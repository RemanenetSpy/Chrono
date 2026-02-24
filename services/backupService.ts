
/**
 * Proprietary Chronos Vault Service
 * Implements app-bound encryption and integrity checks.
 */

const ALGORITHM = 'AES-GCM';
const HMAC_ALGORITHM = 'HMAC';
const KEY_LENGTH = 256;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const ITERATIONS = 120000;

// App-bound internal salt - ensures files are useless without Chronos logic
const CHRONOS_IDENTITY_PREFIX = "CHRONOS_INTERNAL_VAULT_v1_";

const bufferToHex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const hexToBuffer = (hex: string): Uint8Array => {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex string');
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
};

/**
 * Robust Base64 for bytes
 */
const bytesToBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const base64ToBytes = (base64: string): Uint8Array => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

export const encryptVault = async (data: string, passphrase: string): Promise<string> => {
  const encoder = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  // Combine user passphrase with app identity for "Chronos-only" bound key
  const combinedSecret = encoder.encode(CHRONOS_IDENTITY_PREFIX + passphrase);

  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    combinedSecret,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // Derive the AES Encryption Key
  const encryptionKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256'
    },
    baseKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt']
  );

  // Derive a separate HMAC key for integrity check
  const hmacKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    false,
    ['sign']
  );

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    encryptionKey,
    encoder.encode(data)
  );

  // Sign the encrypted data for integrity
  const signature = await window.crypto.subtle.sign(
    { name: HMAC_ALGORITHM },
    hmacKey,
    encryptedData
  );

  const vault = {
    v: "2.0",
    identity: "chronos-sealed",
    salt: bufferToHex(salt),
    iv: bufferToHex(iv),
    payload: bufferToHex(encryptedData),
    signature: bufferToHex(signature)
  };

  // Safe encoding of JSON string to base64
  const vaultJson = JSON.stringify(vault);
  return bytesToBase64(encoder.encode(vaultJson));
};

export const decryptVault = async (base64Vault: string, passphrase: string): Promise<string> => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  
  // Safe decoding from base64 to JSON string
  const vaultBytes = base64ToBytes(base64Vault);
  const vaultJson = decoder.decode(vaultBytes);
  const vault = JSON.parse(vaultJson);

  if (vault.v !== "2.0" || vault.identity !== "chronos-sealed") {
    throw new Error('Incompatible vault format');
  }

  const salt = hexToBuffer(vault.salt);
  const iv = hexToBuffer(vault.iv);
  const payload = hexToBuffer(vault.payload);
  const signature = hexToBuffer(vault.signature);

  const combinedSecret = encoder.encode(CHRONOS_IDENTITY_PREFIX + passphrase);

  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    combinedSecret,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // Derive the same keys
  const encryptionKey = await window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['decrypt']
  );

  const hmacKey = await window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    false,
    ['verify']
  );

  // Verify Integrity First
  const isValid = await window.crypto.subtle.verify(
    { name: HMAC_ALGORITHM },
    hmacKey,
    signature,
    payload
  );

  if (!isValid) {
    throw new Error('Integrity check failed. Incorrect security key or tampered file.');
  }

  // Decrypt
  const decrypted = await window.crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    encryptionKey,
    payload
  );

  return decoder.decode(decrypted);
};

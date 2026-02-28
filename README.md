
# Chronos: Temporal Legacy Vault

> "Capturing the fragments of today for the clarity of tomorrow."

**Chronos** is a luxury minimalist digital sanctuary designed for intentional reflection. It allows you to compose letters and attach "visual echoes" (photos) to be delivered to your future self. By locking memories behind a temporal gate, Chronos transforms social posting into a private ritual of mindfulness.

---

## 📜 The Purpose

In an era of instant gratification and ephemeral content, Chronos asks you to slow down. The purpose of this project is to create a space where thoughts can mature. Whether it's a message of encouragement for a difficult week ahead, a photo of a fleeting moment you want to revisit in a year, or a "moon"-long commitment to a goal, Chronos ensures your message arrives exactly when it's meant to.

## ✨ Key Features

- **Compose Across Time**: Write rich, serif-styled letters to the future with an elegant editor.
- **Visual Echoes**: Attach images to your capsules to ground your memories in reality.
- **Temporal Gates**: Choose your horizon—from a single "Moon" (30 days) to a full "Decade."
- **Proprietary Vaults**: Export your memories as `.chronosvault` files. These use app-bound AES-256 encryption combined with HMAC integrity signatures, making them unreadable outside the Chronos ecosystem.
- **The Vault**: A curated gallery of your pending and revealed history, styled as an elegant stationery collection with a dramatic editorial layout.
- **Memoir**: A personal profile and analytics suite to track your growth and manage your temporal legacy.
- **Reflections**: Once a capsule is revealed, add a modern perspective to your past thoughts to see how much you've grown.
- **Privacy-First**: All data is stored locally in your chronicle (browser storage), ensuring your letters remain your own.

## 🎨 Design Philosophy: "Luxury Minimal"

Chronos moves away from the aggressive "tech" aesthetic of modern social media. It utilizes:
- **Warm Light Themes**: A parchment-inspired background (`#f2f2f0`) that is easy on the eyes and feels tactile.
- **Literary Typography**: The use of *Cormorant Garamond* provides a classic, timeless feel for your most important thoughts.
- **Minimalist Animation**: Subtle "fade-up" transitions and fine-line borders that mimic high-quality stationery.
- **Atmospheric Depth**: A soft grain overlay and deep, sophisticated shadows to give the digital interface a physical, paper-like soul.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Icons**: Font Awesome 6
- **Typography**: Cormorant Garamond (Serif), Inter (Sans), JetBrains Mono (Mono)
- **Security**: SubtleCrypto API for AES-256-GCM encryption
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Security & Privacy

Chronos is built on the principle of **Local-First**. 
- **Zero-Knowledge**: Your letters are encrypted on your device.
- **No Cloud Sync**: By default, your data never leaves your browser's local storage.
- **Vault Backups**: Use the "Export Vault" feature to create encrypted backups of your chronicle.

## ⚖️ License

Distributed under the **MIT License**. See the footer of the application for more details. This project is open for anyone to use, modify, and chronicle their own journeys.

---

*Curated with continuity in mind.*

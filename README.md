# Luxury Muslim Wedding Invitation Website

A breathtaking, interactive Muslim wedding invitation web experience built with React.js, Tailwind CSS, and TypeScript. Featuring a 3D animated wax-sealed envelope, flowing sheer curtains, delicate white roses, gentle drifting petals, and complete trilingual support in **English**, **Urdu (اردو)**, and **Arabic (العربية)**.

---

## Features

- **Cinematic Opening Envelope**: 
  - Realistic ivory handmade cotton paper envelope with engraved champagne gold wax seal.
  - Interactive wax seal with 3D press, subtle fracture/crack animation, flap unfolding, and invitation card gliding out.
  - Full keyboard accessibility and mobile touch optimization.
- **Trilingual Support (English, Urdu, Arabic)**:
  - Instant language switcher with zero page reloads.
  - Respectful RTL (right-to-left) text flow, Nastaliq typography for Urdu (`Noto Nastaliq Urdu`), and classical Arabic typography (`Amiri`).
  - Persistent language preference stored in `localStorage`.
- **Islamic Wedding Aesthetics**:
  - Sacred Bismillah calligraphy (`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`).
  - Traditional Sunnah barakah dua (`بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ`).
  - Quranic verse from Surah Ar-Rum 30:21.
- **Comprehensive Wedding Details**:
  - Nikah Ceremony stationery panel.
  - **Add to Calendar**: Generates and downloads real `.ics` calendar events dynamically.
  - **View Location**: One-click direct link to Google Maps.
- **Save the Date Month Calendar**:
  - Refined stationery calendar grid with the wedding date marked in a metallic gold heart outline with glowing pulse.
- **Live Wedding Countdown**:
  - Real-time countdown tracking days, hours, minutes, and seconds with tabular numerals and graceful handling upon arrival.
- **Peaceful Ambient Soundscape**:
  - Instrumental-free harmonic tone generator synthesized via Web Audio API. Voluntary toggle, never autoplays.
- **Customization Bar**:
  - In-app preview tool allowing the couple to test their real names, wax seal initials, and ceremony preferences in real-time.

---

## Local Development Setup

### Prerequisites
- Node.js (version 18 or later)
- npm or yarn

### Steps to Run Locally
1. Clone the repository or navigate to the project directory:
   ```bash
   cd wedding-invitation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Deployment Instructions for Vercel

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to [Vercel](https://vercel.com).
3. Click **"Add New..."** → **"Project"**.
4. Import your wedding invitation repository.
5. In the **Build and Output Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Vercel will build and publish your luxury wedding invitation with high-speed global CDN hosting.

---

## Customizing Wedding Details

Edit `src/config/weddingConfig.ts` to customize:
- `groom.name` and `bride.name` (in English, Urdu, and Arabic)
- `initials` (for the wax seal, e.g., `"Z & A"`)
- `nameOrder` (`'groom_first'` or `'bride_first'`)
- `eventDateTimeISO` (the ceremony timestamp for the live countdown)
- `nikah` details (venue, address, time, and map query)
- `dressCode` text


---

## Webaura multi-client productization status

This repository currently contains the invitation **template and guest experience**. It is not yet a complete multi-client product: wedding data is currently initialized from `src/config/weddingConfig.ts`, and the preview customizer stores edits in the current browser's `localStorage`. Those edits do not automatically sync to guests or other devices.

Productization docs and starter Firebase configuration:

- [Productization plan](docs/PRODUCTIZATION_PLAN.md)
- [Client onboarding checklist](docs/CLIENT_ONBOARDING_CHECKLIST.md)
- [Starter Firestore security rules](firestore.rules)
- [Firebase Emulator/rules configuration](firebase.json)

### Before production use

1. Do not publish the sample couple/venue as a real invitation.
2. Implement Firebase-backed slug loading and an authenticated Webaura operator workspace (planned Phase 2/3 in the productization plan).
3. Test the Firestore rules with the Firebase Emulator Suite; the starter rules have not yet been emulator-tested.
4. Run `npm run build` and `npm run lint`, then test the deployed guest link from a second device.
5. Keep Firebase Admin credentials and private keys out of frontend code and Vite environment variables.

The presence of `firebase.json` and `firestore.rules` does not by itself connect the React app to Firebase or make the editor secure. Treat the rules as a starting point that must be tested and reviewed before production.

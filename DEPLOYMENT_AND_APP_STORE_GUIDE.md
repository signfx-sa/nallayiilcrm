# 📱 Telecalling CRM - Production Hosting & App Store Deployment Guide
**Engineered & Powered by Brand.B (Muhammed Munshid Kuruvangadan)**

---

## 🔒 1. GitHub & Security Architecture (സുരക്ഷയും GitHub ഹോസ്റ്റിംഗും)

### Q: Can I push this repository to GitHub safely?
**Yes, absolutely! Here are the critical security rules:**

1. **Keep your GitHub Repository `Private`:**
   - Always create a **Private Repository** on GitHub (`github.com/new`).
   - Do NOT push your live passwords or client leads to a public repository.

2. **`.gitignore` is Pre-configured:**
   - The `.gitignore` file automatically blocks `.env` (your live passwords) and `data/` (your client database) from being uploaded to GitHub.
   - Anyone viewing your code on GitHub will only see the application engine, never your passwords or private business leads.

3. **Server-Side Security (Bank-Grade PBKDF2 Hashing):**
   - In `server.js`, passwords are encrypted using **PBKDF2 with unique cryptographic salt**.
   - Even if someone gains read access to the database, passwords can never be reversed into plain text.

---

## 🌐 2. Hosting on a Custom Domain / Cloud Server (ഡൊമെയ്നിൽ ഹോസ്റ്റ് ചെയ്യൽ)

To connect all telecallers on mobile phones with managers on laptops in real-time, deploy `server.js` on a live server:

### Option A: Free & Easy Cloud Hosting (Render / Railway / Fly.io)
1. Push your code to your Private GitHub repository.
2. Sign up on [Render.com](https://render.com) or [Railway.app](https://railway.app).
3. Click **"New Web Service"** and select your GitHub repository.
4. Settings:
   - **Environment:** `Node.js`
   - **Build Command:** `npm install` (or leave empty)
   - **Start Command:** `node server.js`
5. Under **Environment Variables**, add:
   - `ADMIN_EMAIL`: `your-email@company.com`
   - `ADMIN_PASSWORD`: `YourStrongPassword123`
   - `COMPANY_NAME`: `Nallayil Ayurvedha`
   - `THEME_PRESET`: `emerald`
6. Click **Deploy**. Within 2 minutes, you get an official HTTPS live domain (e.g. `https://nallayil-crm.onrender.com`)!
7. Point your custom domain (e.g. `crm.nallayil.com`) using a CNAME record.

---

## 📱 3. Android & iOS App Deployment (Google Play Store & Apple App Store)

You can turn this web application into official native Android and iOS mobile apps using **Capacitor**:

### Step 1: Install Capacitor in your local terminal:
```bash
npm install
npm run android:add    # Creates native Android Studio project
npm run ios:add        # Creates native Apple Xcode project
npm run app:sync       # Syncs web assets to native app folders
```

### Step 2: Android App (Google Play Store):
1. Run: `npm run android:open`
   - This opens the project directly inside **Android Studio**.
2. Connect an Android phone or launch an emulator to test calling and dialer.
3. In Android Studio, go to **Build → Generate Signed Bundle / APK**.
4. Choose **Android App Bundle (`.aab`)**.
5. Upload the `.aab` file to your [Google Play Console](https://play.google.com/console).

### Step 3: iOS App (Apple App Store):
*(Requires a Mac with Xcode installed)*
1. Run: `npm run ios:open`
   - This opens the project directly inside **Xcode**.
2. Select your Apple Developer Team under **Signing & Capabilities**.
3. Go to **Product → Archive**.
4. Click **Distribute App** to upload directly to [Apple App Store Connect](https://appstoreconnect.apple.com).

---

## ⚡ 4. Instant PWA Mobile Installation (No Store Wait Needed!)

Before waiting for Google or Apple app approvals, telecallers can install the CRM directly from mobile browsers:
1. Open your CRM link (e.g. `https://crm.yourcompany.com`) on any Android phone (Chrome) or iPhone (Safari).
2. **On Android:** Tap the three dots (⋮) → tap **"Install App"** or **"Add to Home screen"**.
3. **On iPhone:** Tap the Share icon (⎙) → tap **"Add to Home Screen"**.
4. The **Telecalling CRM** app icon will appear directly on their mobile home screen and open in full-screen standalone mode without any browser URL bars!

---

## 🏢 5. Adding Another Company (Multi-Client Architecture)

To launch a CRM for a new client (e.g. "Apex Real Estate"):
1. Duplicate this folder.
2. In `crm-config.js`:
   - Change `companyName: "Apex Real Estate"`
   - Change `themePreset: "navy"` (or amber/ruby/slate)
   - Change `storagePrefix: "crm_apex"` (guarantees separate database)
3. Set their admin email in `.env` or `crm-config.js`.
4. Deploy — You now have a fully branded, independent CRM for that client!

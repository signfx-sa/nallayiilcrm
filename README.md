# 📞 Telecalling CRM & Mobile Outreach Platform
**Engineered & Powered by Brand.B (Founder: Muhammed Munshid Kuruvangadan)**

An enterprise-grade, high-velocity Telecalling & Lead Management platform built with strict Role-Based Access Control (RBAC), multi-tenant company isolation, dynamic color branding, and synchronized Desktop & Mobile dialer interfaces.

---

## 🔑 1. Managing & Creating Passwords 

### Method A: Direct Master Admin Password via `crm-config.js` (Recommended)
You can set or change your primary Master Administrator login credentials directly in **`crm-config.js`**:
```javascript
// crm-config.js
const CRM_CONFIG = {
  // Master Administrator Credentials
  adminUser: {
    name: "Muhammed Munshid",
    email: "kmunshidk@gmail.com", // Your Administrator Email
    password: "admin123",         // Your Administrator Password
    role: "Admin"
  },
  ...
};
```
- **How it works:** Whenever you open `login.html`, the authentication gateway directly verifies against `CRM_CONFIG.adminUser`.
- **Immediate Effect:** Changing the email or password in this file takes effect instantly for your next sign-in—no terminal commands, database migrations, or browser cache clearing needed!

---

### Method B: Change Any Staff Member's Password via Workspace Settings (UI)
As an Administrator, you can view and edit passwords for any team member (Callers, Team Leaders, Managers):
1. Sign in as an **Admin** (`kmunshidk@gmail.com` / `admin123`).
2. Go to **Settings** from the left sidebar.
3. Locate the **"🔐 Authorized Personnel & Login Access"** card.
4. Click the **"✏️ Edit"** button next to any person's name.
5. In the **Edit Authorized Personnel** modal:
   - Update their **Authorized Work Email**.
   - Type a new **Login Password** (click the eye icon 👁️ to verify).
   - Change their **Role** (Admin, Manager, Team Lead, Caller) or **Account Status** (Active / Suspended).
6. Click **"Save Changes"**.
   - Credentials update immediately. The user can now log in using the updated password right away!

---

### Method C: Production Server Passwords (`.env`)
When running on a live domain with Node.js (`server.js`), you can also configure your credentials via `.env`:
```ini
ADMIN_NAME=Muhammed Munshid
ADMIN_EMAIL=kmunshidk@gmail.com
ADMIN_PASSWORD=your_secure_password_here
```
The server hashes this password with **PBKDF2 and a unique cryptographic salt** on the server, ensuring zero plain text password exposure.

---

## 🏢 2. How to Add or Change Companies 

This platform is engineered with a **Multi-Tenant Architecture**, allowing you to launch independent CRM systems for any business (e.g. Healthcare, Real Estate, Fashion, Travel, Consultancy) in under 2 minutes.

To configure a new company, open **`crm-config.js`**:

```javascript
const CRM_CONFIG = {
  // 1. Company Name & Contact Info
  companyName: "Apex Real Estate",                 // Your client's company name
  tagline: "Prime Property Consulting & Lead Desk", // Brand subtitle
  industry: "Real Estate & Housing",
  supportEmail: "info@apexrealty.com",
  phone: "+91 98470 11111",

  // 2. Visual Theme Preset
  // Choose one: "emerald", "navy", "amber", "ruby", "indigo", "slate"
  themePreset: "navy",

  // 3. Storage Prefix (CRITICAL: Database Isolation)
  // Give each company a unique key (e.g. "crm_apex", "crm_nallayil", "crm_coatrental").
  // This guarantees that leads, calls, and users for this company will NEVER mix with any other!
  storagePrefix: "crm_apex",

  // 4. Master Administrator for this Company
  adminUser: {
    name: "Apex Admin",
    email: "admin@apexrealty.com",
    password: "apexpassword123",
    role: "Admin"
  },

  // 5. Pre-configured Staff Accounts for this Company
  defaultTeam: [
    { name: "Apex Admin", email: "admin@apexrealty.com", password: "apexpassword123", role: "Admin" },
    { name: "Team Manager", email: "manager@apexrealty.com", password: "manager123", role: "Manager" },
    { name: "Senior Caller", email: "caller1@apexrealty.com", password: "caller123", role: "Caller" }
  ],

  // 6. Producer Information (Brand.B)
  producer: {
    brandName: "BrandB",
    founder: "Muhammed Munshid Kuruvangadan",
    badgeText: "Powered by",
    tagline: "Enterprise Telecalling Platform Architecture"
  }
};
```

### Ready-to-Use Company Templates:

| Industry | Company Name | Theme (`themePreset`) | Storage Key (`storagePrefix`) |
| :--- | :--- | :--- | :--- |
| **Ayurveda / Healthcare** | *Nallayil Ayurvedha* | `"emerald"` (Herbal Green) | `"crm_nallayil"` |
| **Formal Wear / Rental** | *Coat Rental* | `"navy"` (Executive Blue) | `"crm_coatrental"` |
| **Real Estate / Housing** | *Apex Properties* | `"navy"` or `"slate"` | `"crm_apex"` |
| **Luxury Boutique / Bridal**| *Royal Bridal Studio* | `"amber"` (Warm Gold) | `"crm_royal"` |
| **Hospitality / Restaurant**| *Spice Route Group* | `"ruby"` (Crimson Red) | `"crm_spiceroute"` |
| **Tech / IT Consultancy**   | *CloudTech Solutions*| `"indigo"` (Modern Purple)| `"crm_cloudtech"` |

---

## 👥 3. Role-Based Access Control (RBAC) Behavior

- **Telecaller (`Caller`)**:
  - Automatically routed straight to the **Mobile Companion App (`mobile.html`)** upon login.
  - Access to desktop workspace (`index.html`) is strictly blocked.
  - Can only view assigned leads, dial contacts, set outcomes (Interested, Callback, etc.), and log call notes.
  - Zero access to settings or other people's passwords.

- **Team Leader (`Team Lead`) & Manager (`Manager`)**:
  - Can switch between Desktop Workspace and Mobile App View (`[ 📱 Mobile App View ↗ ]`).
  - Access to team lead queue, call logs, and performance overview.
  - **Settings & Passwords are strictly hidden and blocked** for non-admins.

- **Administrator (`Admin`)**:
  - Full access to all modules, including **Settings → Authorized Personnel & Login Access** where only Admin can create, edit, or revoke passwords and emails.

---

## 🚀 4. How to Run & Deploy

### Quick Local Start:
1. Double-click **`login.html`** in any web browser, or:
2. Run via Node.js:
   ```bash
   node server.js
   ```
   Open: [http://localhost:3000](http://localhost:3000)

### Deploying to Custom Domain & GitHub:
- Keep your GitHub repository **Private**.
- Deploy `server.js` on **Render.com**, **Railway.app**, or any Node.js VPS.
- Point your custom domain (e.g. `crm.yourcompany.com`) to your server.

### Deploying to Google Play Store & Apple App Store:
The project is pre-configured with **Capacitor** (`capacitor.config.json`):
```bash
npm install
npm run android:add   # Creates native Android Studio project
npm run android:open  # Opens in Android Studio to build .aab for Play Store
npm run ios:add       # Creates native Xcode project (Mac)
npm run ios:open      # Opens in Xcode to build .ipa for App Store
```

### Instant PWA Mobile App (No App Store Needed):
Telecallers can open your domain on their mobile browser (Chrome on Android or Safari on iPhone) and tap **"Add to Home Screen"**. It installs as an app with an icon and runs full-screen!

---

## 🛡️ Producer & Commercial Rights
**Brand.B Enterprise Software** — Engineered by **Muhammed Munshid Kuruvangadan**.

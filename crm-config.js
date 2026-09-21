/**
 * Telecalling CRM - Master Client & Producer Configuration
 * Engineered & Powered by Brand.B
 * 
 * Customize this single file to brand, theme, and configure isolated CRM instances
 * for individual businesses (e.g. Nallayil Ayurvedha, Coat Rental, or any new company).
 */

var CRM_CONFIG = {
  // ==========================================
  // 1. Client Company Information
  // ==========================================
  companyName: "Nallayil Ayurvedha", // Change to "Coat Rental" or your company name
  tagline: "Ayurvedic Healthcare & Wellness Outreach",
  industry: "Healthcare & Wellness",
  supportEmail: "contact@nallayil.com",
  phone: "+91 98470 00000",
  
  // ==========================================
  // 2. Visual Theme & Styling Presets
  // ==========================================
  // Presets available:
  // - "emerald" : Herbal green & emerald (Nallayil Ayurvedha / Wellness / Healthcare)
  // - "navy"    : Executive sapphire & navy (Coat Rental / Corporate / Real Estate)
  // - "indigo"  : Modern electric purple/indigo (Brand.B signature)
  // - "amber"   : Luxury bronze & gold (Boutiques / Jewelry / Rental)
  // - "ruby"    : Crimson & ruby (Hospitality / Dining / Energy)
  // - "slate"   : Modern minimalist dark charcoal
  themePreset: "emerald",

  // ==========================================
  // 3. Master Administrator Credentials
  // ==========================================
  // Edit your primary admin login credentials directly here.
  // When you sign in with this email & password, you immediately get full Administrator access.
  adminUser: {
    name: "Muhammed Munshid",
    email: "kmunshidk@gmail.com", // Admin Email
    password: "admin123",         // Admin Password
    role: "Admin"
  },

  // Default pre-authorized team directory (used when storage is initial/empty)
  defaultTeam: [
    { name: "Muhammed Munshid", email: "kmunshidk@gmail.com", password: "admin123", role: "Admin" },
    { name: "Rohit Verma", email: "rohit@company.com", password: "manager123", role: "Manager" },
    { name: "Vikram Mehta", email: "vikram@company.com", password: "lead123", role: "Team Lead" },
    { name: "Anika Sharma", email: "anika@company.com", password: "caller123", role: "Caller" }
  ],

  // ==========================================
  // 4. Client Storage Isolation
  // ==========================================
  // Prefix for browser localStorage. Guarantees separate, isolated data silos per client.
  // E.g. "crm_nallayil", "crm_coatrental", "crm_apex", etc.
  storagePrefix: "crm_nallayil",

  // ==========================================
  // 5. Producer / Founder Architecture (Brand.B)
  // ==========================================
  producer: {
    brandName: "BrandB",
    founder: "Muhammed Munshid Kuruvangadan",
    badgeText: "Powered by",
    tagline: "Enterprise Telecalling Platform Architecture",
    url: "https://brandb.in",
    logoUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEgBncrIxBQ6aqKYMaEDfbYf27SZ1epRflTNXWL7aa-EV31BQmTAcNnwTg33gkjbvGXgXe7vT30wdXDgGxwBaqK2V-FqevCWnd4LJmp9JRIlA-Zas53te6Z2KSoq0lNCOUDTfydnHw-oS6x7wWeHJEKAF2oWIqnZtr_qmpA-wTX15tMsJnnLL2_-X6vbBrY"
  }
};

// Comprehensive Theme Presets Definitions
var THEME_PRESETS = {
  emerald: {
    primary: "#059669",
    hover: "#047857",
    active: "#065f46",
    rgb: "5, 150, 105",
    p50: "#ecfdf5",
    p100: "#d1fae5",
    p200: "#a7f3d0",
    p500: "#10b981",
    gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    heroGradient: "linear-gradient(135deg, #047857 0%, #064e3b 100%)",
    mobileBg: "linear-gradient(180deg, #065f46 0%, #059669 45%, #f4f5fa 45%)"
  },
  navy: {
    primary: "#1d4ed8",
    hover: "#1e40af",
    active: "#1e3a8a",
    rgb: "29, 78, 216",
    p50: "#eff6ff",
    p100: "#dbeafe",
    p200: "#bfdbfe",
    p500: "#3b82f6",
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
    heroGradient: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
    mobileBg: "linear-gradient(180deg, #1e3a8a 0%, #1d4ed8 45%, #f4f5fa 45%)"
  },
  indigo: {
    primary: "#6f2df2",
    hover: "#5d22d6",
    active: "#4e19b8",
    rgb: "111, 45, 242",
    p50: "#f7f4fe",
    p100: "#efe9fd",
    p200: "#ded3fc",
    p500: "#8a57f6",
    gradient: "linear-gradient(135deg, #702df2 0%, #581ed6 100%)",
    heroGradient: "linear-gradient(135deg, #5924e0 0%, #451bba 100%)",
    mobileBg: "linear-gradient(180deg, #3d1cb5 0%, #5926db 45%, #f4f5fa 45%)"
  },
  amber: {
    primary: "#d97706",
    hover: "#b45309",
    active: "#92400e",
    rgb: "217, 119, 6",
    p50: "#fffbeb",
    p100: "#fef3c7",
    p200: "#fde68a",
    p500: "#f59e0b",
    gradient: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
    heroGradient: "linear-gradient(135deg, #b45309 0%, #78350f 100%)",
    mobileBg: "linear-gradient(180deg, #92400e 0%, #d97706 45%, #f4f5fa 45%)"
  },
  ruby: {
    primary: "#e11d48",
    hover: "#be123c",
    active: "#9f1239",
    rgb: "225, 29, 72",
    p50: "#fff1f2",
    p100: "#ffe4e6",
    p200: "#fecdd3",
    p500: "#f43f5e",
    gradient: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
    heroGradient: "linear-gradient(135deg, #be123c 0%, #881337 100%)",
    mobileBg: "linear-gradient(180deg, #881337 0%, #e11d48 45%, #f4f5fa 45%)"
  },
  slate: {
    primary: "#334155",
    hover: "#1e293b",
    active: "#0f172a",
    rgb: "51, 65, 85",
    p50: "#f8fafc",
    p100: "#f1f5f9",
    p200: "#e2e8f0",
    p500: "#64748b",
    gradient: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
    heroGradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    mobileBg: "linear-gradient(180deg, #0f172a 0%, #334155 45%, #f4f5fa 45%)"
  }
};

var CRM_STORAGE = {
  getUserKey: function() {
    var prefix = (typeof CRM_CONFIG !== 'undefined' && CRM_CONFIG.storagePrefix) ? CRM_CONFIG.storagePrefix : 'crm_user';
    return prefix + '_user';
  },
  getAuthKey: function() {
    var prefix = (typeof CRM_CONFIG !== 'undefined' && CRM_CONFIG.storagePrefix) ? CRM_CONFIG.storagePrefix : 'crm_authorized_users';
    return prefix + '_authorized_users';
  },
  getStateKey: function() {
    var prefix = (typeof CRM_CONFIG !== 'undefined' && CRM_CONFIG.storagePrefix) ? CRM_CONFIG.storagePrefix : 'telecalling_crm_state';
    return prefix + '_state';
  }
};

// Global Window Bindings (Guarantees accessibility across all script tags & file:// URLs)
if (typeof window !== 'undefined') {
  window.CRM_CONFIG = CRM_CONFIG;
  window.THEME_PRESETS = THEME_PRESETS;
  window.CRM_STORAGE = CRM_STORAGE;
}

function initBrandTheme() {
  if (typeof document === 'undefined') return;
  var cfg = (typeof window !== 'undefined' && window.CRM_CONFIG) ? window.CRM_CONFIG : CRM_CONFIG;
  var presetKey = cfg.themePreset || 'emerald';
  var theme = THEME_PRESETS[presetKey] || THEME_PRESETS.emerald;
  var root = document.documentElement;

  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-hover', theme.hover);
  root.style.setProperty('--primary-active', theme.active);
  root.style.setProperty('--primary-rgb', theme.rgb);
  root.style.setProperty('--primary-50', theme.p50);
  root.style.setProperty('--primary-100', theme.p100);
  root.style.setProperty('--primary-200', theme.p200);
  root.style.setProperty('--primary-500', theme.p500);
  root.style.setProperty('--primary-gradient', theme.gradient);
  root.style.setProperty('--hero-gradient', theme.heroGradient);
  root.style.setProperty('--mobile-bg-gradient', theme.mobileBg);
  root.style.setProperty('--brand-purple', theme.primary);

  var metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', theme.primary);
}

initBrandTheme();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CRM_CONFIG, THEME_PRESETS, CRM_STORAGE };
}

export const ADMIN_LANGS = [
  { id: "vi" as const, label: "Tiếng Việt", icon: "🇻🇳" },
  { id: "en" as const, label: "English", icon: "🇺🇸" },
  { id: "th" as const, label: "ภาษาไทย", icon: "🇹🇭" },
];

export type AdminLang = typeof ADMIN_LANGS[number]["id"];

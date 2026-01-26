
export const locales = ["en", "ar"] as const
export const defaultLocale = "en"


export const dictionaries = {
  en: () => import("./messages/en.json").then(m => m.default),
  ar: () => import("./messages/ar.json").then(m => m.default),
}

export async function getDictionary(locale : "en" | "ar") {
  return dictionaries[locale]()
}
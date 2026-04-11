/**
 * Fallback URLs when `public/images/{hero,news,achieve,logo,teacher}/` are empty
 * (see `getPublicImageBuckets()` in `lib/public-images.ts`).
 */
export const FALLBACK_LOGO_SRC = "/images/logo/Shehnai_School_of_Music_logo.jpg";

/** @deprecated Use FALLBACK_LOGO_SRC — prefer `public/images/logo/` */
export const logoSrc = FALLBACK_LOGO_SRC;

export const fallbackHeroSlides = [
  "/images/hero/1_Ammama-inaguration.jpg",
  "/images/hero/2_Mash-inaguration.jpg",
  "/images/hero/3_Amma-inaguratoin.jpeg",
  "/images/hero/3_hero-bineeshAmma-singing.jpeg",
  "/images/hero/4_hero-art-class.jpeg",
  "/images/hero/5_hero-onlineclass.jpg",
  "/images/hero/6_vacation_classes_annualday.jpg",
  "/images/hero/7_hero-mrudhangam-class.jpeg",
] as const;

/** Course cards / legacy — uses fallback hero list when no folder scan. */
export const heroSlides = fallbackHeroSlides;

export const fallbackNewsMarquee = [
  "/images/news/event-bineesh-chorus.jpg",
  "/images/news/event-bineesh-kacheri.jpeg",
  "/images/news/event-class-mruthangam.jpg",
  "/images/news/event-stage-dance.jpg",
  "/images/news/event-students-stage-singing.jpg",
] as const;

export const fallbackAchievementsMarquee = [
  "/images/achieve/student-prize-inaguralday.jpg",
  "/images/achieve/devapriya+balasree+saranam_Ayyappa.jpg",
  "/images/achieve/Krishnapriya_K_B+A_Grade+CarnaticMusic+58th_State_School_Fest.jpg",
  "/images/achieve/Sriya_Sreekanth+_+Flowers_Top_Singer+Season4.jpg",
  "/images/achieve/Shivani_Sijo+Elisha_Jose+Perth_Australia+Kalolsavam_2025.jpg",
] as const;

export const galleryImages = fallbackHeroSlides;

export const aboutImage = "/images/hero/4_hero-art-class.jpeg";

/**
 * Fallback URLs when `public/images/{hero,news,achieve,logo,teacher}/` are empty
 * (see `getPublicImageBuckets()` in `lib/public-images.ts`).
 */
export const FALLBACK_LOGO_SRC =
  "/images/Shehnai_School_of_Music_logo-185633d6-b345-41b9-bc07-ab324e007831.png";

/** @deprecated Use FALLBACK_LOGO_SRC — prefer `public/images/logo/` */
export const logoSrc = FALLBACK_LOGO_SRC;

export const fallbackHeroSlides = [
  "/images/Screenshot_2026-03-25_at_23.07.57-da1a0667-4a15-4635-b246-65ae6c0133a5.png",
  "/images/Screenshot_2026-03-25_at_23.08.12-81602a2c-504f-4ef2-bf1a-499ff04da809.png",
  "/images/Screenshot_2026-03-25_at_23.07.22-215d5917-8d8c-4d22-a600-f57fec6a21dd.png",
  "/images/Screenshot_2026-03-25_at_23.07.39-166c762a-39c4-4385-968c-2b59c38837fa.png",
  "/images/South_Indian_man_singing_in_concert_hall-e67280c2-4182-4ddc-b252-01ba6cc84b92.png",
] as const;

/** Course cards / legacy — uses fallback hero list when no folder scan. */
export const heroSlides = fallbackHeroSlides;

export const fallbackNewsMarquee = [
  "/images/Screenshot_2026-03-25_at_23.07.57-da1a0667-4a15-4635-b246-65ae6c0133a5.png",
  "/images/Screenshot_2026-03-25_at_23.08.12-81602a2c-504f-4ef2-bf1a-499ff04da809.png",
  "/images/Screenshot_2026-03-25_at_23.07.22-215d5917-8d8c-4d22-a600-f57fec6a21dd.png",
  "/images/Screenshot_2026-03-25_at_23.07.39-166c762a-39c4-4385-968c-2b59c38837fa.png",
  "/images/South_Indian_man_singing_in_concert_hall-e67280c2-4182-4ddc-b252-01ba6cc84b92.png",
] as const;

export const fallbackAchievementsMarquee = [
  "/images/South_Indian_man_singing_in_concert_hall-e67280c2-4182-4ddc-b252-01ba6cc84b92.png",
  "/images/Screenshot_2026-03-25_at_23.07.39-166c762a-39c4-4385-968c-2b59c38837fa.png",
  "/images/Screenshot_2026-03-25_at_23.07.22-215d5917-8d8c-4d22-a600-f57fec6a21dd.png",
  "/images/Screenshot_2026-03-25_at_23.08.12-81602a2c-504f-4ef2-bf1a-499ff04da809.png",
  "/images/Screenshot_2026-03-25_at_23.07.57-da1a0667-4a15-4635-b246-65ae6c0133a5.png",
] as const;

export const galleryImages = fallbackHeroSlides;

export const aboutImage =
  "/images/Screenshot_2026-03-25_at_23.07.39-166c762a-39c4-4385-968c-2b59c38837fa.png";

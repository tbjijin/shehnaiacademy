import fs from "fs";
import path from "path";

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public", "images");
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

export type PublicImageBuckets = {
  /** First file in `images/logo/` (sorted). */
  logoSrc: string | null;
  /** Files in `images/hero/`. */
  hero: string[];
  /** Files in `images/news/`. */
  news: string[];
  /** Files in `images/achieve/` (and optionally `images/achievements/`). */
  achievements: string[];
  /** Files in `images/teacher/`. */
  teachers: string[];
};

function listImageFilenamesInDir(absDir: string): string[] {
  try {
    if (!fs.existsSync(absDir)) return [];
    return fs
      .readdirSync(absDir, { withFileTypes: true })
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  } catch {
    return [];
  }
}

function urlsForSubfolder(relativeSegment: string): string[] {
  const abs = path.join(PUBLIC_IMAGES_DIR, relativeSegment);
  return listImageFilenamesInDir(abs).map(
    (name) => `/images/${relativeSegment.replace(/\\/g, "/")}/${name}`,
  );
}

/**
 * Loads images from `public/images/{logo,hero,news,achieve,teacher}/`.
 * Also merges `public/images/achievements/` into the achievements list (deduped, sorted).
 * Server-only (Node `fs`).
 */
export function getPublicImageBuckets(): PublicImageBuckets {
  const logo = urlsForSubfolder("logo");
  const hero = urlsForSubfolder("hero");
  const news = urlsForSubfolder("news");
  const achieveSet = new Set([
    ...urlsForSubfolder("achieve"),
    ...urlsForSubfolder("achievements"),
  ]);
  const achievements = [...achieveSet].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
  const teachers = urlsForSubfolder("teacher");

  return {
    logoSrc: logo[0] ?? null,
    hero,
    news,
    achievements,
    teachers,
  };
}

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

function basenameFromUrl(url: string): string {
  const seg = url.split("/").pop();
  return seg ?? url;
}

/** Leading digits at start of filename, e.g. `1_slide.jpg` → 1, `10_x.png` → 10 */
function parseHeroFilenamePriority(basename: string): number | null {
  const m = /^(\d+)/.exec(basename);
  if (!m) return null;
  return parseInt(m[1]!, 10);
}

function hashSeedString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0 || 1;
}

/** Deterministic shuffle so unnumbered hero files vary in order but builds stay stable */
function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  if (items.length <= 1) return [...items];
  const arr = [...items];
  let state = seed;
  const rnd = () => {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0;
    return state / 4294967296;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = t;
  }
  return arr;
}

/**
 * Hero reel order: filenames starting with `1`, `2`, `10`, … (digits at start of basename)
 * sort by that number ascending; files without a leading number go last, shuffled
 * deterministically so order is stable per folder contents.
 */
export function orderHeroImageUrls(urls: readonly string[]): string[] {
  const numbered: { url: string; n: number; base: string }[] = [];
  const unnumbered: string[] = [];
  for (const url of urls) {
    const base = basenameFromUrl(url);
    const p = parseHeroFilenamePriority(base);
    if (p != null) numbered.push({ url, n: p, base });
    else unnumbered.push(url);
  }
  numbered.sort(
    (a, b) =>
      a.n - b.n ||
      a.base.localeCompare(b.base, undefined, { sensitivity: "base" }),
  );
  const unnumberedSorted = [...unnumbered].sort((a, b) =>
    basenameFromUrl(a).localeCompare(basenameFromUrl(b), undefined, {
      sensitivity: "base",
    }),
  );
  const seed = hashSeedString(`hero|${unnumberedSorted.join("|")}`);
  const unnumberedShuffled = seededShuffle(unnumberedSorted, seed);
  return [...numbered.map((x) => x.url), ...unnumberedShuffled];
}

/**
 * Loads images from `public/images/{logo,hero,news,achieve,teacher}/`.
 * Also merges `public/images/achievements/` into the achievements list (deduped, sorted).
 * Server-only (Node `fs`).
 */
export function getPublicImageBuckets(): PublicImageBuckets {
  const logo = urlsForSubfolder("logo");
  const hero = orderHeroImageUrls(urlsForSubfolder("hero"));
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

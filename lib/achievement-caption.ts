/**
 * Parse achievement photo captions from basename: segments joined by `+`, `_` → space.
 * No `+` in basename → no caption (return null).
 */
export type AchievementCaption = {
  line1: string;
  line2: string;
};

function formatSegment(segment: string): string {
  return segment.replace(/_/g, " ").trim();
}

export function parseAchievementCaptionFromUrl(url: string): AchievementCaption | null {
  const basename = url.split("/").pop() ?? "";
  const nameWithoutExt = basename.replace(/\.[^.]+$/i, "");
  if (!nameWithoutExt.includes("+")) return null;

  const parts = nameWithoutExt
    .split("+")
    .map((p) => p.trim())
    .filter(Boolean)
    .map(formatSegment);

  if (parts.length === 0) return null;

  if (parts.length >= 4) {
    const line2Rest = [parts[2], parts[3], ...parts.slice(4)].join(", ");
    return {
      line1: `${parts[0]}, ${parts[1]}`,
      line2: line2Rest,
    };
  }

  if (parts.length === 3) {
    return {
      line1: `${parts[0]}, ${parts[1]}`,
      line2: parts[2]!,
    };
  }

  if (parts.length === 2) {
    return {
      line1: parts[0]!,
      line2: parts[1]!,
    };
  }

  return {
    line1: parts[0]!,
    line2: "",
  };
}

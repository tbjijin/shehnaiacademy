/**
 * Match teacher photos by filename suffix: `Name_violin_eastern.jpeg` → suffix `violin_eastern`.
 */
export function resolveTeacherPhotoUrl(
  teacherUrls: readonly string[],
  photoSuffix: string,
): string | undefined {
  const trimmed = photoSuffix.trim();
  if (!trimmed) return undefined;
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`_${escaped}\\.[^.]+$`, "i");
  return teacherUrls.find((u) => re.test(u.split("/").pop() ?? ""));
}

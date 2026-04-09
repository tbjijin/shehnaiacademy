import { site } from "@/lib/site";

export type Teacher = {
  id: string;
  /**
   * Match files under `public/images/teacher/` whose basename ends with `_${photoSuffix}.ext`
   * (e.g. `Sangeeth_violin_eastern.jpeg`). Use empty string if no photo key yet.
   */
  photoSuffix: string;
  name: string;
  /** Optional line under the name (e.g. leadership title). */
  byline?: string;
  role: string;
  bio: string;
  /** Optional explicit path under `public`; overrides suffix matching when set. */
  image?: string;
};

export type TeacherSection = {
  id: string;
  title: string;
  teachers: Teacher[];
};

export const teacherSections: TeacherSection[] = [
  {
    id: "music-vocal",
    title: "Music (Vocal)",
    teachers: [
      {
        id: "teacher-music-vocal",
        photoSuffix: "music",
        name: "Bineesh Krishnan",
        byline: `Director, ${site.name}`,
        role: "Vocal · Higher Grade in South Indian Music, Madras",
        bio: "With over 25 years of expertise, guiding students in Classical vocal training. Focuses on building a strong foundation through structured, graded lessons while developing students' performance skills and confidence.",
      },
    ],
  },
  {
    id: "dance",
    title: "Dance",
    teachers: [
      {
        id: "teacher-dance",
        photoSuffix: "dance",
        name: "Kalamandalam Saranya Arun",
        role: "Mohiniyattam · Kerala Kalamandalam",
        bio: "Mohiniyattam artist with a BA and MA from Kerala Kalamandalam and a Diamond Jubilee Fellowship scholar—coaching posture, abhinaya, and stage presence with depth and clarity.",
      },
    ],
  },
  {
    id: "drawing",
    title: "Drawing",
    teachers: [
      {
        id: "teacher-drawing",
        photoSuffix: "drawing",
        name: "Amrutha M N",
        role: "Drawing · Fine Arts, Thrissur",
        bio: "Teaches drawing and visual fundamentals with a fine-arts background, helping students build observation, line, and composition with confidence.",
      },
    ],
  },
  {
    id: "keyboard",
    title: "Keyboard",
    teachers: [
      {
        id: "teacher-keyboard",
        photoSuffix: "Keyboard",
        name: "Simon Nellikunnu",
        role: "Keyboard · Stage & Recording Artist",
        bio: "A professional stage and recording keyboardist with over forty years of experience, guiding students through chords, accompaniment, and performance-ready playing from classical foundations to light music.",
      },
    ],
  },
  {
    id: "violin-western",
    title: "Violin (Western)",
    teachers: [
      {
        id: "teacher-violin-western",
        photoSuffix: "violin_western",
        name: "Musthafa",
        role: "Violin (Western) · Stage & Recording Artist",
        bio: "Western violin faculty, bringing stage and recording experience into structured lessons for learners at every level.",
      },
    ],
  },
  {
    id: "violin-carnatic",
    title: "Violin (Carnatic)",
    teachers: [
      {
        id: "teacher-violin-eastern",
        photoSuffix: "violin_eastern",
        name: "Sangeeth T S",
        role: "Violin (Carnatic) · Stage & Recording Artist",
        bio: "Experienced Carnatic violinist supporting students with stage-ready technique, tone, and repertoire.",
      },
    ],
  },
  {
    id: "guitar",
    title: "Guitar",
    teachers: [
      {
        id: "teacher-guitar",
        photoSuffix: "Guitar",
        name: "Latheef Chavakkad",
        role: "Guitar · Stage & Recording Artist",
        bio: "A seasoned stage and recording guitarist with more than four decades of experience, helping learners build solid technique, timing, and musicality across acoustic and contemporary styles.",
      },
    ],
  },
  {
    id: "jazz-drums",
    title: "Jazz Drums",
    teachers: [
      {
        id: "teacher-jazz-drums",
        photoSuffix: "JazzDrums",
        name: "Naduvil Unnikrishnan",
        role: "Jazz Drums · Stage & Recording Artist",
        bio: "A professional stage and recording artist with over forty years of experience, bringing real-world groove, ensemble sense, and stylistic depth to the drum chair—guiding students from fundamentals to confident performance.",
      },
    ],
  },
];

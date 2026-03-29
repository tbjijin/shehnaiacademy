export type Teacher = {
  id: string;
  name: string;
  nameMl: string;
  role: string;
  roleMl: string;
  bio: string;
  bioMl: string;
  /** Path under `public`, e.g. `/images/teacher/name.jpg`. Omit to use nth file from that folder. */
  image?: string;
};

/**
 * Faculty copy lives here. Photos: add files under `public/images/teacher/` (sorted names
 * map to teachers in array order), or set `image` on each entry.
 */
export const teachers: Teacher[] = [
  {
    id: "faculty-1",
    name: "Vocal faculty",
    nameMl: "വോക്കൽ അധ്യാപകൻ",
    role: "Carnatic vocal · Foundation & grades",
    roleMl: "കർണാടക വോക്കൽ · അടിസ്ഥാനവും ഗ്രേഡുകളും",
    bio: "Guides beginners through voice culture, shruti, and repertoire with patient, structured lessons.",
    bioMl:
      "ശ്രുതി, സ്വരവ്യവസ്ഥ, കൃതികൾ എന്നിവ ക്ഷമയോടെയും ഘടനാബദ്ധമായി പഠിപ്പിക്കുന്നു.",
  },
  {
    id: "faculty-2",
    name: "Dance faculty",
    nameMl: "നൃത്ത അധ്യാപിക",
    role: "Classical dance · Performance coaching",
    roleMl: "ക്ലാസിക്കൽ നൃത്തം · പ്രകടന പരിശീലനം",
    bio: "Focuses on posture, rhythm, and stage presence so students grow in confidence and expression.",
    bioMl:
      "ഭംഗി, താളം, വേദി സാന്നിധ്യം എന്നിവയിൽ ശ്രദ്ധ കേന്ദ്രീകരിച്ച് ആത്മവിശ്വാസവും അവതരണവും വളർത്തുന്നു.",
  },
  {
    id: "faculty-3",
    name: "Instrumental faculty",
    nameMl: "വാദ്യ അധ്യാപകൻ",
    role: "Keyboard · Light music · Batches",
    roleMl: "കീബോർഡ് · ലൈറ്റ് മ്യൂസിക് · ബാച്ചുകൾ",
    bio: "Supports film-song learners and ensemble work with practical tips for practice at home or in class.",
    bioMl:
      "ഫിലിം ഗാന പഠിതാക്കൾക്കും ഗ്രൂപ്പ് പരിശീലനത്തിനും വീട്ടിലും ക്ലാസിലും ഉപയോഗിക്കാവുന്ന നുറുങ്ങുകൾ.",
  },
];

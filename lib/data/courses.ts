import { heroSlides } from "@/lib/site-assets";

export type Course = {
  slug: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  duration: string;
  mode: string;
  image: string;
};

const rotate = (i: number) => heroSlides[i % heroSlides.length]!;

export const courses: Course[] = [
  {
    slug: "carnatic-music",
    title: "Carnatic Music",
    titleMl: "കർണാടക സംഗീതം",
    description:
      "Structured vocal training in ragams, talams, and classic repertoire for steady progression.",
    descriptionMl:
      "രാഗം, താളം, ക്ലാസിക്കൽ കൃതികൾ എന്നിവയിൽ ഘടനാബദ്ധമായ പരിശീലനം നൽകി സ്ഥിരമായ പുരോഗതി ഉറപ്പാക്കുന്നു.",
    duration: "Flexible batches",
    mode: "Online & In person",
    image: rotate(0),
  },
  {
    slug: "film-songs",
    title: "Film Songs",
    titleMl: "ചലച്ചിത്ര ഗാനങ്ങൾ",
    description:
      "Learn beloved melodies with microphone technique, expression, and performance confidence.",
    descriptionMl:
      "മൈക്ക് ടെക്നിക്കും അവതരണശൈലിയുമായി പ്രിയപ്പെട്ട ഗാനങ്ങൾ ആത്മവിശ്വാസത്തോടെ പഠിക്കാം.",
    duration: "Flexible batches",
    mode: "Online & In person",
    image: rotate(1),
  },
  {
    slug: "guitar",
    title: "Guitar",
    titleMl: "ഗിറ്റാർ",
    description:
      "Finger placement, rhythm, and song-playing skills for acoustic and light music styles.",
    descriptionMl:
      "ഫിംഗർ പ്ലേസ്മെന്റ്, റിധം, ആകൂസ്റ്റിക്/ലൈറ്റ് മ്യൂസിക് പാട്ടുകൾ വായിക്കുന്ന കഴിവുകൾ പരിശീലിപ്പിക്കുന്നു.",
    duration: "Flexible batches",
    mode: "In person",
    image: rotate(2),
  },
  {
    slug: "violin",
    title: "Violin (Western & Eastern)",
    titleMl: "വയലിൻ (വെസ്റ്റേൺ & ഈസ്റ്റേൺ)",
    description:
      "Bow control, intonation, and repertoire across Carnatic and Western foundations.",
    descriptionMl:
      "ബോ കണ്ട്രോൾ, സ്വരശുദ്ധി, കർണാടകവും വെസ്റ്റേണും ഉൾക്കുന്ന പാഠഭാഗങ്ങൾ ക്രമമായി പഠിപ്പിക്കുന്നു.",
    duration: "Flexible batches",
    mode: "In person",
    image: rotate(3),
  },
  {
    slug: "thabala",
    title: "Thabala",
    titleMl: "തബല",
    description:
      "Rhythm patterns and accompaniment skills to support vocal and instrumental performance.",
    descriptionMl:
      "വോക്കൽ, ഇൻസ്ട്രുമെന്റൽ പ്രകടനങ്ങൾക്ക് ആവശ്യമായ താള പാറ്റേണുകളും അനുബന്ധ പരിശീലനവും നൽകുന്നു.",
    duration: "Flexible batches",
    mode: "In person",
    image: rotate(4),
  },
  {
    slug: "jazz-drum",
    title: "Jazz Drum",
    titleMl: "ജാസ് ഡ്രം",
    description:
      "Groove, coordination, and stylistic vocabulary for contemporary drumming.",
    descriptionMl:
      "ആധുനിക ഡ്രമ്മിംഗിനുള്ള ഗ്രൂവ്, കോ-ഓർഡിനേഷൻ, ശൈലീബോധം എന്നിവയിൽ പരിശീലനം.",
    duration: "Flexible batches",
    mode: "In person",
    image: rotate(0),
  },
  {
    slug: "keyboard",
    title: "Keyboard",
    titleMl: "കീബോർഡ്",
    description:
      "Chords, scales, and performance pieces from classical basics to light music.",
    descriptionMl:
      "ക്ലാസിക്കൽ അടിസ്ഥാനങ്ങളിൽ നിന്ന് ലൈറ്റ് മ്യൂസിക് വരെയുള്ള കോർഡുകൾ, സ്കെയിലുകൾ, അവതരണ ഭാഗങ്ങൾ പഠിപ്പിക്കുന്നു.",
    duration: "Flexible batches",
    mode: "In person",
    image: rotate(1),
  },
  {
    slug: "dance",
    title: "Dance",
    titleMl: "നൃത്തം",
    description:
      "Foundational posture, adavus, and expressive storytelling through movement.",
    descriptionMl:
      "അടിസ്ഥാന നിലപാട്, അടവുകൾ, മുഖാഭിനയവും ചലനഭാവവും ഉൾപ്പെടുത്തി നൃത്തപരിശീലനം.",
    duration: "Flexible batches",
    mode: "In person",
    image: rotate(2),
  },
  {
    slug: "drawing",
    title: "Drawing",
    titleMl: "ഡ്രോയിംഗ്",
    description:
      "Observation, shading, and composition for creative confidence across mediums.",
    descriptionMl:
      "നിരീക്ഷണം, ഷേഡിംഗ്, കോംപോസിഷൻ എന്നിവയിൽ പരിശീലനം നൽകി സൃഷ്ടിശേഷി വളർത്തുന്നു.",
    duration: "Flexible batches",
    mode: "In person",
    image: rotate(3),
  },
];

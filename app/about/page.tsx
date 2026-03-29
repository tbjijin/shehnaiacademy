import { TeacherCard } from "@/components/about/TeacherCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { teachers } from "@/lib/data/teachers";
import { getPublicImageBuckets } from "@/lib/public-images";
import { site } from "@/lib/site";
import type { Metadata } from "next";

const teachingApproachItems = [
  {
    title: "Foundations First | അടിത്തറയ്ക്ക് മുൻഗണന",
    bodyEn:
      "A step-by-step approach focusing on technique, active listening, and expression before moving to speed.",
    bodyMl:
      "വേഗത്തേക്കാൾ ഉപരിയായി, അടിസ്ഥാനങ്ങൾക്കും സാങ്കേതികതയ്ക്കും (Technique) ഭാവപ്രകടനങ്ങൾക്കും മുൻഗണന നൽകുന്ന ഘട്ടം ഘട്ടമായുള്ള പഠനരീതി.",
  },
  {
    title: "Personal Mentorship | വ്യക്തിഗത ശ്രദ്ധ",
    bodyEn:
      "Small groups and one-on-one attention to ensure every student receives the guidance they need.",
    bodyMl:
      "ഓരോ വിദ്യാർത്ഥിക്കും അർഹമായ പരിഗണന ഉറപ്പാക്കാൻ ചെറിയ ഗ്രൂപ്പുകളും വ്യക്തിഗത ശ്രദ്ധയും.",
  },
  {
    title: "Performance-Oriented | പ്രകടന കേന്ദ്രിതം",
    bodyEn:
      "Coaching designed for the stage, ensuring that progress is both audible and visible.",
    bodyMl:
      "കേൾക്കുന്നവർക്കും കാണുന്നവർക്കും ഒരുപോലെ ആസ്വദിക്കാൻ കഴിയുന്ന വിധത്തിലുള്ള പ്രകടന കേന്ദ്രിത പരിശീലനം.",
  },
  {
    title: "Flexible Learning | സൗകര്യപ്രദമായ പഠനം",
    bodyEn:
      "A blend of Online and Offline classes to fit your family’s weekly schedule seamlessly.",
    bodyMl:
      "നിങ്ങളുടെ സൗകര്യത്തിനനുസരിച്ച് തിരഞ്ഞെടുക്കാവുന്ന ഓൺലൈൻ, ഓഫ്ലൈൻ ക്ലാസുകൾ.",
  },
] as const;

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name}, our faculty, and our mission since ${site.established}.`,
};

export default async function AboutPage() {
  const { teachers: teacherUrls } = getPublicImageBuckets();
  const teachersResolved = teachers.map((t, i) => ({
    ...t,
    image: t.image ?? teacherUrls[i],
  }));

  return (
    <>
      <section className="border-b border-[color-mix(in_oklab,var(--brand-gold)_25%,transparent)] bg-gradient-to-br from-brand-red/92 via-brand-orange/85 to-brand-gold/75 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl md:text-5xl">
            About {site.shortName}
          </h1>
        </div>
      </section>

      <SectionWrapper>
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {site.name} was established in {site.established} with the aim of promoting
            music and arts education. We offer structured training in various disciplines
            for students of all age groups.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            2002 മുതൽ സംഗീതത്തിന്റെയും കലയുടെയും ലോകത്ത് സജീവമായ സാന്നിധ്യമാണ്
            &apos;ഷെഹ്നായ് സ്കൂൾ ഓഫ് മ്യൂസിക് ആൻഡ് ആർട്ട്&apos;. കൊച്ചുകുട്ടികൾ മുതൽ
            മുതിർന്നവർ വരെ ഏതു പ്രായത്തിലുള്ളവർക്കും താല്പര്യമുള്ള വിഷയങ്ങളിൽ ശാസ്ത്രീയമായ
            പരിശീലനം ഇവിടെ ലഭിക്കുന്നു.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="faculty"
        className="bg-[color-mix(in_oklab,white_72%,var(--brand-cream))]"
      >
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Our teachers / അധ്യാപകർ
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base md:text-lg">
            Experienced mentors across vocal, dance, and instruments—guiding each learner with
            care and clear goals.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base md:text-lg">
            സംഗീതം, നൃത്തം, ചിത്രരചന, വാദ്യോപകരണങ്ങൾ... ഓരോ വിഭാഗത്തിലും പ്രഗത്ഭരായ അധ്യാപകർ.
            ഓരോ വിദ്യാർത്ഥിക്കും പ്രത്യേക ശ്രദ്ധയും കൃത്യമായ ലക്ഷ്യബോധത്തോടെയുള്ള പരിശീലനവും ഞങ്ങൾ
            ഉറപ്പുനൽകുന്നു.
          </p>
        </div>
        <ul className="mt-10 grid list-none gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {teachersResolved.map((t) => (
            <li key={t.id}>
              <TeacherCard teacher={t} />
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="rounded-2xl border border-[color-mix(in_oklab,var(--brand-gold)_28%,transparent)] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-brand-red sm:text-2xl">
              Mission | ദൗത്യം
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              To provide disciplined yet joyful training in Indian and global arts—empowering
              every student through patient mentorship and clear, achievable milestones.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              ഇന്ത്യൻ-ആഗോള കലകളിൽ ചിട്ടയായതും എന്നാൽ ഹൃദ്യവുമായ പരിശീലനം എല്ലാവർക്കും ലഭ്യമാക്കുക.
              ഓരോ വിദ്യാർത്ഥിയുടെയും കഴിവുകളെ ക്ഷമയോടെയും വ്യക്തമായ ലക്ഷ്യങ്ങളോടെയും
              വളർത്തിയെടുക്കുക എന്നതാണ് ഞങ്ങളുടെ ദൗത്യം.
            </p>
          </div>
          <div className="rounded-2xl border border-[color-mix(in_oklab,var(--brand-gold)_28%,transparent)] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-brand-red sm:text-2xl">
              Vision | വീക്ഷണം
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              To build a vibrant community where learners of all ages thrive with confidence—both
              on stage and in life—while carrying our rich cultural heritage forward with pride.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              ഏതു പ്രായത്തിലുള്ളവർക്കും വേദിയിലും ജീവിതത്തിലും ആത്മവിശ്വാസത്തോടെ തിളങ്ങാൻ കഴിയുന്ന
              ഒരു കലാസമൂഹം സൃഷ്ടിക്കുക. നമ്മുടെ സാംസ്കാരിക പൈതൃകത്തെ അഭിമാനപൂർവ്വം വരുംതലമുറകളിലേക്ക്
              കൈമാറുന്ന ഒരു തലമുറയെ വാർത്തെടുക്കുക എന്നതാണ് ഞങ്ങളുടെ ദർശനം.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-[color-mix(in_oklab,white_72%,var(--brand-cream))]">
        <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          Teaching approach / പഠനരീതി
        </h2>
        <ol className="mt-8 list-decimal space-y-8 pl-5 text-sm text-muted sm:text-base md:max-w-3xl marker:font-heading marker:font-semibold marker:text-brand-red">
          {teachingApproachItems.map((item) => (
            <li key={item.title} className="pl-2">
              <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed">{item.bodyEn}</p>
              <p className="mt-2 leading-relaxed">{item.bodyMl}</p>
            </li>
          ))}
        </ol>
      </SectionWrapper>
    </>
  );
}

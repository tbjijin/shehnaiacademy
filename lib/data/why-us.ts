import type { LucideIcon } from "lucide-react";
import { Clock, MonitorSmartphone, Users, UserRound } from "lucide-react";

export type WhyUsItem = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

export const whyUsItems: WhyUsItem[] = [
  {
    title: "Experienced Teachers",
    body: "Patient, skilled faculty who nurture beginners and refine advanced performers.",
    Icon: UserRound,
  },
  {
    title: "Flexible Timings",
    body: "Batches designed around school, work, and family schedules.",
    Icon: Clock,
  },
  {
    title: "Online & Offline Classes",
    body: "Learn from home or join us in person—consistent quality either way.",
    Icon: MonitorSmartphone,
  },
  {
    title: "Suitable for All Ages",
    body: "Programs tailored for children, teens, adults, and seniors alike.",
    Icon: Users,
  },
];

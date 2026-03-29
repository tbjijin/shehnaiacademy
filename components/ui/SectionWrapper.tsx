import type { ReactNode } from "react";

type SectionWrapperProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div";
};

export function SectionWrapper({
  id,
  children,
  className = "",
  innerClassName = "",
  as: Tag = "section",
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={`py-12 sm:py-16 lg:py-20 ${className}`}>
      <div
        className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}

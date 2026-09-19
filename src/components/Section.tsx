import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, num, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="scroll-mt-24 pt-16 pb-18">
      <div className="mb-12 flex items-baseline gap-4 border-b border-border pb-4">
        <span className="font-mono text-xs tracking-[0.2em] text-accent tabular-nums">{num}.</span>
        <h2 id={`${id}-label`} className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

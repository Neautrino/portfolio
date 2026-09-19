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
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-base tracking-[0.16em] text-accent tabular-nums">
          {num}.
        </span>
        <h2 id={`${id}-label`} className="font-body text-xl font-medium text-muted">
          {title}
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}

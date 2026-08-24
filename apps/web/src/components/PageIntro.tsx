import type { ReactNode } from 'react';

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0 max-w-3xl animate-rise">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-campus-ink sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {description ? (
          <div className="mt-2 text-sm leading-relaxed text-campus-deep/75 sm:text-base">{description}</div>
        ) : null}
      </div>
      {actions ? <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto">{actions}</div> : null}
    </header>
  );
}

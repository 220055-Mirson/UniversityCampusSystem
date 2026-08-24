import type { CampusModule } from '@smart-campus/shared-types';
import { ModuleStatusBadge } from './ModuleStatusBadge';

export function ModulePlaceholder({ module }: { module: CampusModule }) {
  return (
    <section className="surface relative overflow-hidden p-8 sm:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-campus-teal/10" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-campus-brass/10" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Módulo preparado</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-campus-ink sm:text-4xl">{module.label}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-campus-deep/80">{module.description}</p>
        </div>
        <ModuleStatusBadge status={module.status} tone="light" />
      </div>

      <div className="relative mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-campus-line bg-campus-mist/80 p-5">
          <h2 className="font-display text-lg font-semibold text-campus-ink">Estado actual</h2>
          <p className="mt-2 text-sm leading-relaxed text-campus-deep/80">
            Este módulo está preparado para integração pelo grupo responsável. O contrato inicial encontra-se
            documentado em <code className="rounded-md bg-white px-1.5 py-0.5 text-xs">docs/integration-guide.md</code>.
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-campus-line bg-campus-mist/80 p-5">
          <h2 className="font-display text-lg font-semibold text-campus-ink">Próximo ponto de extensão</h2>
          <p className="mt-2 text-sm leading-relaxed text-campus-deep/80">
            Criar <code className="rounded-md bg-white px-1.5 py-0.5 text-xs">modules/{module.key}/</code> com domain,
            application, infrastructure, http, schemas e tests — sem duplicar autenticação nem utilizadores.
          </p>
          {module.groupHint ? (
            <p className="mt-3 text-sm font-semibold text-campus-brass">Sugestão: {module.groupHint}</p>
          ) : null}
        </div>
      </div>

      <button type="button" disabled className="btn-secondary relative mt-8 cursor-not-allowed opacity-60">
        Operação indisponível — módulo ainda não integrado
      </button>
    </section>
  );
}

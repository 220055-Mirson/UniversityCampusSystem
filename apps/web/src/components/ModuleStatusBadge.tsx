import type { ModuleStatus } from '@smart-campus/shared-types';

const styles: Record<ModuleStatus, string> = {
  available: 'bg-emerald-500/15 text-emerald-100 border-emerald-400/30',
  partial: 'bg-amber-400/15 text-amber-100 border-amber-300/30',
  development: 'bg-white/10 text-white/70 border-white/15',
};

const stylesLight: Record<ModuleStatus, string> = {
  available: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  partial: 'bg-amber-50 text-amber-900 border-amber-200',
  development: 'bg-slate-100 text-slate-600 border-slate-200',
};

const labels: Record<ModuleStatus, string> = {
  available: 'Disponível',
  partial: 'Parcial',
  development: 'Em desenvolvimento',
};

export function ModuleStatusBadge({ status, tone = 'dark' }: { status: ModuleStatus; tone?: 'dark' | 'light' }) {
  const palette = tone === 'light' ? stylesLight : styles;
  return (
    <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${palette[status]}`}>
      {labels[status]}
    </span>
  );
}

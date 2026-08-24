import type { OpsMetric } from './types';

const options: Array<{ key: OpsMetric; label: string }> = [
  { key: 'occupancy', label: 'Ocupação' },
  { key: 'temperature', label: 'Temperatura' },
  { key: 'co2', label: 'CO₂' },
  { key: 'humidity', label: 'Humidade' },
];

export function MetricFilters({ value, onChange }: { value: OpsMetric; onChange: (m: OpsMetric) => void }) {
  return (
    <div
      className="flex w-full max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-campus-line/80 bg-white/80 p-1.5 shadow-soft sm:w-auto sm:flex-wrap"
      role="tablist"
      aria-label="Métrica do mapa"
    >
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            className={`shrink-0 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              active
                ? 'bg-campus-teal text-white'
                : 'text-campus-deep/75 hover:bg-campus-mist hover:text-campus-ink'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

import type { CampusBuildingView, OpsMetric } from './types';

function pinColor(building: CampusBuildingView, metric: OpsMetric): string {
  const status =
    metric === 'occupancy'
      ? building.utilisation.status
      : metric === 'temperature'
        ? building.temperature.status
        : metric === 'co2'
          ? building.co2.status
          : building.humidity.status;

  if (status === 'GOOD') return '#1f7a6c';
  if (status === 'LOW') return '#c45c26';
  if (status === 'WARN') return '#b45309';
  return '#b91c1c';
}

function pinLabel(building: CampusBuildingView, metric: OpsMetric): string {
  if (metric === 'occupancy') return `${building.utilisation.value}%`;
  if (metric === 'temperature') return `${building.temperature.value}°`;
  if (metric === 'co2') return `${building.co2.value}`;
  return `${building.humidity.value}%`;
}

export function CampusMap({
  buildings,
  metric,
  selectedId,
  onSelect,
}: {
  buildings: CampusBuildingView[];
  metric: OpsMetric;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="campus-ops-map relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-campus-line/70 sm:min-h-[360px]">
      <svg viewBox="0 0 1000 640" className="h-full w-full" role="img" aria-label="Mapa interactivo do campus UJAC">
        <defs>
          <linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dce8df" />
            <stop offset="55%" stopColor="#e8eef4" />
            <stop offset="100%" stopColor="#d5e0ea" />
          </linearGradient>
          <linearGradient id="bldgA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7fafc" />
            <stop offset="100%" stopColor="#c5d4e4" />
          </linearGradient>
          <linearGradient id="bldgB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff8f2" />
            <stop offset="100%" stopColor="#e7cbb8" />
          </linearGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0f2744" floodOpacity="0.12" />
          </filter>
        </defs>

        <rect width="1000" height="640" fill="url(#ground)" />
        <path
          d="M0 470 C180 430 320 520 520 480 C720 440 860 500 1000 460 L1000 640 L0 640 Z"
          fill="#b7cfc0"
          opacity="0.55"
        />
        <path
          d="M40 520 C200 500 280 560 460 540 C650 520 780 580 960 550"
          fill="none"
          stroke="#8eae9d"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.45"
        />
        <text x="70" y="560" fill="#3f5d4f" fontSize="18" fontFamily="IBM Plex Sans, sans-serif">
          Jardim central
        </text>

        <g filter="url(#soft)" className="campus-ops-building" style={{ animationDelay: '80ms' }}>
          <polygon points="180,360 320,290 460,360 320,430" fill="url(#bldgA)" stroke="#8ea3b8" strokeWidth="2" />
          <polygon points="180,360 180,430 320,500 320,430" fill="#9eb2c6" stroke="#7f95aa" strokeWidth="2" />
          <polygon points="320,430 320,500 460,430 460,360" fill="#7f98b0" stroke="#6d879f" strokeWidth="2" />
          <text x="250" y="390" fill="#0f2744" fontSize="22" fontWeight="600" fontFamily="Source Serif 4, serif">
            A
          </text>
          <text x="210" y="520" fill="#163a5f" fontSize="16" fontFamily="IBM Plex Sans, sans-serif">
            Ciências
          </text>
        </g>

        <g filter="url(#soft)" className="campus-ops-building" style={{ animationDelay: '160ms' }}>
          <polygon points="560,300 700,230 840,300 700,370" fill="url(#bldgB)" stroke="#c4a08a" strokeWidth="2" />
          <polygon points="560,300 560,370 700,440 700,370" fill="#d4b09a" stroke="#b9927a" strokeWidth="2" />
          <polygon points="700,370 700,440 840,370 840,300" fill="#c4987e" stroke="#b07f64" strokeWidth="2" />
          <text x="670" y="330" fill="#0f2744" fontSize="22" fontWeight="600" fontFamily="Source Serif 4, serif">
            B
          </text>
          <text x="620" y="470" fill="#163a5f" fontSize="16" fontFamily="IBM Plex Sans, sans-serif">
            Laboratórios
          </text>
        </g>

        <ellipse cx="500" cy="560" rx="70" ry="28" fill="#f4f7fa" stroke="#c9d6e4" strokeWidth="2" opacity="0.9" />
        <text x="470" y="565" fill="#163a5f" fontSize="14" fontFamily="IBM Plex Sans, sans-serif">
          Praça
        </text>

        {buildings.map((b, idx) => {
          const cx = (b.mapX / 100) * 1000;
          const cy = (b.mapY / 100) * 640;
          const selected = selectedId === b.id;
          const color = pinColor(b, metric);
          return (
            <g
              key={b.id}
              className="campus-ops-pin"
              style={{ cursor: 'pointer', animationDelay: `${220 + idx * 80}ms` }}
              onClick={() => onSelect(b.id)}
            >
              <circle cx={cx} cy={cy} r={selected ? 34 : 28} fill={color} opacity={0.2} className="campus-ops-pulse" />
              <circle cx={cx} cy={cy} r={selected ? 22 : 18} fill={color} stroke="#fff" strokeWidth="3" />
              <text
                x={cx}
                y={cy + 5}
                textAnchor="middle"
                fill="#fff"
                fontSize="12"
                fontWeight="700"
                fontFamily="IBM Plex Sans, sans-serif"
              >
                {pinLabel(b, metric)}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-white/70 to-transparent p-4">
        <p className="font-display text-xl font-semibold text-campus-ink">Campus UJAC</p>
        <p className="text-xs text-campus-deep/70">Mapa operacional · pinos por métrica seleccionada</p>
      </div>
    </div>
  );
}

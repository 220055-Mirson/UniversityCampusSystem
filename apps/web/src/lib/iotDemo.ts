export type IotDeviceView = {
  id: string;
  code: string;
  name: string;
  type: string;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'UNKNOWN';
  roomLabel: string;
  mqttTopic: string;
  signal: number;
  battery: number;
  lastSeenLabel: string;
  metrics: Array<{ key: string; label: string; value: string; unit: string; trend: number[] }>;
  isDemo: boolean;
};

const DEMO_EXTRA: IotDeviceView[] = [
  {
    id: 'demo-gate-01',
    code: 'GATE-A-01',
    name: 'Contador de fluxo — Portaria A',
    type: 'PeopleCounter',
    status: 'ONLINE',
    roomLabel: 'Entrada principal',
    mqttTopic: 'campus/gate/a/flow',
    signal: 92,
    battery: 100,
    lastSeenLabel: 'há 4 s',
    metrics: [
      { key: 'flow', label: 'Fluxo', value: '18', unit: 'pess/min', trend: [8, 12, 10, 16, 14, 19, 18] },
      { key: 'today', label: 'Hoje', value: '396', unit: 'entradas', trend: [40, 80, 120, 180, 240, 320, 396] },
    ],
    isDemo: true,
  },
  {
    id: 'demo-park-01',
    code: 'PARK-B-03',
    name: 'Sensor de estacionamento B3',
    type: 'Parking',
    status: 'ONLINE',
    roomLabel: 'Parque B',
    mqttTopic: 'campus/parking/b/slot-03',
    signal: 78,
    battery: 64,
    lastSeenLabel: 'há 11 s',
    metrics: [
      { key: 'free', label: 'Livres', value: '27', unit: 'lugares', trend: [40, 36, 33, 30, 29, 28, 27] },
      { key: 'occ', label: 'Ocupação', value: '71', unit: '%', trend: [50, 55, 60, 64, 68, 70, 71] },
    ],
    isDemo: true,
  },
  {
    id: 'demo-light-01',
    code: 'LUX-A-201',
    name: 'Iluminação inteligente A-201',
    type: 'Lighting',
    status: 'MAINTENANCE',
    roomLabel: 'Sala A-201',
    mqttTopic: 'campus/building-a/room-a201/light',
    signal: 61,
    battery: 88,
    lastSeenLabel: 'há 2 min',
    metrics: [
      { key: 'lux', label: 'Luminosidade', value: '312', unit: 'lux', trend: [280, 290, 305, 320, 318, 315, 312] },
      { key: 'pwr', label: 'Consumo', value: '0.42', unit: 'kW', trend: [0.5, 0.48, 0.46, 0.45, 0.44, 0.43, 0.42] },
    ],
    isDemo: true,
  },
  {
    id: 'demo-lab-01',
    code: 'AIR-LAB-01',
    name: 'Qualidade do ar — Lab IoT',
    type: 'AirQuality',
    status: 'ONLINE',
    roomLabel: 'B-L01',
    mqttTopic: 'campus/building-b/lab-iot/air',
    signal: 88,
    battery: 76,
    lastSeenLabel: 'há 7 s',
    metrics: [
      { key: 'pm25', label: 'PM2.5', value: '12', unit: 'µg/m³', trend: [18, 16, 15, 14, 13, 12, 12] },
      { key: 'voc', label: 'VOC', value: '0.18', unit: 'ppm', trend: [0.22, 0.21, 0.2, 0.19, 0.19, 0.18, 0.18] },
    ],
    isDemo: true,
  },
];

function sparkFromSeed(seed: number, base: number): number[] {
  return Array.from({ length: 7 }, (_, i) => Math.round((base + Math.sin(seed + i) * 2 + i * 0.3) * 10) / 10);
}

export function mapApiDevices(raw: Array<Record<string, unknown>>): IotDeviceView[] {
  const fromApi: IotDeviceView[] = raw.map((d, idx) => {
    const sensors = (d.sensors as Array<{ metric?: string; unit?: string | null }> | undefined) ?? [];
    const room = d.room as { code?: string; name?: string } | null | undefined;
    const status = String(d.status || 'UNKNOWN') as IotDeviceView['status'];
    const tempTrend = sparkFromSeed(idx + 1, 24);
    return {
      id: String(d.id),
      code: String(d.code),
      name: String(d.name),
      type: String(d.type),
      status: ['ONLINE', 'OFFLINE', 'MAINTENANCE', 'UNKNOWN'].includes(status) ? status : 'UNKNOWN',
      roomLabel: room ? `${room.code ?? ''} ${room.name ?? ''}`.trim() || 'Sem sala' : 'Sem sala',
      mqttTopic: String(d.mqttTopic ?? `campus/device/${d.code}`),
      signal: status === 'ONLINE' ? 86 + (idx % 10) : status === 'MAINTENANCE' ? 54 : 22,
      battery: 100,
      lastSeenLabel: status === 'ONLINE' ? 'há 3 s' : status === 'MAINTENANCE' ? 'há 6 min' : 'há 2 h',
      metrics:
        sensors.length > 0
          ? sensors.slice(0, 2).map((s, i) => ({
              key: s.metric ?? `m${i}`,
              label: s.metric === 'temperature' ? 'Temperatura' : (s.metric ?? 'Métrica'),
              value: String(tempTrend[tempTrend.length - 1]),
              unit: s.unit ?? '',
              trend: tempTrend,
            }))
          : [
              {
                key: 'rssi',
                label: 'Sinal',
                value: String(86 + (idx % 10)),
                unit: '%',
                trend: [70, 74, 78, 80, 82, 85, 86],
              },
            ],
      isDemo: true,
    };
  });

  return [...fromApi, ...DEMO_EXTRA];
}

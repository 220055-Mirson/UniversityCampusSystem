import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { mapApiDevices, type IotDeviceView } from '../lib/iotDemo';
import { IotDeviceCard } from '../components/iot/IotDeviceCard';
import { PageIntro } from '../components/PageIntro';

export function DevicesPage() {
  const { api } = useAuth();
  const [devices, setDevices] = useState<IotDeviceView[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'ONLINE' | 'MAINTENANCE' | 'OFFLINE'>('ALL');

  useEffect(() => {
    api
      .devices()
      .then((res) => setDevices(mapApiDevices(res.data as Array<Record<string, unknown>>)))
      .catch((err: Error) => setError(err.message));
  }, [api]);

  const filtered = devices.filter((d) => (filter === 'ALL' ? true : d.status === filter));

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Inventário IoT"
        title="Dispositivos"
        description="Registo visual de nós do campus — mistura dados do Core com simulação DEMO para o grupo IoT."
        actions={
          <Link to="/iot" className="btn-primary">
            Ver hub IoT
          </Link>
        }
      />

      <div className="flex flex-wrap gap-2">
        {(['ALL', 'ONLINE', 'MAINTENANCE', 'OFFLINE'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-xl border px-3 py-1.5 text-sm font-semibold transition ${
              filter === f
                ? 'border-campus-teal bg-campus-teal text-white'
                : 'border-campus-line bg-white text-campus-deep/75 hover:bg-campus-mist'
            }`}
          >
            {f === 'ALL' ? 'Todos' : f}
          </button>
        ))}
      </div>

      {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((device) => (
          <IotDeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
}

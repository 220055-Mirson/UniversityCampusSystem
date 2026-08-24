import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCampusOpsData } from '../hooks/useCampusOpsData';
import { BuildingDetailPanel } from '../components/campus-ops/BuildingDetailPanel';
import { CampusMap } from '../components/campus-ops/CampusMap';
import { LiveTicker } from '../components/campus-ops/LiveTicker';
import { MetricFilters } from '../components/campus-ops/MetricFilters';
import { OccupancyPulse } from '../components/campus-ops/OccupancyPulse';
import { WeeklyPatternChart } from '../components/campus-ops/WeeklyPatternChart';
import type { OpsMetric } from '../components/campus-ops/types';
import { PageIntro } from '../components/PageIntro';

export function CampusOpsPage() {
  const { summary, buildings, weeklyPattern, occupancyPeople, occupancyPercent, loading, error } = useCampusOpsData();
  const [metric, setMetric] = useState<OpsMetric>('temperature');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    if (!selectedId && buildings[0]) {
      setSelectedId(buildings[0].id);
      setPanelOpen(true);
    }
  }, [buildings, selectedId]);

  const selected = useMemo(() => buildings.find((b) => b.id === selectedId) ?? null, [buildings, selectedId]);

  function handleSelect(id: string) {
    setSelectedId(id);
    setPanelOpen(true);
  }

  if (loading) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-campus-deep/70">A preparar o centro de operações…</div>
    );
  }

  if (error) {
    return <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-campus-brass/25 bg-gradient-to-r from-campus-brass/10 via-white/70 to-campus-teal/10 px-3 py-3 text-sm text-campus-ink sm:px-4">
        Visualização operacional — métricas IoT parcialmente demonstrativas até integração MQTT.{' '}
        <Link to="/dashboard" className="inline font-semibold text-campus-teal underline decoration-campus-teal/30 underline-offset-2">
          Abrir dashboard clássico
        </Link>
      </div>

      <PageIntro
        eyebrow="Centro de operações"
        title="Smart Campus"
        description={
          <>
            Olá, {summary?.currentUser.fullName} · Core {summary?.coreStatus} · {summary?.roomsCount ?? 0} salas ·{' '}
            {summary?.openIncidents ?? 0} ocorrências abertas
          </>
        }
        actions={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <MetricFilters value={metric} onChange={setMetric} />
            <OccupancyPulse people={occupancyPeople} percent={occupancyPercent} />
          </div>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
        <CampusMap buildings={buildings} metric={metric} selectedId={selectedId} onSelect={handleSelect} />
        <BuildingDetailPanel building={selected} open={panelOpen} />
      </section>

      <WeeklyPatternChart cells={weeklyPattern} />
      <LiveTicker summary={summary} />

      <section className="flex flex-wrap gap-2.5">
        {[
          { to: '/rooms', label: 'Salas' },
          { to: '/incidents', label: 'Ocorrências' },
          { to: '/devices', label: 'Dispositivos' },
          { to: '/dashboard', label: 'Dashboard Core' },
        ].map((item) => (
          <Link key={item.to} to={item.to} className="btn-secondary !py-2 text-sm">
            {item.label}
          </Link>
        ))}
      </section>
    </div>
  );
}

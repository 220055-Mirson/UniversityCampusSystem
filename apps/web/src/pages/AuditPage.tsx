import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function AuditPage() {
  const { api, user } = useAuth();
  const [events, setEvents] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState<string | null>(null);
  const allowed = !!user && ['ADMIN', 'COORDINATOR'].includes(user.role);

  useEffect(() => {
    if (!allowed) return;
    api
      .auditEvents()
      .then((res) => setEvents(res.data as Array<Record<string, unknown>>))
      .catch((err: Error) => setError(err.message));
  }, [api, allowed]);

  if (user && !allowed) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-campus-line bg-white/85 p-5 shadow-panel">
        <h2 className="font-display text-2xl">Auditoria</h2>
        <p className="mt-1 text-sm text-campus-deep/75">Eventos relevantes com correlationId no backend.</p>
      </section>
      {error ? <p className="text-red-700">{error}</p> : null}
      <div className="table-scroll rounded-2xl border border-campus-line bg-white shadow-panel">
        <table className="min-w-[640px] text-left text-sm">
          <thead className="bg-campus-mist">
            <tr>
              <th className="px-4 py-3">Acção</th>
              <th className="px-4 py-3">Recurso</th>
              <th className="px-4 py-3">Correlation</th>
              <th className="px-4 py-3">Quando</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={String(e.id)} className="border-t border-campus-line/70">
                <td className="px-4 py-3">{String(e.action)}</td>
                <td className="px-4 py-3">{String(e.resource)}</td>
                <td className="px-4 py-3 font-mono text-xs">{String(e.correlationId)}</td>
                <td className="px-4 py-3">{new Date(String(e.createdAt)).toLocaleString('pt-PT')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { FormEvent, useEffect, useState } from 'react';
import type { IncidentDto, RoomDto } from '@smart-campus/shared-types';
import { useAuth } from '../lib/auth';
import { PageIntro } from '../components/PageIntro';

export function IncidentsPage() {
  const { api, user } = useAuth();
  const [incidents, setIncidents] = useState<IncidentDto[]>([]);
  const [rooms, setRooms] = useState<RoomDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', priority: 'MEDIUM', roomId: '' });
  const canTreat = user && ['TECHNICIAN', 'COORDINATOR', 'ADMIN'].includes(user.role);

  async function load() {
    const [incRes, roomsRes] = await Promise.all([api.incidents(), api.rooms()]);
    setIncidents(incRes.data);
    setRooms(roomsRes.data);
    if (!form.roomId && roomsRes.data[0]) setForm((f) => ({ ...f, roomId: roomsRes.data[0].id }));
  }

  useEffect(() => {
    load().catch((err: Error) => setError(err.message));
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    try {
      await api.createIncident({
        title: form.title,
        description: form.description,
        priority: form.priority,
        roomId: form.roomId || null,
      });
      setForm((f) => ({ ...f, title: '', description: '' }));
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar ocorrência');
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await api.updateIncidentStatus(id, { status, notes: `Actualizado para ${status}` });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao actualizar estado');
    }
  }

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Manutenção"
        title="Ocorrências"
        description="Fluxo transversal: login → sala → criar ocorrência → alterar estado → auditoria."
      />

      {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <form onSubmit={onCreate} className="surface grid gap-3 p-4 sm:p-5 md:grid-cols-2">
        <input className="field-input !mt-0" placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <select className="field-input !mt-0" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select className="field-input !mt-0" value={form.roomId} onChange={(e) => setForm({ ...form, roomId: e.target.value })}>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.code} — {r.name}
            </option>
          ))}
        </select>
        <textarea className="field-input !mt-0 md:col-span-2" rows={3} placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button type="submit" className="btn-primary w-full md:col-span-2 md:w-fit">
          Registar ocorrência
        </button>
      </form>

      <div className="space-y-3">
        {incidents.map((incident) => (
          <article key={incident.id} className="surface p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-campus-ink">{incident.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-campus-deep/75">{incident.description}</p>
                <p className="mt-2 text-xs text-campus-deep/55">
                  {incident.status} · {incident.priority} · {new Date(incident.createdAt).toLocaleString('pt-PT')}
                </p>
              </div>
              {canTreat ? (
                <div className="flex flex-wrap gap-2">
                  {['IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => void updateStatus(incident.id, status)}
                      className="rounded-lg border border-campus-line px-2.5 py-1 text-xs font-medium hover:bg-campus-mist"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

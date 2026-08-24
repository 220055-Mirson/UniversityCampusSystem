import { useEffect, useState } from 'react';
import type { AuthUser } from '@smart-campus/shared-types';
import { useAuth } from '../lib/auth';
import { Navigate } from 'react-router-dom';

export function UsersPage() {
  const { api, user } = useAuth();
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const allowed = !!user && ['ADMIN', 'COORDINATOR'].includes(user.role);

  useEffect(() => {
    if (!allowed) return;
    api
      .users()
      .then((res) => setUsers(res.data))
      .catch((err: Error) => setError(err.message));
  }, [api, allowed]);

  if (user && !allowed) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-campus-line bg-white/85 p-5 shadow-panel">
        <h2 className="font-display text-2xl">Utilizadores e perfis</h2>
        <p className="mt-1 text-sm text-campus-deep/75">Gestão Core de contas e roles.</p>
      </section>
      {error ? <p className="text-red-700">{error}</p> : null}
      <div className="table-scroll rounded-2xl border border-campus-line bg-white shadow-panel">
        <table className="min-w-[560px] text-left text-sm">
          <thead className="bg-campus-mist">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-campus-line/70">
                <td className="px-4 py-3">{u.fullName}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">{u.isActive ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

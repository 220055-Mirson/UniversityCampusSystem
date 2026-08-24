import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { ModuleStatusBadge } from '../components/ModuleStatusBadge';

export function AdminPage() {
  const { user } = useAuth();
  if (user && user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;

  return (
    <section className="rounded-2xl border border-campus-line bg-white/85 p-6 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl">Administração do sistema</h2>
          <p className="mt-2 text-campus-deep/75">
            Área administrativa do Core. Configurações avançadas e políticas ficam para extensões controladas.
          </p>
        </div>
        <ModuleStatusBadge status="partial" />
      </div>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-campus-deep/80">
        <li>Gestão de utilizadores disponível em /users</li>
        <li>Auditoria disponível em /audit</li>
        <li>Swagger em /api/docs</li>
        <li>Alterações de contrato devem seguir docs/integration-guide.md</li>
      </ul>
    </section>
  );
}

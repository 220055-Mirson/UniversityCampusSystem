import { campusModules } from '@smart-campus/shared-types';
import { ModulePlaceholder } from '../components/ModulePlaceholder';

export function ModulePlaceholderPage({ moduleKey }: { moduleKey: string }) {
  const module = campusModules.find((m) => m.key === moduleKey);
  if (!module) return <p>Módulo não encontrado.</p>;
  return <ModulePlaceholder module={module} />;
}

import { describe, expect, it } from 'vitest';
import { campusModules } from '@smart-campus/shared-types';

describe('rotas principais', () => {
  it('inclui ops como principal e módulos obrigatórios', () => {
    const paths = campusModules.map((m) => m.path);
    expect(paths).toContain('/ops');
    expect(paths).toContain('/dashboard');
    expect(paths).toContain('/rooms');
    expect(paths).toContain('/incidents');
    expect(paths).toContain('/iot');
    expect(campusModules[0]?.key).toBe('ops');
    expect(campusModules.every((m) => ['available', 'partial', 'development'].includes(m.status))).toBe(true);
  });
});

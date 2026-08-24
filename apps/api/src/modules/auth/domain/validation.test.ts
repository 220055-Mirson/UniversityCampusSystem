import { describe, expect, it } from 'vitest';
import { loginSchema, createRoomSchema, createIncidentSchema } from '@smart-campus/validation';

describe('validação', () => {
  it('rejeita email inválido no login', () => {
    const result = loginSchema.safeParse({ email: 'x', password: '12345678' });
    expect(result.success).toBe(false);
  });

  it('aceita sala válida', () => {
    const result = createRoomSchema.safeParse({
      code: 'C-101',
      name: 'Sala C',
      capacity: 20,
      floor: 1,
      buildingId: 'bld_1',
    });
    expect(result.success).toBe(true);
  });

  it('exige título mínimo na ocorrência', () => {
    const result = createIncidentSchema.safeParse({
      title: 'ab',
      description: 'descrição válida',
    });
    expect(result.success).toBe(false);
  });
});

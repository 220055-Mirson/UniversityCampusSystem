import { describe, expect, it } from 'vitest';
import { isValidMozambiquePlate, normalizeMozambiquePlate } from '@smart-campus/validation';

describe('matrículas moçambicanas', () => {
  it('aceita formatos MP/MC a começar por A e legado', () => {
    expect(isValidMozambiquePlate('AIT 954 MC')).toBe(true);
    expect(isValidMozambiquePlate('AMH 722 MP')).toBe(true);
    expect(isValidMozambiquePlate('MLY 72 22')).toBe(true);
    expect(isValidMozambiquePlate('ait-954-mc')).toBe(true);
  });

  it('rejeita formatos inválidos', () => {
    expect(isValidMozambiquePlate('BIT 954 MC')).toBe(false);
    expect(isValidMozambiquePlate('ABC 1234 MC')).toBe(false);
    expect(isValidMozambiquePlate('AIT 954 GZ')).toBe(false);
    expect(isValidMozambiquePlate('SC-2026-01')).toBe(false);
    expect(isValidMozambiquePlate('123 ABC MP')).toBe(false);
  });

  it('normaliza espaços e hífens', () => {
    expect(normalizeMozambiquePlate('  ait  954  mc ')).toBe('AIT 954 MC');
    expect(normalizeMozambiquePlate('AMH-722-MP')).toBe('AMH 722 MP');
  });
});

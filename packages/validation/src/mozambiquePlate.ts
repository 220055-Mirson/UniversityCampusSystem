/** Matrículas moçambicanas aceites no Core:
 * - Actual: AXX 123 MP | AXX 123 MC  (começam sempre por A; ex.: AIT 954 MC, AMH 722 MP)
 * - Anterior / variante: AAA 12 34     (ex.: MLY 72 22)
 */
export const MZ_PLATE_MODERN = /^A[A-Z]{2} \d{3} (MP|MC)$/;
export const MZ_PLATE_LEGACY = /^[A-Z]{3} \d{2} \d{2}$/;

export function normalizeMozambiquePlate(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .replace(/[-_/]/g, ' ')
    .replace(/\s+/g, ' ');
}

export function isValidMozambiquePlate(raw: string): boolean {
  const plate = normalizeMozambiquePlate(raw);
  return MZ_PLATE_MODERN.test(plate) || MZ_PLATE_LEGACY.test(plate);
}

export const MOZAMBIQUE_PLATE_MESSAGE =
  'Matrícula inválida. Use formatos moçambicanos: AXX 123 MP, AXX 123 MC (começam por A) ou AAA 12 34 (ex.: AIT 954 MC, AMH 722 MP, MLY 72 22).';

export const DEMO_MZ_PLATES = [
  'AIT 954 MC',
  'AMH 722 MP',
  'MLY 72 22',
  'ABR 301 MC',
  'ADP 448 MP',
  'FGT 19 05',
  'AHK 883 MC',
  'ANP 256 MP',
] as const;

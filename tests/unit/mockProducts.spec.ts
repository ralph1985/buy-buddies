import { expect, it } from 'vitest';
import { mockProducts } from '../../src/infra/repositories/products/mockProducts.js';

it('los grupos del mock son inventados y no vacíos', () => {
  const groups = new Set(mockProducts.map((p) => p.group));
  expect(groups.size).toBeGreaterThan(0);
  for (const g of groups) {
    expect(g).toMatch(/(Grupo|Equipo|Brigada|Cuadrilla)/);
  }
});

it('los productos del mock son reales/comunes', () => {
  const sample = mockProducts.map((p) => p.name.toLowerCase());
  expect(sample).toEqual(
    expect.arrayContaining(['pan', 'leche', 'cerveza', 'agua', 'huevos'])
  );
});

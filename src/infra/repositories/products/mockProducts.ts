import type { Product } from '../../../domain/types.js';

// Nombres de grupos inventados (no reales)
const GROUPS = [
  'Grupo Abarrotes',
  'Equipo Frescos',
  'Brigada Bebidas',
  'Cuadrilla Limpieza',
];

export const mockProducts: Product[] = [
  { id: 'p-001', name: 'Pan',        category: 'Panadería', group: GROUPS[0], bought: false, quantity: 1, unit: 'ud' },
  { id: 'p-002', name: 'Leche',      category: 'Lácteos',   group: GROUPS[1], bought: false, quantity: 6, unit: 'l'  },
  { id: 'p-003', name: 'Huevos',     category: 'Frescos',   group: GROUPS[1], bought: false, quantity: 12, unit: 'ud' },
  { id: 'p-004', name: 'Cerveza',    category: 'Bebidas',   group: GROUPS[2], bought: false, quantity: 24, unit: 'ud' },
  { id: 'p-005', name: 'Agua',       category: 'Bebidas',   group: GROUPS[2], bought: false, quantity: 12, unit: 'l'  },
  { id: 'p-006', name: 'Manzanas',   category: 'Fruta',     group: GROUPS[1], bought: false, quantity: 2, unit: 'kg' },
  { id: 'p-007', name: 'Papel higiénico', category: 'Higiene', group: GROUPS[3], bought: false, quantity: 24, unit: 'ud' },
  { id: 'p-008', name: 'Detergente', category: 'Limpieza',  group: GROUPS[3], bought: false, quantity: 1, unit: 'ud' },
  { id: 'p-009', name: 'Tomates',    category: 'Verdura',   group: GROUPS[1], bought: false, quantity: 2, unit: 'kg' },
  { id: 'p-010', name: 'Café',       category: 'Despensa',  group: GROUPS[0], bought: false, quantity: 2, unit: 'ud' },
];

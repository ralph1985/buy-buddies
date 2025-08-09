import { describe, it, expect } from 'vitest';
import { filterShoppingItems, type ShoppingFilters } from './filter-shopping-items.js';
import type { ShoppingItem } from '../models/shopping-item.js';

const items: ShoppingItem[] = [
  {
    id: '1',
    name: 'Agua',
    quantity: '1',
    unit: 'L',
    group: 'Familia',
    category: 'Bebida',
    notes: 'fría',
    bought: false,
  },
  {
    id: '2',
    name: 'Leche',
    quantity: '1',
    unit: 'L',
    group: 'Amigos',
    category: 'Lácteos',
    notes: 'entera',
    bought: true,
  },
];

describe('filterShoppingItems', () => {
  it('filters by text in name or notes', () => {
    const filters: ShoppingFilters = { text: 'fría' };
    const res = filterShoppingItems(items, filters);
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe('1');
  });

  it('filters by group and category', () => {
    const filters: ShoppingFilters = { group: 'Amigos', category: 'Lácteos' };
    const res = filterShoppingItems(items, filters);
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe('2');
  });

  it('filters by status comprado', () => {
    const filters: ShoppingFilters = { status: 'comprado' };
    const res = filterShoppingItems(items, filters);
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe('2');
  });

  it('filters by status no-comprado', () => {
    const filters: ShoppingFilters = { status: 'no-comprado' };
    const res = filterShoppingItems(items, filters);
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe('1');
  });
});

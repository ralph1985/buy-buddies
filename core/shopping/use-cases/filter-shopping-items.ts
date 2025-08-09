import type { ShoppingItem } from '../models/shopping-item.js';

export interface ShoppingFilters {
  text?: string;
  group?: string;
  category?: string;
  status?: 'todos' | 'comprado' | 'no-comprado';
}

export function filterShoppingItems(
  items: ShoppingItem[],
  filters: ShoppingFilters,
): ShoppingItem[] {
  const text = filters.text?.toLowerCase().trim() ?? '';
  return items.filter((item) => {
    if (filters.group && item.group !== filters.group) {
      return false;
    }
    if (filters.category && item.category !== filters.category) {
      return false;
    }
    if (filters.status === 'comprado' && !item.bought) {
      return false;
    }
    if (filters.status === 'no-comprado' && item.bought) {
      return false;
    }
    if (
      text &&
      !(`${item.name} ${item.notes ?? ''}`.toLowerCase().includes(text))
    ) {
      return false;
    }
    return true;
  });
}

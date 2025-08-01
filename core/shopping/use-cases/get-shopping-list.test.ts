import { describe, it, expect } from 'vitest';
import { getShoppingList } from './get-shopping-list.js';
import { MockShoppingRepository } from '../../../infra/mock/shopping-repository.js';

describe('getShoppingList', () => {
  it('returns items from repository', async () => {
    const repo = new MockShoppingRepository();
    const items = await getShoppingList(repo);
    expect(items.length).toBe(2);
    expect(items[0].name).toBe('Milk');
  });
});

import { describe, expect, it } from 'vitest';

import { MockShoppingRepository } from '../../../infra/mock/shopping-repository.js';
import { getShoppingList } from './get-shopping-list.js';

describe('getShoppingList', () => {
  it('returns items from repository', async () => {
    const repo = new MockShoppingRepository();
    const items = await getShoppingList(repo);
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]!.name).toBe('Pan');
  });
});

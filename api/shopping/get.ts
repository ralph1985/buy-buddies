import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getShoppingList } from '../../core/shopping/use-cases/get-shopping-list.js';
import { GoogleSheetsShoppingRepository } from '../../infra/google-sheets/shopping-repository.js';
import { MockShoppingRepository } from '../../infra/mock/shopping-repository.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const repo = process.env.USE_MOCK_REPO
    ? new MockShoppingRepository()
    : new GoogleSheetsShoppingRepository();
  const items = await getShoppingList(repo);
  res.status(200).json(items);
}

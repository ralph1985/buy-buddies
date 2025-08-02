import { getShoppingList } from '../../core/shopping/use-cases/get-shopping-list.js';
import { GoogleSheetsShoppingRepository } from '../../infra/google-sheets/shopping-repository.js';
import { MockShoppingRepository } from '../../infra/mock/shopping-repository.js';

interface Response {
  status(code: number): { json(body: unknown): void };
}

export default async function handler(_req: unknown, res: Response) {
  const repo = process.env.USE_MOCK_REPO
    ? new MockShoppingRepository()
    : new GoogleSheetsShoppingRepository();
  const items = await getShoppingList(repo);
  res.status(200).json(items);
}

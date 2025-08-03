import { getShoppingList } from '../../core/shopping/use-cases/get-shopping-list.js';
import { GoogleSheetsShoppingRepository } from '../../infra/google-sheets/shopping-repository.js';
import { MockShoppingRepository } from '../../infra/mock/shopping-repository.js';

interface Request {
  query?: { googleSheetId?: string };
}

interface Response {
  status(code: number): { json(body: unknown): void };
}

export default async function handler(req: Request, res: Response) {
  const googleSheetId = req.query?.googleSheetId;
  const repo = googleSheetId
    ? new GoogleSheetsShoppingRepository(googleSheetId)
    : new MockShoppingRepository();
  const items = await getShoppingList(repo);
  res.status(200).json(items);
}

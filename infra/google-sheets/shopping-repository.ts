import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import type { ShoppingRepository } from '../../core/shopping/ports/shopping-repository.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

export class GoogleSheetsShoppingRepository implements ShoppingRepository {
  async getItems(): Promise<ShoppingItem[]> {
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
      key: (process.env.GOOGLE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID as string,
      auth,
    );
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]!;
    const rows = await sheet.getRows();
    return rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      group: r.group,
      category: r.category,
      assignedTo: r.assignedTo,
      bought: r.bought === 'TRUE' || r.bought === true,
    }));
  }
}

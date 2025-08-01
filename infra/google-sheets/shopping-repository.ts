import { GoogleSpreadsheet } from 'google-spreadsheet';
import { ShoppingRepository } from '../../core/shopping/ports/shopping-repository.js';
import { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

export class GoogleSheetsShoppingRepository implements ShoppingRepository {
  async getItems(): Promise<ShoppingItem[]> {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID as string);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
      private_key: (process.env.GOOGLE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      group: r.group,
      category: r.category,
      assignedTo: r.assignedTo,
      bought: r.bought === 'TRUE' || r.bought === true,
    }));
  }
}

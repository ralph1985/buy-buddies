import { GoogleSpreadsheet } from 'google-spreadsheet';
import { GoogleAuth } from 'google-auth-library';
import type { ShoppingRepository } from '../../core/shopping/ports/shopping-repository.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

export class GoogleSheetsShoppingRepository implements ShoppingRepository {
  constructor(private sheetId: string) {}

  async getItems(): Promise<ShoppingItem[]> {
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(this.sheetId, auth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex?.[0];
    if (!sheet) {
      throw new Error('No worksheet found at index 0');
    }

    const rows = await sheet.getRows();

    const toBool = (v: unknown): boolean => {
      if (typeof v === 'boolean') return v;
      const s = String(v ?? '').trim().toLowerCase();
      if (!s) return false; // por defecto false
      return s === 'true' || s === '1' || s === 'yes' || s === 'y' || s === 'x';
    };

    return rows.map((row) => ({
      id: String(row.get('id') ?? '').trim(),
      name: String(row.get('name') ?? '').trim(),
      quantity: String(row.get('quantity') ?? '').trim(),
      unit: String(row.get('unit') ?? '').trim(),
      group: String(row.get('group') ?? '').trim(),
      category: String(row.get('category') ?? '').trim(),
      notes: String(row.get('notes') ?? '').trim(),
      bought: toBool(row.get('bought')), // booleano garantizado, false por defecto
    }));
  }
}

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { GoogleAuth } from 'google-auth-library';
import type { ShoppingRepository } from '../../core/shopping/ports/shopping-repository.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

const toSheetBool = (val: boolean | undefined) => (val ? 'TRUE' : 'FALSE');

export class GoogleSheetsShoppingRepository implements ShoppingRepository {
  constructor(private sheetId: string) {}

  private async getSheet(readonly: boolean) {
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      },
      scopes: [
        readonly
          ? 'https://www.googleapis.com/auth/spreadsheets.readonly'
          : 'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(this.sheetId, auth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex?.[0];
    if (!sheet) {
      throw new Error('No worksheet found at index 0');
    }

    return sheet;
  }

  async getItems(): Promise<ShoppingItem[]> {
    const sheet = await this.getSheet(true);
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

  async addItem(item: ShoppingItem): Promise<void> {
    const sheet = await this.getSheet(false);
    await sheet.addRow({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      group: item.group,
      category: item.category,
      notes: item.notes,
      bought: toSheetBool(item.bought),
    });
  }

  async updateItem(item: ShoppingItem): Promise<void> {
    const sheet = await this.getSheet(false);
    const rows = await sheet.getRows();
    const row = rows.find(
      (r) => String(r.get('id') ?? '').trim() === item.id,
    );
    if (!row) {
      throw new Error(`Item with id ${item.id} not found`);
    }
    row.set('name', item.name);
    row.set('quantity', item.quantity);
    row.set('unit', item.unit);
    row.set('group', item.group);
    row.set('category', item.category);
    row.set('notes', item.notes);
    row.set('bought', toSheetBool(item.bought));
    await row.save();
  }
}

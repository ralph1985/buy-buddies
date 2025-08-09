import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { GoogleAuth } from 'google-auth-library';
import type { ShoppingRepository } from '../../core/shopping/ports/shopping-repository.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

const toSheetBool = (val: boolean | undefined) => (val ? 'TRUE' : 'FALSE');
const toSheetString = (val: string | undefined) => val ?? '';

const mapGoogleError = (error: any, defaultMessage: string): never => {
  console.error(defaultMessage + ':', error);
  let message = defaultMessage;
  let code = error?.code;
  if (error?.code === 401 || error?.code === 403) {
    message = 'No autorizado: revisa las credenciales';
    code = 401;
  } else if (error?.code === 404) {
    message = 'Hoja no encontrada';
    code = 404;
  } else if (
    error?.code === 'NETWORK' ||
    error?.code === 'ENOTFOUND' ||
    error?.code === 'ECONNREFUSED' ||
    error?.code === 'ECONNRESET'
  ) {
    message = 'Error de red al conectar con Google Sheets';
    code = 'NETWORK';
  } else if (error?.code === 'FORMAT') {
    message = 'Error en el formato de los datos de la hoja de cálculo';
    code = 'FORMAT';
  }
  const err: any = new Error(message);
  err.code = code;
  throw err;
};

export class GoogleSheetsShoppingRepository implements ShoppingRepository {
  constructor(private sheetId: string) {}

  private async getSheet(readonly: boolean): Promise<GoogleSpreadsheetWorksheet> {
    try {
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
        const err: any = new Error('Hoja no encontrada');
        err.code = 404;
        throw err;
      }

      return sheet;
    } catch (error) {
      return mapGoogleError(error, 'Error al acceder a Google Sheets');
    }
  }

  async getItems(): Promise<ShoppingItem[]> {
    try {
      const sheet = await this.getSheet(true);
      const rows = await sheet.getRows();
      if (!Array.isArray(rows)) {
        const err: any = new Error('Invalid data');
        err.code = 'FORMAT';
        throw err;
      }

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
    } catch (error) {
      return mapGoogleError(error, 'Error al obtener la lista de compras');
    }
  }

  async addItem(item: ShoppingItem): Promise<void> {
    try {
      const sheet = await this.getSheet(false);
      await sheet.addRow({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        group: item.group,
        category: item.category,
        notes: toSheetString(item.notes),
        bought: toSheetBool(item.bought),
      });
    } catch (error) {
      mapGoogleError(error, 'Error al agregar el artículo');
    }
  }

  async updateItem(item: ShoppingItem): Promise<void> {
    try {
      const sheet = await this.getSheet(false);
      const rows = await sheet.getRows();
      const row = rows.find(
        (r) => String(r.get('id') ?? '').trim() === item.id,
      );
      if (!row) {
        const err: any = new Error(`Item with id ${item.id} not found`);
        err.code = 404;
        throw err;
      }
      row.set('name', item.name);
      row.set('quantity', item.quantity);
      row.set('unit', item.unit);
      row.set('group', item.group);
      row.set('category', item.category);
      row.set('notes', toSheetString(item.notes));
      row.set('bought', toSheetBool(item.bought));
      await row.save();
    } catch (error) {
      mapGoogleError(error, 'Error al actualizar el artículo');
    }
  }
}

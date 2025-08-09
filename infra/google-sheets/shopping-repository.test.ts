import { describe, it, expect, vi, beforeEach } from 'vitest';

class FakeRow {
  constructor(private data: Record<string, unknown>) {}
  get(key: string) {
    return this.data[key];
  }
}

const loadInfo = vi.fn();
const getRows = vi.fn();
const addRow = vi.fn();

vi.mock('google-spreadsheet', () => ({
  GoogleSpreadsheet: vi.fn(),
}));
vi.mock('google-auth-library', () => ({
  GoogleAuth: vi.fn(),
}));

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { GoogleSheetsShoppingRepository } from './shopping-repository.js';

const MockedGoogleSpreadsheet = vi.mocked(GoogleSpreadsheet);

describe('GoogleSheetsShoppingRepository', () => {
  beforeEach(() => {
    loadInfo.mockClear();
    getRows.mockReset();
    addRow.mockReset();
    MockedGoogleSpreadsheet.mockReset();
    MockedGoogleSpreadsheet.mockImplementation(() => ({
      loadInfo,
      sheetsByIndex: [{ getRows, addRow }],
    }));
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@example.com';
    process.env.GOOGLE_PRIVATE_KEY = 'key';
  });

  it('loads sheet info and normalizes bought values', async () => {
    getRows.mockResolvedValue([
      new FakeRow({
        id: '1',
        name: ' A ',
        quantity: '1',
        unit: '',
        group: '',
        category: '',
        notes: '',
        bought: ' X ',
      }),
      new FakeRow({
        id: '2',
        name: 'B',
        quantity: '',
        unit: '',
        group: '',
        category: '',
        notes: '',
        bought: '',
      }),
      new FakeRow({
        id: '3',
        name: 'C',
        quantity: '',
        unit: '',
        group: '',
        category: '',
        notes: '',
      }),
    ]);

    const repo = new GoogleSheetsShoppingRepository('sheetId');
    const items = await repo.getItems();

    expect(loadInfo).toHaveBeenCalled();
    expect(items).toStrictEqual([
      {
        id: '1',
        name: 'A',
        quantity: '1',
        unit: '',
        group: '',
        category: '',
        notes: '',
        bought: true,
      },
      {
        id: '2',
        name: 'B',
        quantity: '',
        unit: '',
        group: '',
        category: '',
        notes: '',
        bought: false,
      },
      {
        id: '3',
        name: 'C',
        quantity: '',
        unit: '',
        group: '',
        category: '',
        notes: '',
        bought: false,
      },
    ]);
  });

  it('throws when worksheet index 0 is missing', async () => {
    MockedGoogleSpreadsheet.mockImplementationOnce(() => ({
      loadInfo,
      sheetsByIndex: [],
    }));
    const repo = new GoogleSheetsShoppingRepository('sheetId');
    await expect(repo.getItems()).rejects.toThrow('Hoja no encontrada');
  });

  it('maps auth errors to user friendly messages', async () => {
    loadInfo.mockRejectedValueOnce({ code: 401 });
    const repo = new GoogleSheetsShoppingRepository('sheetId');
    await expect(repo.getItems()).rejects.toThrow(
      'No autorizado: revisa las credenciales',
    );
  });

  it('maps network errors to user friendly messages', async () => {
    loadInfo.mockRejectedValueOnce({ code: 'ENOTFOUND' });
    const repo = new GoogleSheetsShoppingRepository('sheetId');
    await expect(repo.getItems()).rejects.toThrow(
      'Error de red al conectar con Google Sheets',
    );
  });

  it('throws format error when rows are not an array', async () => {
    getRows.mockResolvedValueOnce(null as any);
    const repo = new GoogleSheetsShoppingRepository('sheetId');
    await expect(repo.getItems()).rejects.toThrow(
      'Error en el formato de los datos de la hoja de cálculo',
    );
  });

  it('writes bought as TRUE or FALSE when adding items', async () => {
    const repo = new GoogleSheetsShoppingRepository('sheetId');

    await repo.addItem({
      id: '1',
      name: 'A',
      quantity: '',
      unit: '',
      group: '',
      category: '',
      notes: '',
      bought: true,
    });

    expect(addRow).toHaveBeenCalledWith(
      expect.objectContaining({ bought: 'TRUE' }),
    );

    await repo.addItem({
      id: '2',
      name: 'B',
      quantity: '',
      unit: '',
      group: '',
      category: '',
      notes: '',
      bought: false,
    });

    expect(addRow).toHaveBeenCalledWith(
      expect.objectContaining({ bought: 'FALSE' }),
    );
  });

  it('writes bought as TRUE or FALSE when updating items', async () => {
    const rowSet = vi.fn();
    const rowSave = vi.fn();
    const row = {
      get: (key: string) => (key === 'id' ? '1' : undefined),
      set: rowSet,
      save: rowSave,
    };
    getRows.mockResolvedValue([row]);

    const repo = new GoogleSheetsShoppingRepository('sheetId');

    await repo.updateItem({
      id: '1',
      name: 'A',
      quantity: '',
      unit: '',
      group: '',
      category: '',
      notes: '',
      bought: true,
    });
    expect(rowSet).toHaveBeenCalledWith('bought', 'TRUE');

    rowSet.mockClear();

    await repo.updateItem({
      id: '1',
      name: 'A',
      quantity: '',
      unit: '',
      group: '',
      category: '',
      notes: '',
      bought: undefined,
    });
    expect(rowSet).toHaveBeenCalledWith('bought', 'FALSE');
  });
});

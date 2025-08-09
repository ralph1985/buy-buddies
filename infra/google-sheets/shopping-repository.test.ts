import { describe, it, expect, vi, beforeEach } from 'vitest';

class FakeRow {
  constructor(private data: Record<string, unknown>) {}
  get(key: string) {
    return this.data[key];
  }
}

const loadInfo = vi.fn();
const getRows = vi.fn();

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
    MockedGoogleSpreadsheet.mockReset();
    MockedGoogleSpreadsheet.mockImplementation(() => ({
      loadInfo,
      sheetsByIndex: [{ getRows }],
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
    await expect(repo.getItems()).rejects.toThrow('No worksheet found at index 0');
  });
});

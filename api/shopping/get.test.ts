import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../infra/google-sheets/shopping-repository.js', () => ({
  GoogleSheetsShoppingRepository: vi.fn(),
}));
vi.mock('../../infra/mock/shopping-repository.js', () => ({
  MockShoppingRepository: vi.fn(),
}));

import handler from './get.js';
import { GoogleSheetsShoppingRepository } from '../../infra/google-sheets/shopping-repository.js';
import { MockShoppingRepository } from '../../infra/mock/shopping-repository.js';

const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('api/shopping/get', () => {
  const createRes = () => {
    const json = vi.fn();
    return { status: vi.fn(() => ({ json })) } as any;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleError.mockClear();
  });

  it('returns shopping items on success', async () => {
    vi.mocked(MockShoppingRepository).mockImplementation(() => ({
      getItems: vi.fn().mockResolvedValue(['a']),
    }));
    const res = createRes();
    await handler({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status.mock.results[0].value.json).toHaveBeenCalledWith({
      success: true,
      data: ['a'],
    });
  });

  it('returns an error object on failure', async () => {
    vi.mocked(GoogleSheetsShoppingRepository).mockImplementation(
      () => ({
        getItems: vi.fn().mockRejectedValue({ code: 401 }),
      } as any),
    );
    const res = createRes();
    await handler({ query: { googleSheetId: 'id' } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status.mock.results[0].value.json).toHaveBeenCalledWith({
      success: false,
      error: 'No autorizado: revisa las credenciales',
    });
  });
});

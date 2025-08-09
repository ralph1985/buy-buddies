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
  try {
    const items = await getShoppingList(repo);
    res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    console.error('Error fetching shopping list:', error);
    let message = 'Error al obtener la lista de compras';
    if (error?.code === 401) message = 'No autorizado: revisa las credenciales';
    else if (error?.code === 404) message = 'Hoja no encontrada';
    else if (error?.code === 'NETWORK')
      message = 'Error de red al conectar con Google Sheets';
    else if (error?.code === 'FORMAT')
      message = 'Error en el formato de los datos de la hoja de cálculo';
    res.status(500).json({ success: false, error: message });
  }
}

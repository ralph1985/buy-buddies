export interface Product {
  id: string;
  name: string;
  category: string;
  group: string; // nombre del grupo (anonimizado en mocks)
  bought: boolean;
  quantity?: number;
  unit?: string;
}

export interface RepositoryCapabilities {
  isMockData: boolean;
}

export interface ProductsRepository extends RepositoryCapabilities {
  list(): Promise<Product[]>;
  // otros métodos si existen (add/update/delete) sin cambios de firma
}

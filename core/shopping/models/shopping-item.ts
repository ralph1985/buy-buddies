export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  group: string;
  category: string;
  notes?: string;
  bought: boolean;
}

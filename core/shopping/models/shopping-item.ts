export interface ShoppingItem {
  id: string;
  name: string;
  group: string;
  category: string;
  assignedTo?: string;
  bought: boolean;
}

/**Student Name: Zexu Xin
*Student Number: 24832928
*Programming Mobile Systems A2 Part2
*/
export interface InventoryManagement {
  id: string;
  name: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplier: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  popular: 'Yes' | 'No';
  comment: string;
  selected?: boolean;
}
import { Injectable } from '@angular/core';
import { InventoryManagement } from '../models/Inventory-Management';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private inventoryData: InventoryManagement[] = [
    {
      id: "E001",
      name: "Wireless Headphones",
      category: "Electronics",
      quantity: 50,
      price: 89.99,
      supplier: "TechGear Supplies",
      stockStatus: "In Stock",
      popular: "Yes",
      comment: "Noise-reduction model, with a battery life of 30 hours"
    },
    {
      id: "E002",
      name: "Smart Watch Series 7",
      category: "Electronics",
      quantity: 15,
      price: 299.99,
      supplier: "Digital World Inc.",
      stockStatus: "Low Stock",
      popular: "Yes",
      comment: "Supports heart rate monitoring and is water-resistant up to 50 meters."
    },
    {
      id: "F001",
      name: "Ergonomic Office Chair",
      category: "Furniture",
      quantity: 20,
      price: 189.99,
      supplier: "Home & Office Depot	",
      stockStatus: "In Stock",
      popular: "No",
      comment: "Adjustable height, breathable mesh backrest"
    },
    {
      id: "F002",
      name: "Wooden Coffee Table",
      category: "Furniture",
      quantity: 0,
      price: 129.99,
      supplier: "Nordic Home Goods",
      stockStatus: "Out of Stock",
      popular: "No",
      comment: "Solid wood material, simple design"
    },
    {
      id: "C001",
      name: "Cotton T-Shirt",
      category: "Clothing",
      quantity: 100,
      price: 19.99,
      supplier: "Apparel Wholesale Co.",
      stockStatus: "In Stock",
      popular: "Yes",
      comment: "Multiple sizes available, made of pure cotton fabric"
    },
    {
      id: "C002",
      name: "Waterproof Jacket",
      category: "Clothing",
      quantity: 0,
      price: 89.99,
      supplier: "Outdoor Apparel Ltd",
      stockStatus: "Out of Stock",
      popular: "No",
      comment: "Windproof and waterproof, suitable for outdoor travel"
    },
    {
      id: "T001",
      name: "Cordless Drill Kit",
      category: "Tools",
      quantity: 35,
      price: 129.99,
      supplier: "ToolMaster Hardware",
      stockStatus: "In Stock",
      popular: "Yes",
      comment: "18V lithium battery, including 10 drill bit accessories"
    },
    {
      id: "T002",
      name: "Adjustable Wrench",
      category: "Tools",
      quantity: 75,
      price: 14.99,
      supplier: "Handy Tools Inc.",
      stockStatus: "In Stock",
      popular: "No",
      comment: "Carbon steel material, opening range 8 - 24mm"
    },
    {
      id: "M001",
      name: "Reusable Water Bottle",
      category: "Miscellaneous",
      quantity: 60,
      price: 24.99,
      supplier: "EcoLiving Supplies",
      stockStatus: "In Stock",
      popular: "Yes",
      comment: "Stainless steel material, with 12-hour insulation."
    },
    {
      id: "M002",
      name: "Desk Organizer Set",
      category: "Miscellaneous",
      quantity: 25,
      price: 34.99,
      supplier: "Office Essentials Co.",
      stockStatus: "Low Stock",
      popular: "No",
      comment: "Includes pen holder and file rack, made of plastic and metal materials"
    }
  ];

  getItems(): InventoryManagement[] {
    return [...this.inventoryData];
  }

  addItem(item: InventoryManagement): boolean {
    const nameExists = this.inventoryData.some(i => i.name === item.name);
    const idExists = this.inventoryData.some(i => i.id === item.id);
    
    if (nameExists) return false;
    if (idExists) return false;

    this.inventoryData.push(item);
    return true;
  }

  updateItem(target: { name: string; id: string }, updated: Partial<InventoryManagement>): boolean {
    const index = this.inventoryData.findIndex(i => 
      i.name === target.name && i.id === target.id
    );
    if (index === -1) return false;

    this.inventoryData[index] = { ...this.inventoryData[index], ...updated };
    return true;
  }

  deleteItem(name: string, id: string): boolean {
    const len = this.inventoryData.length;
    this.inventoryData = this.inventoryData.filter(i => 
      !(i.name === name && i.id === id)
    );
    return this.inventoryData.length < len;
  }

  bulkDelete(items: InventoryManagement[]): number {
    const count = items.length;
    this.inventoryData = this.inventoryData.filter(
      i => !items.some(x => x.name === i.name && x.id === i.id)
    );
    return count;
  }

  searchByName(keyword: string): InventoryManagement[] {
    const lower = keyword.toLowerCase();
    return this.inventoryData.filter(i => i.name.toLowerCase().includes(lower));
  }

  getPopularItems(): InventoryManagement[] {
    return this.inventoryData.filter(i => i.popular === 'Yes');
  }

  advancedSearch(filters: any): InventoryManagement[] {
    return this.inventoryData.filter(item => {
      const nameMatch = !filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase());
      const catMatch = !filters.category || item.category === filters.category;
      const stockMatch = !filters.stockStatus || item.stockStatus === filters.stockStatus;
      const popularMatch = !filters.popular || item.popular === filters.popular;
      return nameMatch && catMatch && stockMatch && popularMatch;
    });
  }
}
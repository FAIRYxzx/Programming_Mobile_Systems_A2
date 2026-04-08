import { Injectable } from '@angular/core';
import { InventoryManagement } from '../models/Inventory-Management';

/**
 * Inventory management service
 * Provide core functions such as adding, deleting, modifying and querying of inventory goods, as well as search and filtering.
 */
@Injectable({ providedIn: 'root' })
export class InventoryService {
  /**
   * Private inventory data storage array
   * Store all inventory item information, with the type being "InventoryManagement" array
   */
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

  /**
   * Retrieve all inventory items
   * @returns Returns a shallow-copied array of inventory data, to prevent direct modification of the original data 
   */
  getItems(): InventoryManagement[] {
    return [...this.inventoryData];
  }

  addItem(item: InventoryManagement): boolean {
    //Check if the product name already exists
    const nameExists = this.inventoryData.some(i => i.name === item.name);
    //Check if the product ID already exists
    const idExists = this.inventoryData.some(i => i.id === item.id);
    
    // If the name or ID already exists, the addition fails.
    if (nameExists) return false;
    if (idExists) return false;

    //Verification successful. Add the new product to the inventory array.
    this.inventoryData.push(item);
    return true;
  }

  /**
   * Update the specified inventory item information
   * @param target  Matching conditions for the target item (including name and id)
   * @param updated Partial properties of the items to be updated (of type Partial<InventoryManagement>, supporting partial field updates)
   * @returns Returns true if the update is successful; returns false if the target item is not found
   */
  updateItem(target: { name: string; id: string }, updated: Partial<InventoryManagement>): boolean {
    // Search for the index of the target product based on its name and ID
    const index = this.inventoryData.findIndex(i => 
      i.name === target.name && i.id === target.id
    );
    if (index === -1) return false;

    // Merge the original product information with the updated attributes to create a new object (avoid directly modifying the original object)
    this.inventoryData[index] = { ...this.inventoryData[index], ...updated };
    return true;
  }

  /**
   * Delete inventory items with the specified name and ID
   * @param name The name of the item to be deleted
   * @param id The ID of the item to be deleted
   * @returns Returns true if deletion is successful; returns false if the target item is not found
   */
  deleteItem(name: string, id: string): boolean {
    // Record the original length of the array
    const len = this.inventoryData.length;
    // Filter out the goods that match the name and ID, and update the inventory array
    this.inventoryData = this.inventoryData.filter(i => 
      !(i.name === name && i.id === id)
    );
    // If the array length decreases, it indicates that the deletion was successful
    return this.inventoryData.length < len;
  }

  /**
   * Batch deletion of inventory items
   * @param items Array of items to be deleted in bulk
   * @returns Number of items successfully deleted
   */
  bulkDelete(items: InventoryManagement[]): number {
    const count = items.length;
    this.inventoryData = this.inventoryData.filter(
      i => !items.some(x => x.name === i.name && x.id === i.id)
    );
    return count;
  }

  /**
   * Search inventory items based on the name keyword
   * @param keyword Search keyword (case-insensitive)
   * @returns Returns an array of items matching the keyword
   */
  searchByName(keyword: string): InventoryManagement[] {
    // Convert to lowercase to enable case-insensitive search
    const lower = keyword.toLowerCase();
    return this.inventoryData.filter(i => i.name.toLowerCase().includes(lower));
  }
  
  /**
   * Retrieve all popular products (products with "Yes" in the "popular" field)
   * @returns Returns an array of all popular products 
   */
  getPopularItems(): InventoryManagement[] {
    return this.inventoryData.filter(i => i.popular === 'Yes');
  }

  /**
   * Advanced Search - Combine multiple conditions for filtering inventory items
   * @param filters Object of filtering conditions, supports filtering by name, category, stock status, and popularity
   * @returns Returns an array of items that meet all filtering conditions 
   */
  advancedSearch(filters: any): InventoryManagement[] {
    return this.inventoryData.filter(item => {
      //Name Matching: No name filtering condition or the product name should contain the filtering keyword (case-insensitive)
      const nameMatch = !filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase());
      //Category matching: No category filtering conditions or the product category matches the filtering conditions. 
      const catMatch = !filters.category || item.category === filters.category;
      // Inventory status matching: No inventory status filtering conditions or the product inventory status matches the filtering conditions.
      const stockMatch = !filters.stockStatus || item.stockStatus === filters.stockStatus;
      // Hot status matching: No hot filtering conditions or the product hot status matches the filtering conditions.
      const popularMatch = !filters.popular || item.popular === filters.popular;
      // If all conditions are met, then return this product.
      return nameMatch && catMatch && stockMatch && popularMatch;
    });
  }

  advancedSearchWithPrice(filters: any): InventoryManagement[] {
  return this.inventoryData.filter(item => {
    const nameMatch = !filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase());
    const catMatch = !filters.category || item.category === filters.category;
    const stockMatch = !filters.stockStatus || item.stockStatus === filters.stockStatus;
    const popularMatch = !filters.popular || item.popular === filters.popular;

    const min = filters.minPrice ? parseFloat(filters.minPrice) : null;
    const max = filters.maxPrice ? parseFloat(filters.maxPrice) : null;
    const priceMatch = (!min || item.price >= min) && (!max || item.price <= max);

    return nameMatch && catMatch && stockMatch && popularMatch && priceMatch;
  });
}
}
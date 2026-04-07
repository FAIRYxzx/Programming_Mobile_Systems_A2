/**Student Name: Zexu Xin
*Student Number: 24832928
*Programming Mobile Systems A2 Part1
*/

// Define the interface type for inventory items and impose constraints on the data structure
interface InventoryItem {
  id: string;
  name: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplier: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  popular: 'Yes' | 'No';
  comment: string;
}
// Initialize inventory data (simulate initial data)
let inventoryData: InventoryItem[] = [
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
// Load the web page and execute the initialization operation after completion
document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  bindEvents();
});
/**
 * Render inventory table data
 * Render the data in 'inventoryData' to the 'tableBody' on the page
 */
function renderTable(): void {
  //Obtain the main element of the table
  const tableBody = document.getElementById("tableBody") as HTMLElement;
  tableBody.innerHTML = "";
  //Traverse the inventory data and generate the table content row by row
  for (let i = 0; i < inventoryData.length; i++) {
    const item = inventoryData[i];
    const tr = document.createElement("tr");  //Create row elements
    //Concatenate the cell contents within the row
    tr.innerHTML = `
      <td><input type="checkbox" class="item-checkbox" data-id="${item.id}" /></td>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.supplier}</td>
      <td>${item.stockStatus}</td>
      <td>${item.popular}</td>
      <td title="${item.comment}">${item.comment.substring(0, 10)}${item.comment.length > 10 ? '...' : ''}</td>
      <td>
        <span class="edit-btn" data-id="${item.id}">Edit</span>
        <span class="del-btn" data-id="${item.id}">Delete</span>
      </td>
    `;
    tableBody.appendChild(tr);  //Add rows to the table
  }
}
/**
 * Bind all interaction events of the page
 * This includes pop-ups, form submissions, editing/deletion, batch operations, filtering/searching, etc.
 */
function bindEvents(): void {
  //Bind the event for opening the "Add Product" pop-up window
  const openAddModal = document.getElementById("openAddModal") as HTMLElement;
  openAddModal.addEventListener("click", () => {
    (document.getElementById("modalTitle") as HTMLElement).innerText = "Add Item";
    (document.getElementById("itemForm") as HTMLFormElement).reset();
    (document.getElementById("editId") as HTMLInputElement).value = "";
    (document.getElementById("modal") as HTMLElement).classList.add("show");
  });
  //General function for closing pop-up windows
  const closeModal = () => {
    (document.getElementById("modal") as HTMLElement).classList.remove("show");
  };
  //Bind the event for the close button of the dialog box
  (document.getElementById("closeModal") as HTMLElement).addEventListener("click", closeModal);
  (document.getElementById("cancelBtn") as HTMLElement).addEventListener("click", closeModal);
  //Bind the form submission event for the product 
  const itemForm = document.getElementById("itemForm") as HTMLFormElement;
  itemForm.addEventListener("submit", (e) => {
  e.preventDefault();  //Prevent the default submission behavior of the form
  //Obtain the input values of the form
  const editId = (document.getElementById("editId") as HTMLInputElement).value;
  const idInput = (document.getElementById("itemId") as HTMLInputElement).value.trim();
  const nameInput = (document.getElementById("itemName") as HTMLInputElement).value.trim();
  const categoryInput = (document.getElementById("category") as HTMLSelectElement).value as InventoryItem['category'];
  const quantityInput = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
  const priceInput = parseFloat((document.getElementById("price") as HTMLInputElement).value);
  const supplierInput = (document.getElementById("supplier") as HTMLInputElement).value.trim();
  const stockStatusInput = (document.getElementById("stockStatus") as HTMLSelectElement).value as InventoryItem['stockStatus'];
  const popularInput = (document.getElementById("popularItem") as HTMLSelectElement).value as InventoryItem['popular'];
  const commentInput = (document.getElementById("comment") as HTMLTextAreaElement).value.trim();

  //Data verification: Required fields cannot be left blank, and quantity and price cannot be negative.
  if (!idInput || !nameInput || !supplierInput || isNaN(quantityInput) || isNaN(priceInput)) {
    showMessage("All required fields must be filled correctly!", "error");
    return;
  }
  if (quantityInput < 0) {
    showMessage("Quantity cannot be negative!", "error");
    return;
  }
  if (priceInput < 0) {
    showMessage("Price cannot be negative!", "error");
    return;
  }
  //Assemble the item data object
  const item: InventoryItem = {
    id: idInput,
    name: nameInput,
    category: categoryInput,
    quantity: quantityInput,
    price: priceInput,
    supplier: supplierInput,
    stockStatus: stockStatusInput,
    popular: popularInput,
    comment: commentInput
  };
  //Determine whether it is an editing or adding operation
  if (editId) {
  // Editor: First by name, then by ID if names are the same.
  let index = -1;
  for (let i = 0; i < inventoryData.length; i++) {
    const curr = inventoryData[i];
    if (curr.name === nameInput && curr.id === editId) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    inventoryData[index] = item;
    showMessage("Item updated successfully!", "success");
  }
} else {
  // Add: Allow the same name, but prohibit duplicate IDs
  const idExists = inventoryData.some(curr => curr.id === item.id);
  if (idExists) {
    showMessage("ID already exists!", "error");
    return;
  }
  inventoryData.push(item);
  showMessage("Item added successfully!", "success");
}
  closeModal();
  renderTable();
});
  //Bind the click event of the edit button
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("edit-btn")) {
      const id = target.getAttribute("data-id") || "";  //Obtain the ID of the product to be edited
      const name = target.getAttribute("data-name") || "";
      let foundItem: InventoryItem | undefined;
      //First, search by name. If there is a match, then use the ID.
      for (let i = 0; i < inventoryData.length; i++) {
        const currentItem = inventoryData[i];
        if (currentItem.name === name && currentItem.id === id) {
          foundItem = currentItem;
          break;
        }
      }
      //After finding the product, fill in the form and open the pop-up window.
      if (foundItem) {
        (document.getElementById("modalTitle") as HTMLElement).innerText = "Edit Item";
        (document.getElementById("editId") as HTMLInputElement).value = foundItem.id;
        (document.getElementById("itemId") as HTMLInputElement).value = foundItem.id;
        (document.getElementById("itemName") as HTMLInputElement).value = foundItem.name;
        (document.getElementById("category") as HTMLSelectElement).value = foundItem.category;
        (document.getElementById("quantity") as HTMLInputElement).value = foundItem.quantity.toString();
        (document.getElementById("price") as HTMLInputElement).value = foundItem.price.toString();
        (document.getElementById("supplier") as HTMLInputElement).value = foundItem.supplier;
        (document.getElementById("stockStatus") as HTMLSelectElement).value = foundItem.stockStatus;
        (document.getElementById("popularItem") as HTMLSelectElement).value = foundItem.popular;
        (document.getElementById("comment") as HTMLTextAreaElement).value = foundItem.comment;
        (document.getElementById("modal") as HTMLElement).classList.add("show");
      }
    }
  });
  //Bind the click event of the delete button
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("del-btn")) {
      const id = target.getAttribute("data-id") || "";  //Obtain the ID of the item to be deleted
      const name = target.getAttribute("data-name") || "";
      let itemName = "";
      //Search for the item name (for confirming the prompt)
      for (let i = 0; i < inventoryData.length; i++) {
        const currentItem = inventoryData[i];
        if (currentItem.name === name && currentItem.id === id) {
          itemName = currentItem.name;
          break;
        }
      }
      //Open the confirmation pop-up window for deletion. After confirmation, the deletion will be executed.
      openConfirmModal(`Are you sure you want to delete: ${itemName}?`, () => {
        let newData: InventoryItem[] = [];
        //Filter out the goods to be deleted
        for (let i = 0; i < inventoryData.length; i++) {
          const currentItem = inventoryData[i];
          if (!(currentItem.name === name && currentItem.id === id)) {
            newData.push(currentItem);
          }
        }
        inventoryData = newData;
        renderTable();
        showMessage("Item deleted successfully!", "success");
      });
    }
  });
  //Bind the event for the batch deletion button
  (document.getElementById("batchDeleteBtn") as HTMLElement).addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".item-checkbox:checked"); //Get the selected checkboxes
    if (checkboxes.length === 0) {
      showMessage("Please select at least one item!", "error");
      return;
    }
    //Collect the selected item IDs
    const selectedItems: { name: string; id: string }[] = [];
    for (let i = 0; i < checkboxes.length; i++) {
      const cb = checkboxes[i] as HTMLElement;
      const id = cb.getAttribute("data-id") || "";
      const name = cb.getAttribute("data-name") || "";
      selectedItems.push({ name, id });
    }
    //Confirm batch deletion
    openConfirmModal(`Are you sure you want to delete ${checkboxes.length} items?`, () => {
      let newData: InventoryItem[] = [];
      //Filter out the selected items
      for (let i = 0; i < inventoryData.length; i++) {
        const currentItem = inventoryData[i];
        let isSelected = false;
        for (let j = 0; j < selectedItems.length; j++) {
          const selItem = selectedItems[j];
          if (currentItem.name === selItem.name && currentItem.id === selItem.id) {
            isSelected = true;
            break;
          }
        }
        if (!isSelected) {
          newData.push(currentItem);
        }
      }
      inventoryData = newData;
      renderTable();
      showMessage("Selected items deleted successfully!", "success");
    });
  });
  // Bind the event of the search button
  (document.getElementById("searchBtn") as HTMLElement).addEventListener("click", () => {
    const keyword = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase().trim();
    if (!keyword) {
      renderTable();
      return;
    }
    //Filter out the products that contain the specified keywords (case-insensitive for product names)
    const filtered: InventoryItem[] = [];
    for (let i = 0; i < inventoryData.length; i++) {
      if (inventoryData[i].name.toLowerCase().indexOf(keyword) !== -1) {
        filtered.push(inventoryData[i]);
      }
    }
    renderFiltered(filtered);
  });
  // Bind the classification/hot search event
  const filterItems = document.querySelectorAll(".sub-item");
  for (let i = 0; i < filterItems.length; i++) {
    const el = filterItems[i] as HTMLElement;
    el.addEventListener("click", () => {
      //Switch the selected state style
      for (let j = 0; j < filterItems.length; j++) {
        filterItems[j].classList.remove("active");
      }
      el.classList.add("active");
      const filter = el.getAttribute("data-filter") || "all";  // Obtain the filtering type
      //Filter the data based on the selection criteria
      const filtered: InventoryItem[] = [];
      for (let k = 0; k < inventoryData.length; k++) {
        if (filter === "all") {  //All Items
          filtered.push(inventoryData[k]);
        } else if (filter === "popular") {  //Popular Items
          if (inventoryData[k].popular === "Yes") {
            filtered.push(inventoryData[k]);
          }
        } else {
          if (inventoryData[k].category === filter) {
            filtered.push(inventoryData[k]); //Filter by category
          }
        }
      }
      renderFiltered(filtered);
    });
  }
  //Bind the event for expanding/collapsing the sidebar menu
  (document.getElementById("menuToggle") as HTMLElement).addEventListener("click", () => {
    const subMenu = document.getElementById("subMenu") as HTMLElement;
    const icon = document.querySelector(".sub-icon") as HTMLElement;
    subMenu.classList.toggle("hide");  //Switch between menu display and hiding
    icon.classList.toggle("up");  //Change the direction of the arrow
  });
}
/**
 * Render the filtered table data
 * @param data The filtered array of inventory data
 */
function renderFiltered(data: InventoryItem[]): void {
  const tableBody = document.getElementById("tableBody") as HTMLElement;
  tableBody.innerHTML = "";  //Clear existing content
  //Traverse the filtered data and generate table rows
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="checkbox" class="item-checkbox" data-id="${item.id}" /></td>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.supplier}</td>
      <td>${item.stockStatus}</td>
      <td>${item.popular}</td>
      <td title="${item.comment}">${item.comment.substring(0, 10)}${item.comment.length > 10 ? '...' : ''}</td>
      <td>
        <span class="edit-btn" data-id="${item.id}">Edit</span>
        <span class="del-btn" data-id="${item.id}">Delete</span>
      </td>
    `;
    tableBody.appendChild(tr);
  }
}
/**
 * Open the confirmation pop-up window (used for deletion / batch deletion confirmation)
 * @param text The confirmation text displayed in the pop-up window
 * @param onConfirm The callback function after confirmation is made
 */
function openConfirmModal(text: string, onConfirm: () => void): void {
  const modal = document.getElementById("modalConfirm") as HTMLElement;
  const confirmText = document.getElementById("confirmText") as HTMLElement;
  confirmText.innerText = text;
  modal.classList.add("show");
  //Bind the event of the confirmation button
  (document.getElementById("confirmOk") as HTMLElement).onclick = () => {
    onConfirm();
    modal.classList.remove("show");
  };
  //Bind the event of the cancel button
  (document.getElementById("confirmCancel") as HTMLElement).onclick = () => {
    modal.classList.remove("show");
  };
}
/**
 * Display page prompt message (success/error)
 * @param text Prompt text content
 * @param type Prompt type: success (success) / error (error)
 */
function showMessage(text: string, type: 'success' | 'error'): void {
  const box = document.getElementById("messageBox") as HTMLElement;
  box.className = "msg-box " + type;
  box.innerText = text;
  //Clear the prompt after 3 seconds
  setTimeout(() => {
    box.className = "msg-box";
  }, 3000);
}
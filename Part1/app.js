/**Student Name: Zexu Xin
*Student Number: 24832928
*Programming Mobile Systems A2 Part1
*/
// Initialize inventory data (simulate initial data)
var inventoryData = [
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
document.addEventListener("DOMContentLoaded", function () {
    renderTable();
    bindEvents();
});
/**
 * Render inventory table data
 * Render the data in 'inventoryData' to the 'tableBody' on the page
 */
function renderTable() {
    //Obtain the main element of the table
    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    //Traverse the inventory data and generate the table content row by row
    for (var i = 0; i < inventoryData.length; i++) {
        var item = inventoryData[i];
        var tr = document.createElement("tr"); //Create row elements
        //Concatenate the cell contents within the row
        tr.innerHTML = "\n      <td><input type=\"checkbox\" class=\"item-checkbox\" data-id=\"".concat(item.id, "\" /></td>\n      <td>").concat(item.id, "</td>\n      <td>").concat(item.name, "</td>\n      <td>").concat(item.category, "</td>\n      <td>").concat(item.quantity, "</td>\n      <td>$").concat(item.price.toFixed(2), "</td>\n      <td>").concat(item.supplier, "</td>\n      <td>").concat(item.stockStatus, "</td>\n      <td>").concat(item.popular, "</td>\n      <td title=\"").concat(item.comment, "\">").concat(item.comment.substring(0, 10)).concat(item.comment.length > 10 ? '...' : '', "</td>\n      <td>\n        <span class=\"edit-btn\" data-id=\"").concat(item.id, "\">Edit</span>\n        <span class=\"del-btn\" data-id=\"").concat(item.id, "\">Delete</span>\n      </td>\n    ");
        tableBody.appendChild(tr); //Add rows to the table
    }
}
/**
 * Bind all interaction events of the page
 * This includes pop-ups, form submissions, editing/deletion, batch operations, filtering/searching, etc.
 */
function bindEvents() {
    //Bind the event for opening the "Add Product" pop-up window
    var openAddModal = document.getElementById("openAddModal");
    openAddModal.addEventListener("click", function () {
        document.getElementById("modalTitle").innerText = "Add Item";
        document.getElementById("itemForm").reset();
        document.getElementById("editId").value = "";
        document.getElementById("modal").classList.add("show");
    });
    //General function for closing pop-up windows
    var closeModal = function () {
        document.getElementById("modal").classList.remove("show");
    };
    //Bind the event for the close button of the dialog box
    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("cancelBtn").addEventListener("click", closeModal);
    //Bind the form submission event for the product 
    var itemForm = document.getElementById("itemForm");
    itemForm.addEventListener("submit", function (e) {
        e.preventDefault(); //Prevent the default submission behavior of the form
        //Obtain the input values of the form
        var editId = document.getElementById("editId").value;
        var idInput = document.getElementById("itemId").value.trim();
        var nameInput = document.getElementById("itemName").value.trim();
        var categoryInput = document.getElementById("category").value;
        var quantityInput = parseInt(document.getElementById("quantity").value);
        var priceInput = parseFloat(document.getElementById("price").value);
        var supplierInput = document.getElementById("supplier").value.trim();
        var stockStatusInput = document.getElementById("stockStatus").value;
        var popularInput = document.getElementById("popularItem").value;
        var commentInput = document.getElementById("comment").value.trim();
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
        var item = {
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
            //Editing operation: Locate the corresponding product with the specified ID and update it.
            var index = -1;
            for (var i = 0; i < inventoryData.length; i++) {
                if (inventoryData[i].id === editId) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                inventoryData[index] = item;
                showMessage("Item updated successfully!", "success");
            }
        }
        else {
            //Add operation: Check if the ID already exists
            var exists = false;
            for (var i = 0; i < inventoryData.length; i++) {
                if (inventoryData[i].id === item.id) {
                    exists = true;
                    break;
                }
            }
            if (exists) {
                showMessage("Item ID already exists!", "error");
                return;
            }
            //Add new item to the array
            inventoryData.push(item);
            showMessage("Item added successfully!", "success");
        }
        closeModal();
        renderTable();
    });
    //Bind the click event of the edit button
    document.addEventListener("click", function (e) {
        var target = e.target;
        if (target.classList.contains("edit-btn")) {
            var id = target.getAttribute("data-id") || ""; //Obtain the ID of the product to be edited
            var foundItem = void 0;
            //Search for the corresponding product by its ID
            for (var i = 0; i < inventoryData.length; i++) {
                if (inventoryData[i].id === id) {
                    foundItem = inventoryData[i];
                    break;
                }
            }
            //After finding the product, fill in the form and open the pop-up window.
            if (foundItem) {
                document.getElementById("modalTitle").innerText = "Edit Item";
                document.getElementById("editId").value = foundItem.id;
                document.getElementById("itemId").value = foundItem.id;
                document.getElementById("itemName").value = foundItem.name;
                document.getElementById("category").value = foundItem.category;
                document.getElementById("quantity").value = foundItem.quantity.toString();
                document.getElementById("price").value = foundItem.price.toString();
                document.getElementById("supplier").value = foundItem.supplier;
                document.getElementById("stockStatus").value = foundItem.stockStatus;
                document.getElementById("popularItem").value = foundItem.popular;
                document.getElementById("comment").value = foundItem.comment;
                document.getElementById("modal").classList.add("show");
            }
        }
    });
    //Bind the click event of the delete button
    document.addEventListener("click", function (e) {
        var target = e.target;
        if (target.classList.contains("del-btn")) {
            var id_1 = target.getAttribute("data-id") || ""; //Obtain the ID of the item to be deleted
            var itemName = "";
            //Search for the item name (for confirming the prompt)
            for (var i = 0; i < inventoryData.length; i++) {
                if (inventoryData[i].id === id_1) {
                    itemName = inventoryData[i].name;
                    break;
                }
            }
            //Open the confirmation pop-up window for deletion. After confirmation, the deletion will be executed.
            openConfirmModal("Are you sure you want to delete: ".concat(itemName, "?"), function () {
                var newData = [];
                //Filter out the goods to be deleted
                for (var i = 0; i < inventoryData.length; i++) {
                    if (inventoryData[i].id !== id_1) {
                        newData.push(inventoryData[i]);
                    }
                }
                inventoryData = newData;
                renderTable();
                showMessage("Item deleted successfully!", "success");
            });
        }
    });
    //Bind the event for the batch deletion button
    document.getElementById("batchDeleteBtn").addEventListener("click", function () {
        var checkboxes = document.querySelectorAll(".item-checkbox:checked"); //Get the selected checkboxes
        if (checkboxes.length === 0) {
            showMessage("Please select at least one item!", "error");
            return;
        }
        //Collect the selected item IDs
        var ids = [];
        for (var i = 0; i < checkboxes.length; i++) {
            var cb = checkboxes[i];
            var id = cb.getAttribute("data-id") || "";
            ids.push(id);
        }
        //Confirm batch deletion
        openConfirmModal("Are you sure you want to delete ".concat(checkboxes.length, " items?"), function () {
            var newData = [];
            //Filter out the selected items
            for (var i = 0; i < inventoryData.length; i++) {
                var itemId = inventoryData[i].id;
                var isInIds = false;
                for (var j = 0; j < ids.length; j++) {
                    if (ids[j] === itemId) {
                        isInIds = true;
                        break;
                    }
                }
                if (!isInIds) {
                    newData.push(inventoryData[i]);
                }
            }
            inventoryData = newData;
            renderTable();
            showMessage("Selected items deleted successfully!", "success");
        });
    });
    // Bind the event of the search button
    document.getElementById("searchBtn").addEventListener("click", function () {
        var keyword = document.getElementById("searchInput").value.toLowerCase().trim();
        if (!keyword) {
            renderTable();
            return;
        }
        //Filter out the products that contain the specified keywords (case-insensitive for product names)
        var filtered = [];
        for (var i = 0; i < inventoryData.length; i++) {
            if (inventoryData[i].name.toLowerCase().indexOf(keyword) !== -1) {
                filtered.push(inventoryData[i]);
            }
        }
        renderFiltered(filtered);
    });
    // Bind the classification/hot search event
    var filterItems = document.querySelectorAll(".sub-item");
    var _loop_1 = function (i) {
        var el = filterItems[i];
        el.addEventListener("click", function () {
            //Switch the selected state style
            for (var j = 0; j < filterItems.length; j++) {
                filterItems[j].classList.remove("active");
            }
            el.classList.add("active");
            var filter = el.getAttribute("data-filter") || "all"; // Obtain the filtering type
            //Filter the data based on the selection criteria
            var filtered = [];
            for (var k = 0; k < inventoryData.length; k++) {
                if (filter === "all") { //All Items
                    filtered.push(inventoryData[k]);
                }
                else if (filter === "popular") { //Popular Items
                    if (inventoryData[k].popular === "Yes") {
                        filtered.push(inventoryData[k]);
                    }
                }
                else {
                    if (inventoryData[k].category === filter) {
                        filtered.push(inventoryData[k]); //Filter by category
                    }
                }
            }
            renderFiltered(filtered);
        });
    };
    for (var i = 0; i < filterItems.length; i++) {
        _loop_1(i);
    }
    //Bind the event for expanding/collapsing the sidebar menu
    document.getElementById("menuToggle").addEventListener("click", function () {
        var subMenu = document.getElementById("subMenu");
        var icon = document.querySelector(".sub-icon");
        subMenu.classList.toggle("hide"); //Switch between menu display and hiding
        icon.classList.toggle("up"); //Change the direction of the arrow
    });
}
/**
 * Render the filtered table data
 * @param data The filtered array of inventory data
 */
function renderFiltered(data) {
    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; //Clear existing content
    //Traverse the filtered data and generate table rows
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var tr = document.createElement("tr");
        tr.innerHTML = "\n      <td><input type=\"checkbox\" class=\"item-checkbox\" data-id=\"".concat(item.id, "\" /></td>\n      <td>").concat(item.id, "</td>\n      <td>").concat(item.name, "</td>\n      <td>").concat(item.category, "</td>\n      <td>").concat(item.quantity, "</td>\n      <td>$").concat(item.price.toFixed(2), "</td>\n      <td>").concat(item.supplier, "</td>\n      <td>").concat(item.stockStatus, "</td>\n      <td>").concat(item.popular, "</td>\n      <td title=\"").concat(item.comment, "\">").concat(item.comment.substring(0, 10)).concat(item.comment.length > 10 ? '...' : '', "</td>\n      <td>\n        <span class=\"edit-btn\" data-id=\"").concat(item.id, "\">Edit</span>\n        <span class=\"del-btn\" data-id=\"").concat(item.id, "\">Delete</span>\n      </td>\n    ");
        tableBody.appendChild(tr);
    }
}
/**
 * Open the confirmation pop-up window (used for deletion / batch deletion confirmation)
 * @param text The confirmation text displayed in the pop-up window
 * @param onConfirm The callback function after confirmation is made
 */
function openConfirmModal(text, onConfirm) {
    var modal = document.getElementById("modalConfirm");
    var confirmText = document.getElementById("confirmText");
    confirmText.innerText = text;
    modal.classList.add("show");
    //Bind the event of the confirmation button
    document.getElementById("confirmOk").onclick = function () {
        onConfirm();
        modal.classList.remove("show");
    };
    //Bind the event of the cancel button
    document.getElementById("confirmCancel").onclick = function () {
        modal.classList.remove("show");
    };
}
/**
 * Display page prompt message (success/error)
 * @param text Prompt text content
 * @param type Prompt type: success (success) / error (error)
 */
function showMessage(text, type) {
    var box = document.getElementById("messageBox");
    box.className = "msg-box " + type;
    box.innerText = text;
    //Clear the prompt after 3 seconds
    setTimeout(function () {
        box.className = "msg-box";
    }, 3000);
}

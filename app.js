// select items
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit options
let editElement;
let editFlag = false;
let editID = "";
// event listeners
// submit form
form.addEventListener("submit", addItem);

// functions
function addItem(e) {
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        // create element
        const element = document.createElement("article");
        // add class
        element.classList.add("grocery-item");

        // add attribute
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
		<p class="title">${value}</p>
		<div class="button-container">
		<button type="button" class="edit-btn">
		<i class="bx bxs-message-square-edit"></i>
		</button>
		<button type="button" class="delete-btn">
		<i class="bx bxs-trash-alt"></i>
		</button>
			</div>`;
        const deleteBtn = element.querySelector(".delete-btn");

        const editBtn = element.querySelector(".edit-btn");

        deleteBtn.addEventListener("click", deleteItem);
        // editBtn.addEventListener("click", editItem);

        // append child
        list.appendChild(element);
        // display alert
        displayAlert("added successfully", "success");
        // show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();

        // clear items
        clearBtn.addEventListener("click", clearItems);
    } else if (value && editFlag) {
        console.log("editing");
    } else {
        displayAlert("please enter value", "danger");
    }
}
// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}
// clear items
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    // localStorage
}

// delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;

    list.removeChild(element);
    if (!list.children.length) {
        container.classList.remove("show-container");
    }
    displayAlert("remove item", "danger");
    setBackToDefault();
    // clear locak storage
}
// edit function
// set back to default
function setBackToDefault() {
    grocery.value = "";
    console.log("set back to default");
}
// local storage
function addToLocalStorage(id, value) {
    console.log("added to local storage");
}
// setup items

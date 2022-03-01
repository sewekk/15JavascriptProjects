// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
//load items
window.addEventListener('DOMContentLoaded', setupItems);
// ****** FUNCTIONS **********
function addItem(event) {
	event.preventDefault();

	const value = grocery.value;
	const id = new Date().getTime().toString();

	if (value && !editFlag) {
		createListItem(id, value);
		container.classList.add("show-container");
		displayAlert("item added to the list", "success");
		addToLocalStorage(id, value);
		setBackToDefault();
	} else if (value && editFlag) {
		editElement.innerHTML = value;
		displayAlert("value changed", "success");
		editLocalStorage(editID, value);
		setBackToDefault();
	} else {
		displayAlert("please enter value", "danger");
	}
}

const displayAlert = (text, action) => {
	alert.textContent = `${text}`;
	alert.classList.add(`alert-${action}`);

	setTimeout(() => {
		alert.textContent = ``;
		alert.classList.remove(`alert-${action}`);
	}, 1000);
};

//clear Items
function clearItems() {
	const items = document.querySelectorAll(".grocery-item");

	if (items.length < 0) return;
	else {
		items.forEach((item) => {
			list.removeChild(item);
		});

		container.classList.remove("show-container");

		displayAlert("empty list", "success");
		setBackToDefault();
		localStorage.removeItem("list");
	}
}

//delete item function
function deleteItem(event) {
	const element = event.currentTarget.parentElement.parentElement;
	const id = element.dataset.id;
	list.removeChild(element);

	if (list.children.length === 0) {
		container.classList.remove("show-container");
	}

	displayAlert("Item removed", "success");
	setBackToDefault();

	removeFromLocalStorage(id);
}

//edit item function
function editItem(event) {
	const element = event.currentTarget.parentElement.parentElement;
	editElement = event.currentTarget.parentElement.previousElementSibling;
	grocery.value = editElement.innerHTML;
	editFlag = true;
	editID = element.dataset.id;
	submitBtn.textContent = "edit";
	console.log(editID);
}

// set back to default
const setBackToDefault = () => {
	grocery.value = "";
	editFlag = false;
	editID = "";
	submitBtn.textContent = "submit";
};

// ****** LOCAL STORAGE **********
const addToLocalStorage = (id, value) => {
	const grocery = {
		id,
		value
	};
	let items = getLocalStorage();
	items.push(grocery);
	localStorage.setItem("list", JSON.stringify(items));
};

const removeFromLocalStorage = (id) => {
	let items = getLocalStorage();

	items = items.filter((item) => {
		if (item.id !== id) return item;
	});

	localStorage.setItem("list", JSON.stringify(items));
};

const editLocalStorage = (id, value) => {
	let items = getLocalStorage();
	console.log(id, value);
	items = items.map(item => {
		if (item.id === id) {
			item.value = value;
		}
		return item;
	});

	localStorage.setItem("list", JSON.stringify(items));
};

const getLocalStorage = () => {
	return localStorage.getItem("list") ?
		JSON.parse(localStorage.getItem("list")) :
		[];
};
// ****** SETUP ITEMS **********
function setupItems() {
	let items = getLocalStorage();
	if (items.length > 0) {
		items.forEach(item => {
			createListItem(item.id, item.value)
		});
		container.classList.add("show-container");
	}
}

function createListItem(id, value) {
	const article = document.createElement("article");
	article.classList.add("grocery-item");

	const attr = document.createAttribute("data-id");
	attr.value = id;
	article.setAttributeNode(attr);

	article.innerHTML = `
            <p class='title'>${value}</p>
            <div class='btn-container'>
                <button type='button' class='edit-btn'>
                    <i class='fas fa-edit'></i>
                </button>
                <button type='button' class='delete-btn'>
                    <i class='fas fa-trash'></i>
                </button>
            </div>
        `;

	const deleteBtn = article.querySelector(".delete-btn");
	deleteBtn.addEventListener("click", deleteItem);
	deleteBtn.addEventListener("click", deleteItem);
	const editBtn = article.querySelector(".edit-btn");
	editBtn.addEventListener("click", editItem);

	list.appendChild(article);
}
// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';
// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
// ****** FUNCTIONS **********
function addItem(event) {
	event.preventDefault();

	const value = grocery.value;
	const id = new Date().getTime().toString();

	if (value && !editFlag) {
		const article = document.createElement('article');
		article.classList.add('grocery-item');

		const attr = document.createAttribute('data-id');
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

		const deleteBtn = article.querySelector('.delete-btn');
		deleteBtn.addEventListener('click', deleteItem);
		deleteBtn.addEventListener('click', deleteItem);
		const editBtn = article.querySelector('.edit-btn');
		editBtn.addEventListener('click', editItem);


		list.appendChild(article);
		container.classList.add('show-container');

		displayAlert('item added to the list', 'success');

		addToLocalStorage(id, value);
		setBackToDefault();
	} else if (value && editFlag) {
		console.log('editing');
	} else {
		displayAlert('please enter value', 'danger');
	}
}

const displayAlert = (text, action) => {
	alert.textContent = `${text}`;
	alert.classList.add(`alert-${action}`);

	setTimeout(() => {
		alert.textContent = ``;
		alert.classList.remove(`alert-${action}`);
	}, 1000);
}

//clear Items
function clearItems() {
	const items = document.querySelectorAll('.grocery-item');

	if (items.length < 0) return;
	else {
		items.forEach(item => {
			list.removeChild(item);
		});

		container.classList.remove('show-container');

		displayAlert('empty list', 'success');
		setBackToDefault();
		// localStorage.removeItem('list');
	}
}

//delete item function
function deleteItem(event) {
	const element = event.currentTarget.parentElement.parentElement;
	list.removeChild(element);

	if (list.children.length === 0) {
		container.classList.remove('show-container');
	}

	displayAlert('Item removed', 'success');
	setBackToDefault();

	removeFromLocalStorage(id);

}

//edit item function
function editItem() {
	console.log('eddit item');
}

// set back to default 
const setBackToDefault = () => {
	grocery.value = '';
	editFlag = false;
	editID = '';
	submitBtn.textContent = 'submit';

}

// ****** LOCAL STORAGE **********
const addToLocalStorage = (id, value) => {

}
const removeFromLocalStorage = (id) => {

}
// ****** SETUP ITEMS **********
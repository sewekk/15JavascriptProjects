const openModalBtn = document.querySelector('.modal-btn');
const modalOvelary = document.querySelector('.modal-overlay');
const closeModalBtn = document.querySelector('.close-btn');


openModalBtn.addEventListener('click', () => {
    modalOvelary.classList.add('open-modal');
})

closeModalBtn.addEventListener('click', () => {
    modalOvelary.classList.remove('open-modal');
})

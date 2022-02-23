const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    if(id){
        
        btns.forEach(item => {
            item.classList.remove('active');
            event.target.classList.add('active');
        });
        
        articles.forEach(article =>{
            article.classList.remove('active');
        });
        
        const element = document.getElementById(id);
        element.classList.add('active');
    }
})
// set inital count 
let count = 0;

const value = document.querySelector('#value');
const btns = [...document.querySelectorAll('.btn')];

btns.forEach(btn =>{
    btn.addEventListener('click', (e)=>{
        const styles = e.currentTarget.classList;

        if(styles.contains('decrease')) count--;
        else if(styles.contains('reset')) count=0;
        else if(styles.contains('increse')) count++;

        if(count > 0){
            value.style.color = 'green';
        }
        if(count < 0) {
            value.style.color = 'red';
        }
        if(count === 0){
            value.style.color = '#222';
        }
        value.textContent = count;
    })
})

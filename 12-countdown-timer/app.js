const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let futureDate = new Date(2022,4,24,11,30,0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
const month = months[futureDate.getMonth()];

giveaway.textContent = `Giveaway end on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}`;

const futureTime = futureDate.getTime(); 

const getRemaingTime = () => {
  const today = new Date().getTime();
  const t = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  const days = Math.floor(t/oneDay);
  const hours = Math.floor((t % oneDay) / oneHour);
  const minutes = Math.floor((t % oneHour) / oneMinute);
  const seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days,hours,minutes, seconds];

  const format = (item) => {
    
    if(item < 10){
      return item = `0${item}`;
    }

    return item;
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if(t < 0){
    clearInterval(countDown);
    deadline.innerHTML = `<h4 class='expired'>sorry this giveaway has expired</h4>`
  }

}

let countDown = setInterval(getRemaingTime, 1000);
getRemaingTime();
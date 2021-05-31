console.log('Client Side JS file loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const text1 = document.querySelector('#messsage-1');
const text2 = document.querySelector('#messsage-2');

weatherForm.addEventListener('submit',(e) => {

    e.preventDefault();
    text1.textContent = 'Loading...';    
    text2.textContent = '';  
    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            text1.textContent = data.error;
        }else{
            console.log(data)
            text1.textContent = data.address+', '+data.country;
            text2.textContent = data.weatherReport;
        }
     });
});

  
});
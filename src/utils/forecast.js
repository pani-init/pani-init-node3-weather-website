const request = require('request');

const forecast = (latitude, longitude, forecastCallback) =>{
const reqUrl = 'http://api.weatherstack.com/current?access_key=afa8b222ecfd2be43f95b03a3190ebbd&query='+latitude+','+longitude;
 
    request({url: reqUrl, json: true}, (error, response) => {
       if(error){
            forecastCallback('Weather forecast service is unavailable !!',undefined);
        }else if(response.body.error){
            forecastCallback('Unable to find location !!',undefined);
        }else{
            const data = response.body;
            forecastCallback(undefined, data);
        }
       
    });

}

module.exports = forecast;
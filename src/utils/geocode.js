const request = require('request');

const geoReport = (city, geoCodeCallBack) => {
    const reqUrl = 'http://api.weatherstack.com/current?access_key=afa8b222ecfd2be43f95b03a3190ebbd&query='+city;
    
    request({url: reqUrl, json: true}, (error, response) => {
        if(error){
            geoCodeCallBack('Service is unavailable !!', undefined);
        }else if(response.body.error){
            geoCodeCallBack('Location not found !!', undefined);
        }else{
            geoCodeCallBack(undefined, response.body);
        }
    });
}

module.exports = geoReport;
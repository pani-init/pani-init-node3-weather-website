const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const port = process.env.PORT || 3000;

const pathDirectory = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(pathDirectory));

app.set('view engine','hbs');
app.set('views',viewPath );
hbs.registerPartials(partialsPath);

app.get('',(req, res) => {
    res.render('index',{
        city: 'Bangalore',
        country: 'India',
        title: 'Weather',
        name:'Panindra'
    });
});

app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About',
        name: 'Panindra'
    });
});

app.get('/help',(req, res) => {
    res.render('help',{
        helpText: 'Hello There !! I am here to help you.',
        title: 'Help',
        name: 'Panindra'
    })
});

app.get('/weather',(req,res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'Please Provide Location to Search'
        });
    }
    
    geoCode(address, (error, data) =>{
   
        if(error){
            return res.send({
                error: error
            });
        }
        forecast(data.location.lat, data.location.lon, (forecastError, forecastData) => {
            if(forecastError){
                return res.send({
                    error: forecastError
                });
            }
        });
        res.send({
            address: data.location.name,
            country: data.location.country,
            weatherReport: 'It is currently '+data.current.temperature+' degrees. It feels like '+data.current.feelslike+' degrees out. And Humidity is '+data.current.humidity
        })
    }); 
});

app.get('/help/*', (req, res) =>{
    res.render('pageNotFound',{
        title: '404',
        errorText:'Help article not found',
        name: 'Panindra'
    });
});
app.get('*',(req, res) =>{
    res.render('pageNotFound',{
        title: '404',
        errorText:'Page Not Found',
        name: 'Panindra'
    });
});

app.listen(port, () =>{
    console.log('Server is up on port '+port);
});


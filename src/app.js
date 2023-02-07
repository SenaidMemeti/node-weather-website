const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

/*app.get('/help', (req, res) =>{
    res.send([{
    name: 'Senaid',
    age:27
},{
    name: 'Sarah'
}])
})

app.get('/about', (req, res) =>{
    res.send('<h1>About</h1>')
})*/
app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name:'Senaid Memeti'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About me',
        name:'Senaid Memeti'
    })
})

app.get('src/templates/views/help', (req, res) =>{
    res.render('src/templates/views/help',{
        title: 'Help',
        helpText:'Senaid Memeti aide est là',
        name: 'Senaid Memeti'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an adress'
        })
    }
  geocode(req.query.address, (error, { latitude, longtitude, location } = {}) =>{
    if(error) {
        return res.send({ error })
    }
    forecast(latitude, longtitude, (error, forecastData)=> {
        if(error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address

    })
  })
})
})
app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            errot: 'You must provide e search term'
        })
    }
    console.log(req.query)
    res.send({
        products: [] 
    })
})

app.get('/help/*', (req, res)=>{
    res.render(
        '404',{
            title: '404',
            name: 'Senaid Memeti',
            errorMessage: 'Help article not found'
        })
})

app.get('*', (req, res)=>{
    res.render(
        '404',{
            title: '404',
            name: 'Senaid Memeti',
            errorMessage: 'Page not found'
        })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
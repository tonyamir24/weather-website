const path=require('path')
const express = require('express')
const hbs =require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const { error } = require('console')
const app=express()

//define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//Stetup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Tony'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About my Duck',
        name:'Tony'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Helpppppp',
        title:'Help',
        name:'Tony'
    })
})
app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({ error })
            }
             res.send({
                 forecast:forecastdata,
               location,
               address:req.query.address
               
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }


    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
    title:'404',
    name:'Tony',
    errorMessage:'Help article not found'
})
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Tony',
        errorMessage:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('Server s up on port 3000.')
})
var express= require('express');                                                                                                                                                 
var url = require('url');                                                                                                                                               
var app = express();                                                                                                                                                    
app.listen(8000);                                                                                                                                                       
app.get('/lab1', function (req, res)                                                                                                                                    
{                                                                                                                                                                       
app.set('json spaces', 4);                                                                                                                                              
res.send({Day:"Monday", subject:'FST', status:'FREE'})                                                                                                                  
})                                                                                                                                                                      
app.get('/lab2', function (req, res)                                                                                                                                    
{                                                                                                                                                                       
    app.set('json spaces', 4);                                                                                                                                          
    res.send({Day:"TUESDAY", subject:'CA', status:'BUSY'})                                                                                                              
})                                                                                                                                                                      
app.get('/lab3', function (req, res){                                                                                                                                                                       
    app.set('json spaces', 4);                                                                                                                                          
    res.send({Day:"WEDNESDAY", subject:'DBMS', status:'FREE'})  
})                                                                                                        
app.get('/lab4', function (req, res)                                                                                                                                    
{                                                                                                                                                                       
    app.set('json spaces', 4);                                                                                                                                          
    res.send({Day:"WEDNESDAY", subject:'DBMS', status:'FREE'})                                                                                                          
})                                                                                                                                                                      
app.get('/lab5', function (req, res)                                                                                                                                    
{                                                                                                                                                                       
    app.set('json spaces', 4);                                                                                                                                          
    res.send({Day:"WEDNESDAY", subject:'DBMS', status:'FREE'})                                                                                                          
})                                                                                                                                                                      
app.get('/lab6', function (req, res)                                                                                                                                    
{                                                                                                                                                                       
    app.set('json spaces', 4);                                                                                                                                          
    res.send({Day:"SATURDAY", subject:'NULL', status:'NULL'})                                                                                                           
})                                                         
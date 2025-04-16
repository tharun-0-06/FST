var http = require('http');                                                                                                                                             
var url=require('url');                                                                                                                                                 
                                                                                                                                                                        
var messages = [                                                                                                                                                        
'Monday : <br>   Class1 : DBMS<br>   Class2: FST<br>   Class3: FREE HOUR',                                                                                                                  
'Tuesday : <br>   Class1 : FREE HOUR<br>   Class2: CA<br>   Class3: FREE HOUR',                                                                                                                                             
'Wednesday : <br>   Class1 : Maths<br>   Class2: FST<br>   Class3: DBMS',                                                                                                                                           
'Want to know about your Time Table ?<br>Type lab & its number without space'];                                                                                                                                  
http.createServer(function (req, res) {                                                                                                                                 
                                                                                                                                                                        
    res.setHeader("Content-Type", "text/html");                                                                                                                         
    res.writeHead(200);                                                                                                                                                     
                                                                                                                                                                        
    var parsedurl=url.parse(req.url)                                                                                                                                    
    var path=parsedurl.pathname;                                                                                                                                        
    if(path=='/')                                                                                                                                                       
    {                                                                                                                                                                   
        res.write('<html><head><title>Simple HTTP Server</title></head>');                                                                                              
        res.write('<body>');                                                                                                                                            
        res.write('<h1 style="text-align: center;"'+messages[3]+'</h1>');                                                                                                                          
        res.write('\n</body></html>');                                                                                                                                  
    }                                                                                                                                                                   
    if(path=='/lab1')                                                                                                                                                   
        {                                                                                                                                                               
        res.write('<html><head><title>Simple HTTP Server</title></head>');                                                                                              
        res.write('<body>');                                                                                                                                            
        res.write('<h1 style="text-align: center;"'+messages[0]+'</h1>');                                                                                                                          
        res.write('\n</body></html>');                                                                                                                                  
        }                                                                                                                                                               
    if(path=='/lab2')                                                                                                                                               
        {                                                                                                                                                           
            res.write('<html><head><title>Simple HTTP Server</title></head>');                                                                                      
            res.write('<body>');                                                                                                                                            
            res.write('<h1 style="text-align: center;"'+messages[1]+'</h1>');                                                                                                                          
            res.write('\n</body></html>');                                                                                                                                  
        }                                                                                                                                                           
    if(path=='/lab3')                                                                                                                                           
    {                                                                                                                                                       
        res.write('<html><head><title>Simple HTTP Server</title></head>');                                                                                  
        res.write('<body>');                                                                                                                                    
        res.write('<h1 style="text-align: center;"'+messages[2]+'</h1>');                                                                                                                  
        res.write('\n</body></html>');                                                                                                                          
    }
}).listen(8080);             
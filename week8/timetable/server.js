const express = require('express');                                                                                                                                     
const app = express();                                                                                                                                                  
const port = 8086;                                                                                                                                                      
const lab1Timetable = {                                                                                                                                                 
    "Monday": {                                                                                                                                                         
        "FN": "FST",                                                                                                                                                    
        "AN": "FREE"                                                                                                                                                    
    },                                                                                                                                                                  
    "Tuesday": {                                                                                                                                                        
        "FN": "DSA",                                                                                                                                                    
        "AN": "FREE"                                                                                                                                                    
    },                                                                                                                                                                  
    "Wednesday": {                                                                                                                                                      
        "FN": "DBMS",                                                                                                                                                   
        "AN": "FREE"                                                                                                                                                    
    },                                                                                                                                                                  
    "Thursday": {                                                                                                                                                       
        "FN": "CN",                                                                                                                                                     
        "AN": "FREE"                                                                                                                                                    
    },                                                                                                                                                                  
    "Friday": {                                                                                                                                                         
        "FN": "AI",                                                                                                                                                     
        "AN": "FREE"                                                                                                                                                    
    }                                                                                                                                                                   
};                                                                                                                                                                      

const lab2Timetable = {                                                                                                                                                 
    "Monday": {                                                                                                                                                         
        "FN": "ESP",                                                                                                                                                    
        "AN": "FREE"                                                                                                                                                    
    },                                                                                                                                                                  
    "Tuesday": {                                                                                                                                                        
        "FN": "DSA",                                                                                                                                                    
        "AN": "FREE"                                                                                                                                                    
    },                                                                                                                                                                  
    "Wednesday": {                                                                                                                                                      
        "FN": "DBMS",                                                                                                                                                   
        "AN": "FREE"                                                                                                                                                    
    },                                                                                                                                                                  
    "Thursday": {                                                                                                                                                       
        "FN": "CN",                                                                                                                                                     
        "AN": "FREE"                                                                                                                                                    
    },                                                                                                                                                                  
    "Friday": {                                                                                                                                                         
        "FN": "AI",                                                                                                                                                     
        "AN": "FREE"                                                                                                                                                    
    }                                                                                                                                                                   
};                                                                                                                                                                      
app.get('/lab1', (req, res) => {                                                                                                                                        
    let labAvailability = [];                                                                                                                                           

    for (let day in lab1Timetable) {                                                                                                                                    
        let dayDetails = lab1Timetable[day];                                                                                                                            
        labAvailability.push(`${day}, FN, ${dayDetails.FN}`);                                                                                           
        labAvailability.push(`${day}, AN, ${dayDetails.AN}`);                                                                                                           
    }                                                                                                                                                                   


    res.send(`Lab1 Timetable: ${labAvailability.join(' , ')}`);                                                                                                         
});                                                                                                                                                                     

app.get('/lab2', (req, res) => {                                                                                                                                        
    let labAvailability = [];                                                                                                                                           

    for (let day in lab2Timetable) {                                                                                                                                    
        let dayDetails = lab2Timetable[day];                                                                                                                            
        labAvailability.push(`${day}, FN, ${dayDetails.FN}`);                                                                                                           
        labAvailability.push(`${day}, AN, ${dayDetails.AN}`);                                                                                                           
    }                                                                                                                                                   


    res.send(`Lab2 Timetable: ${labAvailability.join(' , ')}`);                                                                                                         
});                                                                                                                                                                     

app.listen(port, () => {                                                                                                                                                
    console.log(`Server is running on http://localhost:${port}`);                                                                                                       
});       
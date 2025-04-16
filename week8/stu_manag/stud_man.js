                                                                                                                                                                  
const express = require('express');                                                                                                                                     
const fs = require('fs');                                                                                                                                               
const path = require('path');                                                                                                                                           

const app = express();                                                                                                                                                  
const PORT = 3000;                                                                                                                                                      
// Use static folder for serving CSS files                                                                                                                              
app.use(express.static(path.join(__dirname, 'public')));                                                                                                                

// Parse incoming request bodies as JSON                                                                                                                                
app.use(express.json());                                                                                                                                                
app.use(express.urlencoded({ extended: true }));                                                                                                                        

// Load students data from JSON file                                                                                                                                    
const loadStudents = () => {                                                                                                                                            
  const data = fs.readFileSync(path.join(__dirname, 'students.json'), 'utf8');                                                                                          
  return JSON.parse(data);                                                                                                                                              
};                                                                                                                                                                      
// Save students data to JSON file                                                                                                                                      
const saveStudents = (students) => {                                                                                                                                    
  fs.writeFileSync(path.join(__dirname, 'students.json'), JSON.stringify(students, null, 2)); 
}                                                                          

// Home route to display all students                                                                                                                                   
app.get('/', (req, res) => {                                                                                                                                            
  const students = loadStudents();                                                                                                                                      
  res.sendFile(path.join(__dirname, 'views', 'index.html'));                                                                                                            
});                                                                                                                                                                     

// Add a new student                                                                                                                                                    
app.post('/add-student', (req, res) => {                                                                                                                                
  const { registerNo, name, age, course } = req.body;                                                                                                                   
  const students = loadStudents();                                                                                                                                      
  students.push({ registerNo, name, age, course });                                                                                                                     
  saveStudents(students);                                                                                                                                               
  res.redirect('/');                                                                                                                                                    
});                                                                                                                                                                     

// Edit student details                                                                                                                                                 
app.post('/edit-student', (req, res) => {                                                                                                                               
  const { registerNo, name, age, course } = req.body;                                                                                                                   
  let students = loadStudents();                                                                                                                                        
  const studentIndex = students.findIndex(student => student.registerNo === registerNo);                                                                                
  if (studentIndex !== -1) {                                                                                                                                            
    students[studentIndex] = { registerNo, name, age, course };                                                                                                         
    saveStudents(students);                                                                                                                                             
  }                                                                                                                                                                     
  res.redirect('/');                                                                                                                                                    
});                                                                                                                                                                     

// Delete student by register number                                                                                                                                    
app.post('/delete-student', (req, res) => {                                                                                                                             
  const { registerNo } = req.body;                                                                                                                                      
  let students = loadStudents();                                                                                                                                        
  students = students.filter(student => student.registerNo !== registerNo);                                                                                             
  saveStudents(students);                                                                                                                                               
  res.redirect('/');                                                                                                                                                    
});                                                                                                                                                                     

// Start the server                                                                                                                                                     
app.listen(PORT, () => {                                                                                                                                                
  console.log(`Server is running on http://localhost:${PORT}`);                                                                                                         
});               
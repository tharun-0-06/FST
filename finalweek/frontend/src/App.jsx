import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');

  // Load tasks on start
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/tasks').then(res => setTasks(res.data));
  };

  const addTask = () => {
    if (!name.trim()) return;
    axios.post('http://localhost:5000/tasks', { name }).then(res => {
      setTasks([...tasks, res.data]);
      setName('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>📝 Task List</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask} style={{ marginLeft: '10px' }}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.name}
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '10px', color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
  backgroundColor: 'black',
  color: 'pink'
  }
  };
  export default function TodoList() {
  return (
  <div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
  <img
  className="avatar"
  src="bed.jpeg"
  alt="Gregorio Y. Zara"
  />
  <ul>
  <li>Improve the videophone</li>
  <li>Prepare aeronautics lectures</li>
  </ul>
  </div>
  );
  }
import React, { useState , useEffect} from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
 const [item, setItem] = useState([]);
 const[newtask,setNewtask] = useState('');
 useEffect(() => {
      axios.get('http://localhost:5000/gettask').then(
      arr => setItem(arr.data)
     )},[])

  
  const handleinputsubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/addtask',{todo:newtask}).then(
    arr => setItem(arr.data)
    )
    setNewtask(' ')
}

const handledeletebutton = id => {
  axios.delete(`http://localhost:5000/deletetask/${id}`).then(
    arr => setItem(arr.data)
  )
}
  return (
    <div className="container">
      <div className="box">
        <h1 className="heading">MERN APP</h1>
        <div className="input-container">
          <input
            type="text"
            className="text-input"
            placeholder='Enter the task'
            value={newtask}
            onChange={(e) => setNewtask(e.target.value)} 
          />
          <button className="submit-button" onClick={handleinputsubmit}>
            Submit
          </button>
        </div>
        {/* className="submitted-value" */}
        <div className="submitted-values">
            {item.map(task => <div key={task._id}>
              <p className="submitted-value">{task.todo} <button className="delete-button" onClick={() => handledeletebutton(task._id)}>
                Delete
              </button></p>
              
            </div>
              )}
              
            </div>
  

        
      </div>
    </div>
  );
};

export default App;

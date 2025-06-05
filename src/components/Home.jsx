import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import '../css/form-style.css';

const backend = import.meta.env.VITE_backend;
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0MDVkOTAzOGEwMzVjYmRhODk0NjYzIn0sImlhdCI6MTc0OTEyMzg4N30._Z5fqxZLmKqRdr3GrVF5VlYqwwbnQfg2X46KxrQ0www';

export default function Home() {
  const [available, setAvailable] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(`${backend}/api/taskmaster/getunasignrequest`, {
      method: 'GET',
      headers: {
        'auth-token': authToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.requests) {
          setSuggestions(data.requests);
        }
      })
      .catch(err => console.error('Failed to fetch suggestions:', err));
  }, []);

  const toggleAvailability = () => {
    const newAvailability = !available;
    fetch(`${backend}/api/taskmaster/toggleAvablity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify({ available: newAvailability })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAvailable(newAvailability);
        }
      })
      .catch(err => console.error('Availability toggle failed:', err));
  };

  const acceptTask = (taskId) => {
    fetch(`${backend}/api/taskmaster/acceptrequest/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify({ taskId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Task accepted!');
          setSuggestions(prev => prev.filter(task => task._id !== taskId));
        }
      })
      .catch(err => console.error('Accept task failed:', err));
  };

  return (
    <>
      <div className="set-availability flex-col">
        <span>Availability</span>
        <label className="switch">
          <input type="checkbox" checked={available} onChange={toggleAvailability} />
          <span className="slider round"></span>
        </label>
      </div>

      <h2>Suggestions</h2>
      <div className="work-request flex-col">
        {suggestions.length === 0 ? (
          <div className="no-task">There is no suggestion to show</div>
        ) : (
          suggestions.map((req) => (
            <div key={req._id} className="task-suggestion flex-col">
              <div id="owner-info" className="flex-row">
                <div>
                  <p className="owner"><strong>Owner:</strong> {req.user.fname} {req.user.lname}</p>
                  <p className="owner"><strong>Location:</strong> {req.area.name}</p>
                  <p className="owner"><strong>Email:</strong> {req.user.email}</p>
                </div>
                <div className="task-image">
                  <img src="/man-icon-illustration-vector.jpg" alt="User" />
                </div>
              </div>
              <div className="task-details flex-row">
                <div className="task-info flex-col">
                  <output>Tag: {req.tag.name}</output>
                  <output>Status: {req.status.name}</output>
                </div>
              </div>
              <output>
                Problem: {req.description}
              </output>
              <div className="task-actions">
                <button className="accept-btn" onClick={() => acceptTask(req._id)}>Accept</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

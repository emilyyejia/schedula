import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as sessionsService from '../../services/sessionService';

export default function MySessionsPage() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchSessions() {
      const sessions = await sessionsService.index();
      
      setSessions(sessions);
    }
    fetchSessions();
  }, []);


  return (
    <>
      <h1 className="text-center m-3"> Sessions</h1>
      <div className="container mt-4">
        {sessions.length ?
          <ul className="list-group">
            {sessions.map((session) => <li key={session._id} className="list-group-item d-flex justify-content-between align-items-center">
              {session.date.slice(0, 10) + ' '}{session.startTime}
              <span>
              {session.student.name}
              </span>
            </li>)}

          </ul>
          :
          <p>No Sessions Yet!</p>
        }

      </div>
    </>

  );
}
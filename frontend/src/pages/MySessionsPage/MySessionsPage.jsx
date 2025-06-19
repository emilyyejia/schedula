import { useState, useEffect } from "react";
import * as sessionsService from '../../services/sessionService';

const BASE_URL = "https://ui-avatars.com/api/?";
export default function MySessionsPage() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      const res = await sessionsService.index();
      setSessions(res.appointments);
    }
    fetchSessions();
  }, []);


  return (
    <div>
      <h1 className="text-center fw-semibold py-3">Sessions</h1>
      <div className="container mt-4">
        {sessions.length ? (
          <div className="row row-cols-1 row-cols-md-2 gy-3 justify-content-start"style={{ maxWidth: '960px', margin: '0 auto' }}>
            {sessions.map((session) => (
              <div key={session._id} className="col d-flex justify-content-center">
                <div
                  className="card h-100 d-flex flex-row p-2 align-items-center"
                  style={{ maxWidth: '350px', width: '100%' }}
                >
                  <img
                    src={`${BASE_URL}name=${encodeURIComponent(session.student.name)}&background=e3098f&color=fff`}
                    alt="Student"
                    className="rounded-circle"
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      marginRight: '1rem'
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="card-title mb-1">{session.student.name}</h6>
                    <p className="mb-1" style={{ fontSize: '0.85rem', color: '#555' }}>
                      {session.student.email}
                    </p>
                    <p className="card-text mb-1" style={{ fontSize: '0.9rem' }}>
                      {session.date.slice(0, 10)} at {session.startTime}
                    </p>
                    {session.subjects && session.subjects.length > 0 && (
                      <div className="d-flex flex-wrap gap-1">
                        {session.subjects.map((subject, idx) => (
                          <span
                            key={idx}
                            className="badge"
                            style={{ backgroundColor: '#e3098f', color: 'white' }}
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No Sessions Yet!</p>
        )}
      </div>
    </div>

  );
}
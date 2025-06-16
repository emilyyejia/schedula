import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as appointmentService from '../../services/appointmentsService';
import './MyAppointmentPage.css';


export default function MyAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const today= new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchAppointments() {
      const appointments = await appointmentService.allAppointments(today);
      console.log(appointments);
      setAppointments(appointments);
    }
    fetchAppointments();
  }, []);

  async function handleDelete(appointmentId) {
    await appointmentService.remove(appointmentId);
    setAppointments(appointments =>
      appointments.filter(appointment => appointment._id !== appointmentId));
  }

  async function handleReschedule(appointmentId, teacherId) {
    navigate(`/appointments/reschedule/${appointmentId}/${teacherId}`);
  }

  return (
    <div className="main-page">
      <h1 className="text-center py-3"> Upcoming Appointments</h1>
      <div className="container mt-4">
        {appointments.length ?
          <ul className="list-group">
            {appointments.map((appointment) => <li key={appointment._id} className="list-group-item d-flex justify-content-between align-items-center">
              {appointment.date.slice(0, 10) + ' '}{appointment.startTime + ' '}{appointment.teacher.name}
              <span>
                <button
                  onClick={() => handleReschedule(appointment._id, appointment.teacher._id)}
                  className="btn border m-2" > Reschedule</button>
                <button
                  onClick={() => handleDelete(appointment._id)}
                  className="btn border"
                > Cancel</button>
              </span>
            </li>)}

          </ul>
          :
          <p>No Appointments Yet!</p>
        }

      </div>
    </div>

  );
}
import { useState, useEffect } from "react";
import * as appointmentService from '../../services/appointmentService';


export default function MyAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const startDate =new Date();
  const teacherId = '684aee87bdcb887e179a98d5';
  useEffect(() => {
    async function fetchAppointments() {
      const appointments = await appointmentService.index(startDate, teacherId);
      console.log(appointments);
      setAppointments(appointments);
    }
    fetchAppointments();
  }, []);
  
  async function handleDelete(appointmentId) {
    await appointmentService.remove(appointmentId);
    setAppointments( appointments => 
      appointments.filter(appointment => appointment._id !== appointmentId));
  }

  return (
    <>
      <h1 className="text-center m-3"> Appointments</h1>
      <div className="container mt-4">
        {appointments.length ?
          <ul className="list-group">
            {appointments.map((appointment) => <li key={appointment._id} className="list-group-item d-flex justify-content-between align-items-center">
              {appointment.date.slice(0, 10) + ' '}{appointment.startTime}
              <button 
              onClick={() => handleDelete(appointment._id)}
              className="btn border" 
              > Cancel</button>
            </li>)}

          </ul>
          :
          <p>No Appointments Yet!</p>
        }

      </div>
    </>

  );
}
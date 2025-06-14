import { useState, useEffect } from "react"
import * as appointmentService from '../../services/appointmentService'
export default function MyAppointmentPage () {
    const[appointments, setAppointments] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const teacherId = '684aee87bdcb887e179a98d5';
    useEffect(() => {
        async function fetchAppointments() {
            const appointments = await appointmentService.index(startDate, teacherId);
            console.log(appointments);
            setAppointments(appointments);
        }
        fetchAppointments();
    }, [startDate]);

    function formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }
    return (
    <>
      <h1>Upcoming Appointments</h1>
      <div className="container mt-4">
        {appointments.length ? 
        <ul className="list-group">
            {appointments.map((appointment) => <li key={appointment._id} className="list-group-item">
              {formatDate(appointment.date)}{appointment.startTime}</li>)}

        </ul>
        :
        <p>No Appointments Yet!</p>
      }
      </div>
    </>

    );
}
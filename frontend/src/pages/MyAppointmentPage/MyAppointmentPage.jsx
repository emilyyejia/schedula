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
    return (
    <>
      <h1>Upcoming Appointments</h1>
      {appointments.length ? 
        <ul>
            {appointments.map((appointment) => <li key={appointment._id}>{appointment.date}</li>)}

        </ul>
        :
        <p>No Appointments Yet!</p>
      
      }

    </>

    );
}
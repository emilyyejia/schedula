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
      const res = await appointmentService.allAppointments(today);
      const appointments = res.appointments;
      const teacherProfiles = res.teacherProfiles;
      const detailedAppointments = appointments.map( appt => {
        const profile = teacherProfiles.find(
          profile => profile.teacher === appt.teacher._id);
        return {
          ...appt,
          teacher: {
            ...appt.teacher,
            photo: profile?.photo || '',
            subjects: Array.isArray(profile?.subjects) ? profile.subjects : []
          }
        }
      });
      console.log(appointments);
      setAppointments(detailedAppointments);
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
    <div>
  <h1 className="text-center fw-semibold py-3">Upcoming Booking</h1>
  <div className="container mt-4">
    {appointments.length ? (
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="col">
            <div className="card h-100 d-flex flex-row p-3 align-items-start">
            
              <img
                src={appointment.teacher.photo}
                alt="Teacher"
                className="rounded-circle"
                style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '1rem' }}
              />


              <div className="flex-grow-1">
                <h5 className="card-title mb-1">{appointment.teacher.name}</h5>

          
                {appointment.teacher.subjects?.length > 0 && (
                  <div className="mb-1">
                    {appointment.teacher.subjects.map((subject, idx) => (
                      <span key={idx} className="badge bg-pink text-white me-1">
                        {subject}
                      </span>
                    ))}
                  </div>
                )}

                <p className="card-text mb-2">
                  {appointment.date.slice(0, 10)} at {appointment.startTime}
                </p>

                <div className="d-flex gap-2">
                  <button
                    onClick={() => handleReschedule(appointment._id, appointment.teacher._id)}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleDelete(appointment._id)}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center">No Appointments Yet!</p>
    )}
  </div>
</div>


  );
}
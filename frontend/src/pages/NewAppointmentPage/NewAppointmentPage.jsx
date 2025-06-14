import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import * as appointmentService from '../../services/appointmentService';


export default function NewAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const teacherId = '684aee87bdcb887e179a98d5';
  const [timeSlots, setTimeSlots] = useState([]);
  const getTenDays = () => {
    const dates = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      dates.push({
        dayNum: date.getDate(),
        weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
        value: date.toISOString().split('T')[0]
      });
    }
    return dates;
  };
  const tenDays = getTenDays();
  useEffect(() => {
    async function fetchAppointments() {
      const appointments = await appointmentService.index(selectedDate, teacherId);
      console.log(appointments);
      setAppointments(appointments);
    }
    fetchAppointments();
    setTimeSlots(renderTimeSlots());
  }, [selectedDate]);

  const handleDateClick = (date) => {
    console.log(date);
    setSelectedDate(date);
  }

  const renderTimeSlots = () => {
    console.log("appointments: "+appointments.lent)
    const slots = [];
    const filtered = appointments.filter(appt => appt.date.startsWith(selectedDate));
    console.log(filtered);
    for (let i = 0; i < 8; i++) {
      let hour = 10+i;
      let time = `${hour}:00:00`;
      if (filtered.some(appt => appt.startTime === time)) {
          slots.push({
        time: time,
        isBooked: true
      });
      }
      else slots.push({
        time: time,
        isBooked: false
      });
    }
    console.log(slots);
    return slots;
  }


  const monthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <>
      <div className="calendar container mt-4">
        <h2 className="mb-3">Schedula for clients</h2>
        <div className='mb-4 d-flex justify-content-between gap-2'>
        </div>
        <h4 className="mb-3">Select Time</h4>
        <h5 className="mb-3">{monthYear}</h5>
        <div className="container mt-4">
          <div className="d-flex overflow-auto mb-3">
            {tenDays.map(({ dayNum, weekday, value }) => (
              <button
                key={value}
                className="btn btn-outline-secondary rounded-circle me-2 d-flex justify-content-center align-items-center custom-btn"
                style={{ width: '60px', height: '60px', flexShrink: 0 }}

                onClick={() => handleDateClick(value)}
              >
                <div>{dayNum}</div>
                <div style={{ fontSize: '12px' }}>{weekday}</div>
              </button>
            ))}

    
          </div>
               <div className="d-flex flex-wrap gap-2 mt-2">
              {timeSlots.map((slot, i) => (
                <div key={slot.time} className="btn btn-light border"> 
                  {slot.time}
                </div>
              ))}
            </div>
        </div>
      </div>

    </>
  );
}
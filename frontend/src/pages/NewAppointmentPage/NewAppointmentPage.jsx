import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router";
import * as appointmentService from '../../services/appointmentsService';

export default function NewAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const monthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const { teacherId, appointmentId } = useParams();
  console.log('appId', appointmentId);
 
  const navigate = useNavigate();
  const getOneWeek = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        dayNum: date.getDate(),
        weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
        
      });
    }
    return dates;
  };
  const sevenDays = getOneWeek();

  useEffect(() => {
    async function fetchAppointments() {
      const res = await appointmentService.index(selectedDate, teacherId);
      setAppointments(res.appointments);
      const allBlockedTimeSlots = res.sessions.flatMap(session => session.blockedTimeSlots || []);
      setSessions(allBlockedTimeSlots);
      console.log(res);
      console.log(allBlockedTimeSlots);
      setTimeSlots(renderTimeSlots(appointments, allBlockedTimeSlots, selectedDate));
     
    }
    fetchAppointments();
  
  }, [selectedDate]);

   useEffect(() => {
    setTimeSlots(renderTimeSlots(appointments, sessions, selectedDate));
  }, [appointments, sessions, selectedDate]);

  const handleDateClick = (date) => {
    console.log('date', date);
    setSelectedDate(date);
  }
  const handleSlotClick = (time) => {
    console.log('time', time);
    setSelectedSlot(time);
  }
  const renderTimeSlots = (appts = [], blockedTimeSlots = [], selectedDate) => {
    const slots = [];
    const filteredApp = appts.filter((appt) => {
      const apptDt = new Date(appt.date).toISOString().split('T')[0];
      return apptDt === selectedDate

    });
    const filteredBlock = blockedTimeSlots.filter((slot) => {
      const blockDate = new Date(slot.date).toISOString().split('T')[0];
      return blockDate === selectedDate;
    });

    for (let i = 0; i < 8; i++) {
      let hour = 10 + i;
      let time = `${hour}:00:00`;
      const isBooked = filteredApp.some(appt => appt.startTime === time);
      const isBlocked = filteredBlock.some(slot => slot.startTime === time);
      slots.push({
        time,
        isBooked,
        isBlocked,
      });
    }
    return slots;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (appointmentId) {
      const appointmentData = {
        date: new Date(selectedDate),
        appointmentId,
        startTime: selectedSlot,
      }
      await appointmentService.update(appointmentData);
      navigate('/appointments/all');

    } else {
      const appointmentData = {
        date: new Date(selectedDate),
        startTime: selectedSlot,
        teacher: teacherId
      }
      const newAppointment = await appointmentService.create(appointmentData);
      setAppointments( appointments => [...appointments, newAppointment]);
      navigate('/appointments/all');
    }
    
  }
  return (
    <>
      <div className="calendar container mt-4 text-center bg-white">
        <h2 className="mb-3">Schedula for clients</h2>
        <h4 className="mb-3">Select Time</h4>
        <div className="container mt-4">
          <h5 className="mb-3">{monthYear}</h5>
          <div className="d-flex overflow-auto mb-3 justify-content-center">
            {sevenDays.map(({ dayNum, weekday, value }) => (
              <button
                key={value}
                className={`btn border rounded-circle me-2 d-flex align-items-center custom-btn
                  ${selectedDate === value ? 'btn-secondary' : 'btn-light'}`}
                style={{ width: '60px', height: '60px', flexShrink: 0 }}

                onClick={() => handleDateClick(value)}
              >
                <div>{dayNum}</div>
                <div style={{ fontSize: '12px' }}>{weekday}</div>
              </button>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <form onSubmit={handleSubmit} className="text-center">
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {timeSlots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`btn border 
                   ${slot.isBooked ? 'btn-dark'
                        : slot.isBlocked ? 'btn-primary'
                          : selectedSlot === slot.time ? 'btn-primary'
                            : 'btn-light'}`}

                    disabled={slot.isBooked || slot.isBlocked}
                    onClick={() => handleSlotClick(slot.time)}
                  >
                    {slot.time}
                  </button>
                ))}

              </div>
              <button type="submit" className="btn btn-light border mt-3"> Book </button>
            </form>

          </div>
        </div>
      </div>

    </>
  );
}
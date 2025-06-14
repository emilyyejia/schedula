import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router";
import * as appointmentService from '../../services/appointmentService';


export default function NewAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const teacherId = '684aee87bdcb887e179a98d5';
  const monthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const {appointmentId } = useParams();
  console.log('appointmentID', appointmentId);
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
      const appointments = await appointmentService.index(selectedDate, teacherId);
      setAppointments(appointments);
      setTimeSlots(renderTimeSlots(appointments));
     
    }
    fetchAppointments();
  
  }, [selectedDate]);

  const handleDateClick = (date) => {
    console.log('date', date);
    setSelectedDate(date);
  }
  const handleSlotClick = (time) => {
    console.log('time', time);
    setSelectedSlot(time);
  }
  const renderTimeSlots = (appts) => {
    const slots = [];
    console.log('appointments');
    console.log(appts);
    const filtered = appts.filter((appt) => {
      const apptDt = new Date(appt.date).toISOString().split('T')[0];
      console.log('debug june-16');
      console.log(apptDt);
      return apptDt === selectedDate

    });
    console.log('filtered', filtered);
    for (let i = 0; i < 8; i++) {
      let hour = 10 + i;
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
    return slots;
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("Sending update:", {
        date: new Date(selectedDate),
        appointmentId,

        startTime: selectedSlot,
      });
    if (appointmentId) {
      const appointmentData = {
        date: new Date(selectedDate),
        appointmentId,
        startTime: selectedSlot,
      }
      await appointmentService.update(appointmentData);

    } else {
      console.log('slot', selectedSlot);
      const appointmentData = {
        date: new Date(selectedDate),
        startTime: selectedSlot,
        teacher: '684aee87bdcb887e179a98d5'
      }
      console.log(appointmentData);
      await appointmentService.create(appointmentData);
    }
    navigate('/appointments');


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
                    key={slot.time}
                    type="button"
                    className={`btn border ${slot.isBooked
                      ? 'btn-secondary'
                      : selectedSlot === slot.time
                        ? 'btn-secondary'
                        : 'btn-light'
                      }`}
                    disabled={slot.isBooked}
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
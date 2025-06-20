import { useState, useEffect } from "react"
// import './ManageSessionsPage.css';
import * as sessionService from '../../services/sessionService';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function ManageSessionsPage() {
  const [appointments, setAppointments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  function parseLocalDate(input) {
    if (typeof input === 'string') {
      const [year, month, day] = input.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    const d = new Date(input);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  const getOneWeek = () => {
    const dates = [];
    const today = parseLocalDate(tomorrow);
    for (let i = 0; i < 8; i++) {
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
      const res = await sessionService.index();
      setAppointments(res.appointments);
      const allBlockedTimeSlots = res.sessions.flatMap(session => session.blockedTimeSlots || []);
      setSessions(allBlockedTimeSlots);
      setTimeSlots(renderTimeSlots(res.appointments, allBlockedTimeSlots, selectedDate));
    }

    fetchAppointments();
  }, [selectedDate]);

  useEffect(() => {
    setTimeSlots(renderTimeSlots(appointments, sessions, selectedDate));
  }, [appointments, sessions, selectedDate]);
  const handleDateClick = (date) => {
    setSelectedDate(date);
  }
  const handleSlotClick = (time) => {
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
    const blockedTimeData = {
      date: new Date(selectedDate),
      startTime: selectedSlot,
    }
    const updatedSession = await sessionService.create(blockedTimeData);
    const updatedBlockedTimeSlots = updatedSession.blockedTimeSlots || [];
    setSessions(updatedBlockedTimeSlots);

  }


  return (
    <>
      <div className="calendar container mt-4 text-center">
        <h2 className="mb-3">Schedula for clients</h2>
        <h4 className="mb-3">Set Your Time</h4>
        <h5>{selectedDate}</h5>
        <div className="container mt-4">
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
              <div className="d-flex justify-content-center mt-3">
                <button
                  type="submit"
                  className="btn light border"
                  style={{ width: '4rem', padding: '0.25rem 0.5rem' }}
                >
                  Block
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>

    </>
  );
}
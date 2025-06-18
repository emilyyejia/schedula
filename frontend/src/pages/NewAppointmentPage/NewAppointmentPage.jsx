import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router";
import * as appointmentService from '../../services/appointmentsService';
import './NewAppointmentPage.css';
import calendarSvg from '../../assets/calendar.svg';
import DatePicker from 'react-datepicker';

export default function NewAppointmentPage({user}) {
  const [appointments, setAppointments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const { teacherId, appointmentId } = useParams();
  const [holidays, setHolidays] = useState([]);
  useEffect(() => {
    async function loadDefaultData() {
      const res = await fetch("https://canada-holidays.ca//api/v1/provinces/ON");
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setHolidays(data.province.holidays);
      }

    }
    loadDefaultData();
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const isDateHoliday = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    if (weekday === 'Sat' || weekday === 'Sun') {
      return true;
    } else if (holidays.some(holiday => holiday.date === dateStr)) {
      return true;
    } else return false;
  }


  const getOneWeek = () => {
    const dates = [];
    const today = new Date(selectedDate);
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        dayNum: date.getDate(),
        weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isHoliday: isDateHoliday(date)
      });
    }
    return dates;
  };

  const sevenDays = getOneWeek();
  console.table(getOneWeek());

  useEffect(() => {
    async function fetchAppointments() {
      const res = await appointmentService.index(selectedDate, teacherId);
      setAppointments(res.appointments);
      const teacherProfiles = await appointmentService.getTeachers();
      console.log(teacherProfiles);
      const teacherProfile = teacherProfiles.find(profile => String(profile.teacher._id) === teacherId);
      console.log(teacherProfile);
      setTeacherProfile(teacherProfile);
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
      console.log(user);
      if(user) {
        const appointmentData = {
        date: new Date(selectedDate),
        startTime: selectedSlot,
        teacher: teacherId
      }
      const newAppointment = await appointmentService.create(appointmentData);
      setAppointments(appointments => [...appointments, newAppointment]);
      navigate('/appointments/all');

      } else {
        navigate('/signin', {state: {from: location.pathname}});
      }
      
    }

  }
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  }
  return (
    < div className="container py-5 mt-5" style={{ maxWidth: '1000px' }} >
      <div className="d-flex gap-4 flex-row justify-content-center">
        {teacherProfile ? (
          <div style={{ width: '22rem' }}>
            <div className="card m-3 ml-4" >
              <img
                src={teacherProfile.photo}
                alt="Teacher"
                className="card-img-top"
                style={{ weight: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="card-body">
                <div className="card-title">
                  <h5>{teacherProfile.teacher.name}</h5>
                </div>
                {teacherProfile.subjects && teacherProfile.subjects.length > 0 ? (
                  teacherProfile.subjects.map((subject, index) => (
                    <span key={index} className="badge text-bg-secondary me-1">
                      {subject}
                    </span>
                  ))
                ) : (
                  <span className="badge text-bg-secondary">N/A</span>
                )}
                <p className="card-text">{teacherProfile.bio || 'No bio available.'}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="d-flex align-items-center mt-4">
            <div >
              <h3 className="mb-3">Select Time</h3>
            </div>

            <div className="position-relative ms-auto me-4">
              <button className='btn border d-flex py-2' type="button" onClick={togglePicker}>
                <img src={calendarSvg} alt="Calendar" width={24} height={22} />
              </button>
              {showPicker && (
                <div className="position-absolute z-3 mt-2 rounded-3"
                  style={{ bottom: '-30px', left: '-250px' }} >
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setShowPicker(false);
                    }}
                    inline
                    minDate={startDate}
                    maxDate={endDate}
                  />
                </div>
              )}
            </div>

          </div>

          <div className="d-flex mt-3 justify-content-center">
            {sevenDays.map(({ dayNum, weekday, value, isHoliday }) => (
              <button
                key={value}
                className={`btn border rounded-circle me-2 d-flex align-items-center custom-btn
                  ${selectedDate === value ? 'btn-secondary' : 'btn-light'}
                  ${isHoliday ? 'disabled-btn' : ''}`}

                style={{ width: '60px', height: '60px', flexShrink: 0 }}

                onClick={() => !isHoliday && handleDateClick(value)}
                disabled={isHoliday}
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
                        : slot.isBlocked ? 'btn-secondary'
                          : selectedSlot === slot.time ? 'btn-pink'
                            : 'btn-light'}`}

                    disabled={slot.isBooked || slot.isBlocked}
                    onClick={() => handleSlotClick(slot.time)}
                  >
                    {slot.time}
                  </button>
                ))}

              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn light border mt-3"
                  style={{ width: '4rem', padding: '0.25rem 0.5rem' }}
                >
                  Book
                </button>

              </div>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
}
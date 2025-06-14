import { useState } from 'react';
import './Calendar.css';
import calendarSvg from '../../assets/calendar.svg';


export default function Calendar() {

    const getNextMonth = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);

            date.setDate(today.getDate() + i);
            dates.push({
                dayNum: date.getDate(),
                weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
                value: date.toISOString().split('T')[0]
            });
        }
        return dates;
    };

    const timeSlotsData = {

        '2025-06-11': ['10:00 AM', '11:00 AM', '2:00 PM'],
        '2025-06-12': ['9:30 AM', '1:00 PM'],

    };

    const dates = getNextMonth();
    const [selectedDate, setSelectedDate] = useState(dates[0].value);

    const handleDateClick = (value) => {
        setSelectedDate(value);
    };

    const timeSlots = timeSlotsData[selectedDate] || ['No available slots'];
    const monthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    return (
        <div className="calendar container mt-4">
            <h2 className="mb-3">Schedula for clients</h2>
            <div className='mb-4 d-flex justify-content-between gap-2'>
                <button type="button" className="btn border d-flex align-items-center">
                    <img src="data:image/jpeg;base64,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" className="rounded-circle me-2" width="25" height="25" />
                        Emily
                </button>
            <button className='btn d-flex border' type="button">
                <img src={calendarSvg} alt="Calendar" width={24} height={22} />
            </button>
            </div>
            <h4 className="mb-3">Select Time</h4>
            <h5 className="mb-3">{monthYear}</h5>
            <div className="container mt-4">
                <div className="d-flex overflow-auto mb-3">
                    {dates.map(({ dayNum, weekday, value }) => (
                        <button
                            key={value}
                            className="btn btn-outline-primary rounded-circle me-2 d-flex justify-content-center align-items-center custom-btn"
                            style={{ width: '60px', height: '60px', flexShrink: 0 }}

                            onClick={() => handleDateClick(value)}
                        >
                            <div>{dayNum}</div>
                            <div style={{ fontSize: '12px' }}>{weekday}</div>
                        </button>
                    ))}
                </div>

                <div>
                    <h5>Available Time Slots on {selectedDate}:</h5>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                        {timeSlots.map((slot, i) => (
                            <div key={i} className="btn btn-light border">
                                {slot}
                            </div>
                        ))}
                    </div>
                    <div className="d-grid gap-2 mt-4">
                        <button className="btn btn-outline-dark text-start" type="button">9:00 a.m.</button>
                        <button className="btn btn-outline-dark text-start" type="button">10:00 a.m.</button>
                        <button className="btn btn-outline-dark text-start" type="button">11:00 a.m.</button>
                        <button className="btn btn-secondary text-start" disabled type="button">12:00 p.m.</button>
                        <button className="btn btn-outline-dark text-start" type="button">1:00 p.m.</button>
                        <button className="btn btn-outline-dark text-start" type="button">2:00 p.m.</button>
                        <button className="btn btn-outline-dark text-start" type="button">3:00 p.m.</button>
                        <button className="btn btn-outline-dark text-start" type="button">4:00 p.m.</button>
                    </div>
                </div>
            </div>
        </div>

    );

}
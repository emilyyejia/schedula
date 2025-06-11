import { useState } from 'react';
import './Calendar.css';

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

    return (
        <div className='calendar-header'>
            <h3 className="mb-3 text-start">Schedula for clients</h3>
            <h4 className="mb-3 text-start">Select Time</h4>
            <div className="container mt-4">
                <div className="d-flex overflow-auto mb-3">
                    {dates.map(({ dayNum, weekday, value }) => (
                        <button
                            key={value}
                            className="btn btn-outline-primary rounded-circle me-2 d-flex justify-content-center align-items-center"
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
                </div>
            </div>
        </div>

    );

}


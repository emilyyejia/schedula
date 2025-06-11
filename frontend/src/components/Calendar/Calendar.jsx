import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar() {
    const [events, setEvents] = useState([]);
    function handleSelect(slot) {
        setEvents([...events, {
            start: slot.startStr,
            end: slot.endStr,
        }]);
    }

    return (
        <div className="d-flex justify-content-center my-4">
            <div className="bg-white p-3 rounded shadow">
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    slotMinTime='09:00:00'
                    slotMaxTime='18:00:00'
                    selectable={true}
                    select={handleSelect}
                    weekends={false}
                    allDaySlot={false}
                    events={events}
                />


            </div>

        </div>


    );

}


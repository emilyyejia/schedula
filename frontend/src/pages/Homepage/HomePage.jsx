import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import * as appointmentService from "../../services/appointmentsService";
import './HomePage.css';

export default function HomePage() {
    const [ teachers, setTeachers] = useState([]);
    useEffect(() => {
        async function fetchTeacher() {
            const teachers = await appointmentService.getTeachers();
            console.log(teachers);
            setTeachers(teachers);
        }
        fetchTeacher();
     
    }, []);

    return <div className='homepage'>
        <h1>Marketing</h1>
        <ul> {teachers.map((teacher, index) => (
            <li key={index}>
                {teacher.name}
                <Link to={`/appointments/${teacher._id}/new`}>Book Your Slot</Link>
            </li>
        ))}
        </ul>
    </div>

}
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import * as appointmentService from "../../services/appointmentsService";
import './HomePage.css';

export default function HomePage() {
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        async function fetchTeacher() {
            const teachers = await appointmentService.getTeachers();
            console.log(teachers);
            setTeachers(teachers);
        }
        fetchTeacher();

    }, []);

    return (
        <div className='homepage'>
            <h1 className="mb-5">Marketing</h1>
            <div className="d-flex flex-wrap justify-content-center mt-4">
                {teachers.map((teacher, index) => (
                    <div key={teacher._id || index} className="card" style={{ width: '18rem' }}>
                        <img src="https://plus.unsplash.com/premium_photo-1661918391309-7ddd44addee6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpbmVzZSUyMGdpcmwlMjBwcm9maWxlJTIwcGhvdG98ZW58MHx8MHx8fDA%3D" className="card-img-top" alt="teacher photo"  style={{ height: '250px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title"> {teacher.name}</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            <Link class="btn btn-primary" to={`/appointments/${teacher._id}/new`}>Book Your Slot</Link>
                        </div>
                    </div>
                ))}


            </div>

        </div>
    );
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import * as appointmentService from "../../services/appointmentsService";
import './BookAppointmentPage.css';


export default function bookAppointmentPage() {
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
        <div className='main-page' >
            <h1 className="mb-5">Schedula with Your Teachers </h1>
            <div className="d-flex flex-wrap justify-content-center mt-4">
                {teachers.map((teacher, index) => (
                    <div key={index} className="card m-3" style={{ width: '18rem' }}>
                        <img src={teacher.photo} className="card-img-top" alt="teacher photo"  />
                        <div className="card-body">
                            <h5 className="card-title"> {teacher.teacher.name}</h5>
                            <p className="card-text">{teacher.bio}</p>
                            <Link class="btn btn-dark" to={`/appointments/${teacher.teacher._id}/new`}>Book Your Slot</Link>
                        </div>
                    </div>
                ))}


            </div>

        </div>
    );
}
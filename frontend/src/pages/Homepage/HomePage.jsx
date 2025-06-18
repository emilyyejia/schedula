import searchSvg from '../../assets/search.svg';
import { useState } from 'react';
import { Link } from 'react-router';
import './HomePage.css';
import * as teacherService from '../../services/teachersService';
import { useEffect } from 'react';

export default function HomePage() {
    const [searchText, setSearchText] = useState('');
    const [searchedInfo, setSearchedInfo] = useState([]);
    const [allTeachers, setAllTeachers] = useState([]);

    useEffect(() => {
        async function fetchTeachers() {
            const teachers = await teacherService.getTeachers();
            setAllTeachers(teachers);
            setSearchedInfo(teachers);
        }
        fetchTeachers();
    }, []);
    useEffect(
        function () {
            async function fetchsSearch() {
                const search = new RegExp(`.*${searchText}.*`, 'i');
                setSearchedInfo(allTeachers.filter((teacherProfile) =>
                    search.test(teacherProfile.teacher.name) || teacherProfile.subjects.some(sub => search.test(sub))));
            }
            fetchsSearch();
        }, [searchText]
    );
    console.log(searchedInfo);


    return (
        <div className="home-hero">
            <div className="text-center mb-5">
                <div className="display-5 fw-bold py-3">Find Your Perfect Tutor</div>
                <p >Search and book online sessions with trusted educators.</p>
                <div className="container mt-4" style={{ maxWidth: "320px" }}>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <img src={searchSvg} alt="SearchBar" style={{ height: '24px' }} />
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by subject or name"
                            aria-label="Search"
                            value={searchText}
                            onChange={(evt) => setSearchText(evt.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    {searchText && searchedInfo.length > 0 ? (
                        searchedInfo.map((teacherObj, idx) => (
                            <Link
                                to={`/appointments/${teacherObj.teacher._id}/new`}
                                key={idx}
                                className="card my-3 shadow-sm text-decoration-none text-dark"
                                style={{ maxWidth: '600px', margin: 'auto', display: 'block' }}
                            >
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-4">
                                        <img
                                            src={teacherObj.photo}
                                            alt={teacherObj.teacher.name}
                                            className="img-fluid rounded-start"
                                            style={{ objectFit: 'cover', height: '150px', width: '100%' }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body text-start">
                                            <h5 className="card-title">{teacherObj.teacher.name}</h5>
                                            <p className="card-text mb-1"><strong>Subjects:</strong> {teacherObj.subjects.join(', ')}</p>
                                            <p className="card-text"><small className="text-muted">{teacherObj.bio}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : searchText && searchedInfo.length === 0 ? (
                        <p className="text-center fs-3 mt-3">No teachers found for "{searchText}"</p>
                    ) : null}
                </div>
            </div>                 
            <div className="container mt-5">
                <h3 className="text-center mb-4">Why Choose Schedula?</h3>
                <div className="row text-center">
                    <div className="col-md-4">
                        <i className="bi bi-clock-history display-5 mb-2"></i>
                        <h5>Flexible Scheduling</h5>
                        <p>Choose times that work for your busy life.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-star-fill display-5 text-dark mb-2"></i>
                        <h5>Top-Rated Teachers</h5>
                        <p>All teachers are verified by real students.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-laptop display-5 mb-2"></i>
                        <h5>Online or In-Person</h5>
                        <p>Join lessons wherever you're comfortable.</p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <h3>Ready to get started?</h3>
                <p>Sign up and book your first session in minutes.</p>
                <Link to="/signin" className="btn btn-pink btn-lg mt-2">Create Free Account</Link>
            </div>

        </div>
    );
}
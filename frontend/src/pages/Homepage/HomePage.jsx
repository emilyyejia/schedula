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
        <div className="text-center mb-5">
            <h2 className="display-4 py-5 fw-bold">Book expert teachers effortlessly.</h2>

            <div className="container" style={{ maxWidth: "700px" }}>
                <div className="input-group input-group-lg">
                    <span className="input-group-text">
                        <img src={searchSvg} alt="SearchBar" style={{ height: '24px' }} />
                    </span>
                    <input
                        type="text"
                        className="form-control"
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



    );
}
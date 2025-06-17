import searchSvg from '../../assets/search.svg';
import { useState } from 'react';
import './HomePage.css';

export default function HomePage() {


    return (
        <div className="homepage text-center  mb-5">
            <h2 className="display-4 py-5 fw-bold ">Book expert teachers effortlessly.</h2>
            <div className='container' style={{ maxWidth: "500px" }}>
                <div className="input-group">
                    <span className="input-group-text"><img src={searchSvg} alt="SearchBar" /></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>


            </div>

        </div>


    );
}
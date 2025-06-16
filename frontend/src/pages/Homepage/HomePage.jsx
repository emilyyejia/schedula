import { Link } from 'react-router';
import './HomePage.css'
export default function HomePage() {
 
    return (
      <div className="homepage text-center mb-5">
        <h1 className="display-4 py-5">Welcome to Schedula</h1>
        <p className="lead">Book appointments with the best teachers at your convenience.</p>
        <Link to="/signin" className="btn border btn-light btn-lg mt-3">Get Started</Link>
      

      <div className="row text-center mb-5 py-5">
        <div className="col-md-4">
          <i className="bi bi-calendar3" style={{ fontSize: '2rem' }}></i>
          <h4 className="mt-3">Easy Scheduling</h4>
          <p>Find available time slots and book in just a few clicks.</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-person-badge" style={{ fontSize: '2rem' }}></i>
          <h4 className="mt-3">Expert Teachers</h4>
          <p>Connect with qualified, experienced educators.</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-laptop" style={{ fontSize: '2rem' }}></i>
          <h4 className="mt-3">Learn Anywhere</h4>
          <p>Book remote or in-person sessions that work for you.</p>
        </div>
      </div>
      </div>
    

    );
}
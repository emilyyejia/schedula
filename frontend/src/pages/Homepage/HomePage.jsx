import { Link } from 'react-router';
import './HomePage.css'
export default function HomePage() {
 
    return (
      <div className="homepage text-center mb-5">
        <h2 className="display-4 py-5 fw-bold ">Book expert teachers effortlessly.</h2>
        <Link to="/signin" className="btn border btn-light btn-lg mt-3">Get Started</Link>
 
      </div>
    

    );
}
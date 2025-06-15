import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from '../Homepage/HomePage';
import MyAppointmentPage from '../MyAppointmentPage/MyAppointmentPage'
import NewAppointmentPage from '../NewAppointmentPage/NewAppointmentPage';
import NavBar from '../../components/NavBar/NavBar';
import SignInPage from '../SignInPage/SignInPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import { getUser } from '../../services/authService';
import LogInPage from '../LogInPage/LogInPage';
import MySessionsPage from '../MySessionsPage/MySessionsPage';
import ManageSessionsPage from '../ManageSessionsPage/ManageSessionsPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className='App'>
      <NavBar user={user} setUser={setUser} />
      <section id='main-section'>
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/appointments" element={<MyAppointmentPage />} />
            <Route path="/appointments/new" element={<NewAppointmentPage />} />
            <Route path="/appointments/reschedule/:appointmentId" element={<NewAppointmentPage />} />
            <Route path="/sessions" element={<MySessionsPage />} />
            <Route path="/sessions/new" element={<ManageSessionsPage />} />
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    </main>
  );
}



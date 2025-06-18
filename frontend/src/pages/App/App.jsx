import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from '../Homepage/HomePage';
import BookAppointmentPage from '../BookAppointmentPage/BookAppointmentPage';
import MyAppointmentPage from '../MyAppointmentPage/MyAppointmentPage'
import NewAppointmentPage from '../NewAppointmentPage/NewAppointmentPage';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import SignInPage from '../SignInPage/SignInPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import { getUser } from '../../services/authService';
import LogInPage from '../LogInPage/LogInPage';
import MySessionsPage from '../MySessionsPage/MySessionsPage';
import ManageSessionsPage from '../ManageSessionsPage/ManageSessionsPage';
import { useEffect } from 'react';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className='App'>
      <NavBar user={user} setUser={setUser} />
      <section id='main-section'>
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/appointments" element={<BookAppointmentPage />} />
            <Route path="/appointments/all" element={<MyAppointmentPage />} />
            <Route path="/appointments/:teacherId/new" element={<NewAppointmentPage user={user}/>}  />
            <Route path="/appointments/reschedule/:appointmentId/:teacherId" element={<NewAppointmentPage />} />
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
            <Route path="/appointments/:teacherId/new" element={<NewAppointmentPage user={user} />}  />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
      <Footer/>
    </main>
    
  );
}



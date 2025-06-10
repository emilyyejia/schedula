import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from '../Homepage/HomePage';
import PostListPage from '../PostListPage/PostListPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import NavBar from '../../components/NavBar/NavBar';
import SignInPage from '../SignInPage/SignInPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import { getUser } from '../../services/authService';
import LogInPage from '../LogInPage/LogInPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className='App'>
      <NavBar user={user} setUser={setUser}/>
      <section id='main-section'>
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/new" element={<NewPostPage />} />
            <Route path="*" element={null}/>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage setUser={setUser}/>}/>
            <Route path="/signup" element={<SignUpPage setUser={setUser}/>}/>
            <Route path="/login" element={<LogInPage setUser={setUser}/>}/>
            <Route path="*" element={null}/>
          </Routes>
        )}
      </section>
    </main>
  );
}



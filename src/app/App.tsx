import { Navbar } from '../components/Navbar/Navbar';
import { useAppSelector } from './hooks';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyAuth } from '../state/user/userSlice';
import { Footer } from '../components/Footer/Footer';
import type { AppDispatch } from './store';

function App() {
  const user = useAppSelector((state) => state.auth.user);
  const [loggedNavbarMode, setNavbarMode] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(verifyAuth());
  }, []);

  useEffect(() => {
    setNavbarMode(!!user);
  }, [user]);

  return (
    <>
      <Navbar loggedMode={loggedNavbarMode} />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';
import headerImage from '../images/logoImage.png';
import '../style.css';

const Header = () => {
  const [user] = useAuthState(auth);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const openSignInModal = () => setSignInModalOpen(true);
  const closeSignInModal = () => setSignInModalOpen(false);

  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);

  return (
    <header>
      <div id="header">
        <img src={headerImage} alt="Team Acorn" />
      </div>
      <div id="user-container">
        {user ? (
          <>
            <p id="usertext">Welcome, {user.email}!</p>
            <SignOut />
          </>
        ) : (
          <>
            <p id="usertext">You are not currently logged in.</p>
            <button onClick={openSignInModal}>Login</button>
            <button onClick={openSignUpModal}>SignUp</button>
            <SignIn isOpen={signInModalOpen} closeModal={closeSignInModal} />
            <SignUp isOpen={signUpModalOpen} closeModal={closeSignUpModal} />
          </>
        )}
      </div>
      <div id="topnav">
        <Link to="/">Home</Link>
        <Link to="/MyToDoList">My To Do List</Link>
        <Link to="/task/:id">Add Task</Link>
      </div>
    </header>
  );
};


export default Header;


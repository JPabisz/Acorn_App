import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { auth } from '../config';
import SignUp from './SignUp';
import headerImage from '../images/logoImage.png';
import '../style.css';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <header>
      <div id="header">
        <img src={headerImage} alt="Team Acorn" />
      </div>
      <div id="user-container">
        <p id="usertext">
          {user ? `Welcome, ${user.email}` : 'You are not currently logged in.'}
        </p>
        {user ? ( <SignOut />) : ( <> <SignIn /> <SignUp /> </> )}
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


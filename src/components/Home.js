import React from 'react';
import '../style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';

const Home = () => {
  const [user] = useAuthState(auth);

  const greeting = user ? `Hello ${user.displayName || user.email}` : 'Hello there';

  return (
    <main>
      <div id="section1">
        <h1>Welcome Home!</h1>
        <article>
          <p>{greeting}, and welcome to our acorn-themed task planner!</p>
          <p>
           We know that keeping track of your tasks can be overwhelming, but with Acorn Task Planner, you can stay organized and focused. Our platform is easy to use and designed to help you manage your daily tasks with ease. Whether you're a student, a busy professional, or a stay-at-home parent, we've got you covered.
          </p>
        </article>
      </div>
      <div id="section2">
        <article>
          <h2>Feature Description</h2>
          <p>
            With Acorn Task Planner, you can easily add tasks to your to-do list, mark them as completed or incomplete, and view task details by simply clicking on the task on the MyToDoList tab. Our intuitive interface makes it easy to stay on top of your tasks and get things done efficiently. Make sure to sign up and sign in to make use of all our awesome features.
          </p>
        </article>
      </div>
    </main>
  );
};

export default Home;

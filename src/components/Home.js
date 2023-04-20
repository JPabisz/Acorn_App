import React from 'react';
import '../style.css';

const Home = () => {
  return (
    <main>
      <div id="section1">
        <h1>Welcome Home!</h1>
        <article>
          <p>Hello there, and welcome to our website!</p>
          <p>
            This will contain useful information about the web page and the project as a whole. Currently, the web page has a few pages that describe a variety of tasks that our team will complete by the end of the semester.
          </p>
        </article>
      </div>
      <div id="section2">
        <article>
          <h2>Additional Resources</h2>
          <p>Welcome to the overflow section.</p>
          <p>
            This is where we will put in additional resources and useful links that one would want to access often and quickly.
          </p>
        </article>
      </div>
    </main>
  );
};

export default Home;

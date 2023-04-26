import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import MyToDoList from './components/MyToDoList';
import Details from './components/Details';
import AddTask from './components/AddTask';
import './style.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MyToDoList" element={<MyToDoList />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/task/:id" element={<AddTask />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;

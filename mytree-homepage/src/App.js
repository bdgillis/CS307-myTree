import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Activities from './pages/Activities'
import Groups from './pages/Groups'
import Friends from './pages/Friends'
import Leaderboards from './pages/Leaderboards'
import DailyChallenge from './pages/DailyChallenge';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar/Sidebar';
import { useState } from 'react';


function App() {

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

  return (
    <Router>
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} />
      <Routes>
        <Route path = '/' exact element={<Home/>} />
        <Route path = '/activities' exact element={<Activities/>} />
        <Route path = '/groups' exact element={<Groups/>} />
        <Route path = '/friends' exact element={<Friends/>} />
        <Route path = '/leaderboards' exact element={<Leaderboards/>} />
        <Route path = '/daily-challenge' exact element={<DailyChallenge/>} />
        <Route path = '/settings' exact element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default App;

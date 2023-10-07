import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import Header from './components/Header';
import home from './pages/home';
import loginPage from './pages/loginPage';
import redirectHome from './pages/redirectHome';
import "./App.css";
import Navbar from './components/Navbar/Navbar';
import HomeTab from './pages/HomeTab'
import Activities from './pages/Activities'
import Groups from './pages/Groups'
import Friends from './pages/Friends'
import Leaderboards from './pages/Leaderboards'
import DailyChallenge from './pages/DailyChallenge';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar/Sidebar';


function App() {
    const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

    return (
        <div className="App">
            <Sidebar isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} />
            <Header />

            <BrowserRouter>

                <div>
                
                    <Switch>
                        <Route exact path="/" component={withRouter(home)}/>
                        <Route path="/loginPage" component={withRouter(loginPage)}/>
                        <Route path="/redirectHome" component={withRouter(redirectHome)}/>
                        <Route path = '/homeTab' exact element={<HomeTab/>} />
                        <Route path = '/activities' exact element={<Activities/>} />
                        <Route path = '/groups' exact element={<Groups/>} />
                        <Route path = '/friends' exact element={<Friends/>} />
                        <Route path = '/leaderboards' exact element={<Leaderboards/>} />
                        <Route path = '/daily-challenge' exact element={<DailyChallenge/>} />
                        <Route path = '/settings' exact element={<Settings/>} />

                    </Switch>
                </div>    
            </BrowserRouter>


        </div>


    )
};

export default App;
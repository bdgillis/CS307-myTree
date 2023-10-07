import React from 'react'
import { BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import home from './pages/home';
import loginPage from './pages/loginPage';
import redirectHome from './pages/redirectHome';
import "./App.css";
import HomeTab from './pages/HomeTab'
import Activities from './pages/Activities'
import Groups from './pages/Groups'
import Friends from './pages/Friends'
import Leaderboards from './pages/Leaderboards'
import DailyChallenge from './pages/DailyChallenge';
import Settings from './pages/Settings';


function App() {


    return (
        <div className="App">
            
            <BrowserRouter>

                <div>
                
                    <Switch>
                        <Route exact path="/" component={withRouter(home)}/>
                        <Route path="/loginPage" component={withRouter(loginPage)}/>
                        <Route path="/redirectHome" component={withRouter(redirectHome)}/>
                        <Route path = '/homeTab' component={withRouter(HomeTab)} />
                        <Route path = '/activities' component={withRouter(Activities)} />
                        <Route path = '/groups' component={withRouter(Groups)} />
                        <Route path = '/friends' component={withRouter(Friends)} />
                        <Route path = '/leaderboards' component={withRouter(Leaderboards)} />
                        <Route path = '/daily-challenge' component={withRouter(DailyChallenge)} />
                        <Route path = '/settings' exact component={withRouter(Settings)} />

                    </Switch>
                </div>    
            </BrowserRouter>

            


        </div>
    

    )
};

export default App;
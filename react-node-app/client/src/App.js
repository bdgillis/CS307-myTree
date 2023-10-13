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
import ManageAccount from './pages/ManageAccount';
import EditActivityHistory from './pages/EditActivityHistory';
import Quiz from './pages/Quiz'
import TreeVisualization from './pages/TreeVisualization';
import Logout from './pages/Logout';
import ViewProfile from './pages/ViewProfile';


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
                        <Route path = '/tree-visualization' component={withRouter(TreeVisualization)} />
                        <Route path = '/log-out' component={withRouter(Logout)} />
                        <Route path = '/activities' component={withRouter(Activities)} />
                        <Route path = '/edit-history' component={withRouter(EditActivityHistory)} />
                        <Route path = '/groups' component={withRouter(Groups)} />
                        <Route path = '/friends' component={withRouter(Friends)} />
                        <Route path = '/leaderboards' component={withRouter(Leaderboards)} />
                        <Route path = '/daily-challenge' component={withRouter(DailyChallenge)} />
                        <Route path = '/manage-account' exact component={withRouter(ManageAccount)} />
                        <Route path = '/quiz' exact component={withRouter(Quiz)} />
                        <Route path = '/view-profile' exact component={withRouter(ViewProfile)} />



                    </Switch>
                </div>    
            </BrowserRouter>

            


        </div>
    

    )
};

export default App;
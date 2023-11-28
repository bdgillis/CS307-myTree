import React from 'react'
import { BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import home from './pages/home';
import loginPage from './pages/loginPage';
import redirectHome from './pages/redirectHome';
import "./App.css";
import HomeTab from './pages/HomeTab'
import UserTree from './pages/UserTree';
import Activities from './pages/Activities'
import Groups from './pages/Groups'
import ViewGroup from './pages/ViewGroup'
import Friends from './pages/Friends'
import Leagues from './pages/Leagues'
import Leaderboards from './pages/Leaderboards'
import DailyChallenge from './pages/DailyChallenge';
import ManageAccount from './pages/ManageAccount';
import EditActivityHistory from './pages/EditActivityHistory';
import Quiz from './pages/Quiz'
import Logout from './pages/Logout';
import ViewProfile from './pages/ViewProfile';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import Notification from './components/Notification';
import NotificationPage from './pages/notificationPage';
import UserProfile from './pages/UserProfile';
import FAQ from './pages/faq';
import ViewProfileFriendsList from './pages/ViewProfileFriendsList';
import Awards from './pages/Awards';


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
                        <Route path = '/log-out' component={withRouter(Logout)} />
                        <Route path = '/activities' component={withRouter(Activities)} />
                        <Route path = '/NotificationPage' component={withRouter(NotificationPage)}/>
                        <Route path = '/edit-history' component={withRouter(EditActivityHistory)} />
                        <Route path = '/groups' component={withRouter(Groups)} />
                        <Route path = '/viewgroup/:groupname' component={withRouter(ViewGroup)} />
                        <Route path = '/friends' component={withRouter(Friends)} />
                        <Route path = '/leagues' component={withRouter(Leagues)} />
                        <Route path = '/leaderboards' component={withRouter(Leaderboards)} />
                        <Route path = '/daily-challenge' component={withRouter(DailyChallenge)} />
                        <Route path = '/manage-account' exact component={withRouter(ManageAccount)} />
                        <Route path = '/quiz' exact component={withRouter(Quiz)} />
                        <Route path = '/view-profile' exact component={withRouter(ViewProfile)} />
                        <Route path = '/profile/:username' component={withRouter(UserProfile)} />
                        <Route path = '/homeTabNew/:username' component={withRouter(UserTree)} />
                        <Route path = '/faq' component={withRouter(FAQ)} />
                        <Route path = '/awards' component={withRouter(Awards)} />
                        <Route path = '' component={withRouter(ViewProfileFriendsList)} />

                    </Switch>
                </div>

                

            </BrowserRouter>

            


        </div>
    )
};

export default App;
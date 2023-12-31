import './Sidebar.css'
import React from 'react'
import { 
    SidebarContainer, 
    Icon, 
    CloseIcon, 
    SidebarWrapper,
    SideBtnWrap,
    SidebarRoute,
    SidebarMenu
} from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
  return (
    <SidebarContainer className="sidebarStyle" isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarRoute to='/homeTab' onClick={toggle}>
                    Home
                </SidebarRoute>
                <SidebarRoute to='/activities' onClick={toggle}>
                    Activities
                </SidebarRoute>
                <SidebarRoute to='/groups' onClick={toggle}>
                    Groups
                </SidebarRoute>
                <SidebarRoute to='/friends' onClick={toggle}>
                    Friends
                </SidebarRoute>
                <SidebarRoute to='/leagues' onClick={toggle}>
                    League
                </SidebarRoute>
                <SidebarRoute to='/leaderboards' onClick={toggle}>
                    Leaderboards
                </SidebarRoute>
                <SidebarRoute to='/awards' onClick={toggle}>
                    Awards
                </SidebarRoute>
                <SidebarRoute to='/goals' onClick={toggle}>
                    Goals
                </SidebarRoute>
                <SidebarRoute to="/view-profile" onClick={toggle}>
                    View Profile
                </SidebarRoute>
                <SidebarRoute to='/notificationPage' onClick={toggle}>
                    Notifications
                </SidebarRoute>
                <SidebarRoute to="/manage-account" onClick={toggle}>
                    Manage Account
                </SidebarRoute>
                <SidebarRoute to="/climate-dashboard" onClick={toggle}>
                    Climate Dashboard
                </SidebarRoute>
                <SidebarRoute to="/log-out" onClick={toggle}>
                    Log Out
                </SidebarRoute>
            </SidebarMenu>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
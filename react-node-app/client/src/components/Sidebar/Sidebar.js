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
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarRoute to='/activities' onClick={toggle}>
                    Activities
                </SidebarRoute>
                <SidebarRoute to='/groups' onClick={toggle}>
                    Groups
                </SidebarRoute>
                <SidebarRoute to='/friends' onClick={toggle}>
                    Friends
                </SidebarRoute>
                <SidebarRoute to='/leaderboards' onClick={toggle}>
                    Leaderboards
                </SidebarRoute>
                <SidebarRoute to='/daily-challenge' onClick={toggle}>
                    Daily Challenge
                </SidebarRoute>
                <SideBtnWrap>
                    <SidebarRoute to="/settings" onClick={toggle}>
                        Settings
                    </SidebarRoute>
                </SideBtnWrap>
            </SidebarMenu>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
	background: #90ee90;
  	height: 80px;
  	display: flex;
  	justify-content: space-between;
  	padding: 0.5rem calc((100vw - 1000px) / 2);
  	z-index: 10;
`;

export const NavLink = styled(Link)`
  	color: #fff;
  	display: flex;
  	align-items: center;
  	text-decoration: none;
  	padding: 0 1rem;
  	height: 100%;
	font-size: 18px;
	font-weight: bold; 
  	cursor: pointer;
	

  	&.active {
    	color: #15cdfc;
  	}
	  &:hover {
    	transition: all 0.2s ease-in-out;
    	//background: #9ee9;
		opacity:4;
    	color: #010606;
  	}
`;

export const Bars = styled(FaBars)`
	display: none;
  	color: #fff;

  	@media screen and (max-width: 1150px) {
    	display: block;
    	position: absolute;
    	top: 12px;
    	right: 0;
    	transform: translate(-100%, 75%);
    	font-size: 1.8rem;
    	cursor: pointer;
  	}
`;

export const NavMenu = styled.div`
  	display: flex;
  	align-items: center;
  	margin-right: -24px;

  	@media screen and (max-width: 1150px) {
   		display: none;
  	}
`;

export const NavBtn = styled.nav`
  	display: flex;
  	align-items: center;
  	margin-left: 20px;

  

  	@media screen and (max-width: 1150px) {
    	display: none;
  	}
`;

export const NavBtnLink = styled(Link)`
  	border-radius: 4px;
  	background: #256ce1;
  	padding: 10px 22px;
  	color: #fff;
  	outline: none;
  	border: none;
  	cursor: pointer;
	font-size: 18px;
	font-weight: bold; 
  	transition: all 0.2s ease-in-out;
  	text-decoration: none;

  	margin-left: -18px;

  	&:hover {
    	transition: all 0.2s ease-in-out;
    	background: #fff;
    	color: #010606;
  	}
`;

export const FriendBtnLink = styled(Link)`
	border-radius: 4px;
	background: #256ce1;
	padding: 7px 15px;
	color: #fff;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	font-size: 20px;
	font-weight: bold; 

	margin-top: 15px;
	margin-left: 0px;

	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #010606;
	}
`;

export const GroupBtnLink = styled(Link)`
	
  justify-content: center;
  margin-left: 3.5px;
  margin-right: 3.5px;


  border-radius: 4px;
  background: #256ce1;
  padding: 5px 10px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-size: 13px;
  font-weight: bold; 

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

export const BackBtnLink = styled(Link)`
	justify-content: center;
	margin-left: 3.5px;
	margin-right: 3.5px;


	border-radius: 4px;
	background: #256ce1;
	padding: 5px 10px;
	color: #fff;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	font-size: 13px;
	font-weight: bold; 

	&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: #010606;
	}
`;

export const RefreshBtnLink = styled(Link)`
	justify-content: center;
	margin-left: 3.5px;
	margin-right: 3.5px;


	border-radius: 4px;
	background: #256ce1;
	padding: 5px 10px;
	color: #fff;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	font-size: 13px;
	font-weight: bold; 

	&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: #010606;
	}
`;
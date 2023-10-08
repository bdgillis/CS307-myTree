import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";


export const Input = styled.input`
    color: grey;
    font-size: 1em;
    border: 2px solid #479d56;
    border-radius: 3px;
  `;

export const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

export const ButtonLink = ({ to, children }) => {
    return <Link to={to}><Button>{children}</Button></Link>;
}

export const ParameterInput = ({placeholder, to, children}) => {
    return (
        <div>
          <Input placeholder={placeholder} />
          <ButtonLink to={to}>{children}</ButtonLink>
        </div>
      );
        
}



export const ButtonToggle = styled(Button)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;
export const ButtonGroup = styled.div`
  display: flex;
`;


export const ToggleGroup = ({types, onToggle}) => {
  const [active, setActive] = useState(null);
  
  const handleClick = (type) => {
    setActive(type);
    if (onToggle) {
      onToggle(type);
    }
  };

  return (
    <ButtonGroup>
      {types.map(type => (
        <ButtonToggle
          key={type}
          active={active === type}
          onClick={() => handleClick(type)}
        >
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
  );
}
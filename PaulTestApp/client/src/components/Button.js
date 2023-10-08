import React, { useState } from 'react'
import styled from 'styled-components';

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
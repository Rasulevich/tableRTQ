import * as React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  opacity: 0.5;
  border: solid 1px grey; 
  background: #27272A;
  border-radius: 5px;
  color: #fff;
  padding:5px;
  width:100%;
`;

export const Input = ({handleChange,handleKeyPress,holder,name}) => {
    return (
            <StyledInput placeholder={holder} name={name} onChange={handleChange} onKeyDown={handleKeyPress} />
        )
}



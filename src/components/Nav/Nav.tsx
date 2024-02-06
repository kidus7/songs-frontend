/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { space, layout, typography, color, width, fontSize } from 'styled-system';
import { colours } from 'styles/colours';

const NavContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: ${colours.background};
  padding: 1rem 2rem;
  box-shadow: none;
  border-radius: 40px;
  // width: 50%;
  min-width: max-content;
  &:hover {
    color: ${colours.active};
  }
  ${space}
  ${layout}
`;

const NavLink = styled(Link)`
  ${typography}
  color: ${colours.primary};
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin-left: 0.8rem;

  &:hover, &.active {
    color: ${colours.active};
    // text-decoration: underline;
  }
`;


const Nav: React.FC = () => {
  return (
    <NavContainer>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/songs">Songs</NavLink>
      {/* <NavLink to="/contact">Contact</NavLink> */}
    </NavContainer>
  );
};

export default Nav;

import React from "react";
import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import Bars from "../images/bars.svg";
import LogoLandingView from "./LogoLandingView";
import Logo from "./Logo";

const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  z-index: 100;
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const NavLink = css`
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`;

const MenuBars = styled.i`
  display: block;
  background-image: url(${Bars});
  background-size: contain;
  height: 40px;
  width: 40px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-50%, 25%);
`;

const NavMenu = styled.div`
  display: none;
`;

const NavMenuLinks = styled(Link)`
  ${NavLink}
`;

const Navbar = ({ toggle }) => {
  return (
    <Nav>
      <MenuBars onClick={toggle} />
      <Logo sx={{ width: "150px" }} />
    </Nav>
  );
};

export default Navbar;

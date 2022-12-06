import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const DummyHeader = styled.div`
  height: 40px;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: black;
  position: fixed;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;

  span {
    color: white;
    font-size: 16px;
    font-weight: 900;
    line-height: 40px;
    margin-left: 10px;
  }

  svg {
    margin-top: 8px;
    color: white;
    height: 24px;
    margin-right: 10px;
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lime;
  padding-top: 40px;
`;

export const Header = ({}) => {
  return (
    <>
      <DummyHeader>
        <span>Vital Beta</span>
        <FontAwesomeIcon icon={faBars} />
      </DummyHeader>
      <HeaderMenu>
        <span>Menu</span>
        <span>Menu</span>
        <span>Menu</span>
        <span>Menu</span>
      </HeaderMenu>
    </>
  );
};

export default Header;

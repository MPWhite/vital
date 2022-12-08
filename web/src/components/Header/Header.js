import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faGear,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { SignUpCta } from "../SignupCta";

const DummyHeader = styled.div`
  height: 40px;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #222;
  position: fixed;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  z-index: 2000;

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
  background-color: #222;
  padding-top: 60px;
  padding-bottom: 20px;
  width: 100vw;
  position: fixed;
  z-index: 1990;
  top: ${(props) => (props.open ? "0" : "-100%")};
  transition: top 0.3s ease-in-out;
`;

const HeadMenuList = styled.div`
  display: flex;
  justify-content: space-around;
`;

const HeaderMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  padding: 10px;

  svg {
    font-size: 30px;
    margin-bottom: 5px;
    color: white;
  }
`;

const HeaderMenuName = styled.span`
  color: #ccc;
  text-align: center;
  font-size: 10px;
`;

const CtaWrapper = styled.div`
  margin-top: -10px;
  padding: 20px;
`;

// TODO(!) Need to do global "isLoggedIn" and general global aith
const isLoggedIn = false;

export const Header = ({}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <DummyHeader>
        <span>Vital Beta</span>
        <div onClick={() => setOpen(!open)}>
          {open ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>
      </DummyHeader>
      <HeaderMenu open={open}>
        {isLoggedIn ? (
          <HeadMenuList>
            <Link to="/">
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faSearch} />
                <HeaderMenuName>Browse Boulders</HeaderMenuName>
              </HeaderMenuItem>
            </Link>
            <Link to="/">
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faGear} />
                <HeaderMenuName>Manage Account</HeaderMenuName>
              </HeaderMenuItem>
            </Link>
            <Link to="/">
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <HeaderMenuName>Logout</HeaderMenuName>
              </HeaderMenuItem>
            </Link>
          </HeadMenuList>
        ) : (
          <CtaWrapper>
            <SignUpCta />
          </CtaWrapper>
        )}
      </HeaderMenu>
    </>
  );
};

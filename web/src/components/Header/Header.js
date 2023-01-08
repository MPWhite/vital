import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars, faCloudArrowUp,
  faGear,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { SignUpCta } from "../SignupCta";
import { AuthContext } from "../Auth/AuthContextProvider";
import { useAuth } from "../Auth/hooks";

const DummyHeader = styled.div`
  height: 40px;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #222;
  position: fixed;
  border-bottom: 1px solid #333;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  z-index: 2000;

  svg {
    margin-top: 12.5px;
    color: white;
    margin-left: 15px;
    width: 15px;
  }
`;

const DummyHeaderLeft = styled.div`
  display: flex;
`;

const DummyHeaderRight = styled.div`
  display: flex;
  margin-right: 10px;
  object-fit: cover;
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    margin-top: 5px;
    border-radius: 15px;
    margin-right: 5px;
  }
`;

const AppTitle = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 900;
  line-height: 40px;
  margin-left: 10px;
`;

const HeaderMenu = styled.div`
  background-color: #222;
  padding-top: 60px;
  padding-bottom: 20px;
  width: 100vw;
  position: fixed;
  z-index: 1990;
  top: ${(props) => (props.open ? "0" : "-100%")};
  transition: top 0.1s ease-in-out;
`;

const HeadMenuList = styled.div`
  display: flex;
  justify-content: space-around;
`;

const HeaderMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;

  svg {
    font-size: 30px;
    margin-bottom: 5px;
    color: white;
  }
`;

const HeaderMenuName = styled.span`
  color: #ccc;
  text-align: center;
  font-size: 8px;
`;

const CtaWrapper = styled.div`
  margin-top: -10px;
  padding: 20px;
`;

const UserName = styled.span`
  color: white;
  line-height: 40px;
  font-size: 12px;
`;

const LoginButton = styled.button`
  width: 100px;
  height: 28px;
  margin-top: 6px;
  border: none;
  background: linear-gradient(-45deg, #0072ff, #00c6ff);
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px;
`;

export const Header = ({}) => {
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <DummyHeader>
        <DummyHeaderLeft>
          <div onClick={() => setOpen(!open)}>
            {open ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </div>
          <AppTitle>Vital Beta</AppTitle>
        </DummyHeaderLeft>

        {isAuthenticated ? (
          <Link to={`/user/${user.id}`}>
            <DummyHeaderRight>
              <img src={user.profilePicUrl} />
              {/*<UserName>{user.displayName}</UserName>*/}
            </DummyHeaderRight>
          </Link>
        ) : (
          <DummyHeaderRight>
            <Link to="/login">
              <LoginButton>Login</LoginButton>
            </Link>
          </DummyHeaderRight>
        )}
      </DummyHeader>
      <HeaderMenu open={open}>
        {isAuthenticated ? (
          <HeadMenuList>
            <Link to="/">
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faSearch} />
                <HeaderMenuName>Search</HeaderMenuName>
              </HeaderMenuItem>
            </Link>
            <Link to="/settings">
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faGear} />
                <HeaderMenuName>Settings</HeaderMenuName>
              </HeaderMenuItem>
            </Link>
            <Link to="/upload">
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faCloudArrowUp} />
                <HeaderMenuName>Upload</HeaderMenuName>
              </HeaderMenuItem>
            </Link>
            <div onClick={logout}>
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <HeaderMenuName>Logout</HeaderMenuName>
              </HeaderMenuItem>
            </div>
          </HeadMenuList>
        ) : (
          // TODO - Remove the copied code
          <HeadMenuList>
            <Link to="/">
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faSearch} />
                <HeaderMenuName>Search</HeaderMenuName>
              </HeaderMenuItem>
            </Link>
            <Link to="/upload">
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faCloudArrowUp} />
                <HeaderMenuName>Upload</HeaderMenuName>
              </HeaderMenuItem>
            </Link>
          </HeadMenuList>
          )}
      </HeaderMenu>
    </>
  );
};

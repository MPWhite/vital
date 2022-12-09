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
import { AuthContext } from "../Auth/AuthContextProvider";

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

  svg {
    margin-top: 12.5px;
    color: white;
    margin-left: 15px;
    width: 15px;
  }
`;

const DummyHeaderLeft = styled.div`
  display: flex;
`

const DummyHeaderRight = styled.div`
  display: flex;
  margin-right: 10px;
  object-fit: cover;
  background-color: black;
  img {
    width: 30px;
    height: 30px;
    margin-top: 5px;
    border-radius: 15px;
    margin-right: 5px;
  }
`

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

const UserName = styled.span`
  color: white;
  line-height: 40px;
  font-size: 12px;
`;

export const Header = ({}) => {
  const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
      throw new Error("AuthContext must be within AuthProvider");
    }

    return context;
  };

  const [open, setOpen] = React.useState(false);
  const { isAuthenticated, user, login, logout } = useAuth();

  console.log(user);

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
          <DummyHeaderRight>
            <img src={user.profilePicUrl}/>
            <UserName>{user.displayName}</UserName>
          </DummyHeaderRight>
        ) : (
          <DummyHeaderRight>
            <Link to="/login">
              <button>Login</button>
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
                <HeaderMenuName>Browse Boulders</HeaderMenuName>
              </HeaderMenuItem>
            </Link>
            <Link to="/">
              <HeaderMenuItem>
                <FontAwesomeIcon icon={faGear} />
                <HeaderMenuName>Manage Account</HeaderMenuName>
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
          <CtaWrapper>
            <SignUpCta />
          </CtaWrapper>
        )}
      </HeaderMenu>
    </>
  );
};

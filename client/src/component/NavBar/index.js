import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState.js";
import { Link, Redirect } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
  .nav-item a {
    padding-right: 10px;
  }
`;

const NavigationBar = (props) => {
  const { isLoggedIn, handleIsLoggedIn } = useContext(GlobalContext);

  const handleLogOut = (e) => {
    e.preventDefault();
    handleIsLoggedIn(false);
    return <Redirect to="/" />
  };

  console.log(
    "isLoggedIn Nav: ",
    isLoggedIn,
    typeof isLoggedIn,
    "asdf",
    Boolean(isLoggedIn) === false
  );
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.clear();
    }
  }, [isLoggedIn]);

  return (
    <Styles>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">Fleet Farming</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {Boolean(isLoggedIn) === false ? (
                <>
                  <Nav.Item>
                    <Link to="/home">Home</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/login">Login</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/Register">Register</Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  {" "}
                  <Nav.Item>
                    <Link to="/profile">Profile</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/myfarm">My Farm</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/map">Map</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/messages">Messages</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/" onClick={handleLogOut}>
                      Log out
                    </Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styles>
  );
};

export default NavigationBar;

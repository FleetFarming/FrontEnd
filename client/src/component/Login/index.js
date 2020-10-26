// eslint-disable-next-line
import React, { useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState.js";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { API } from "../../config/apiCalls.js";
const { server, getUserId } = API;

const Styles = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 50px;
`;

const Login = (props) => {
  // eslint-disable-next-line
  const { isLoggedIn, handleIsLoggedIn } = useContext(GlobalContext);

  const onChangeLogIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value,
      password = e.target.password.value;
    console.log("e...", email, password);
    axios
      .post(`${server}${getUserId}`, { email, password })
      .then((res) => {
        console.log("data from login", res.data);
        if (res.data.length > 0) {
          const userId = res.data[0].user_id;

          handleIsLoggedIn(true, userId);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", userId);
        }
        console.log("localStorage: ", localStorage);
      })
      .catch((err) => {
        console.log("login failed", err);
      });
      // handleIsLoggedIn(true, 'userId');
      // localStorage.setItem("isLoggedIn", true);
      // localStorage.setItem("userId", 'userId');
  };

  return (
    <>
      {isLoggedIn ? (
        <Redirect to={"/profile"} />
      ) : (
        <Styles>
          <Card>
            <Card.Header>
              <h4>Login To Your Account</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => onChangeLogIn(e)}>
                <Form.Group controlId="email">
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                {/* <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Styles>
      )}
    </>
  );
};

export default Login;

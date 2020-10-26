// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../config/apiCalls.js";
import stateList from "../../assets/constants/us-states.json";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState.js";

const { server, saveUser } = API;

const Styles = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 50px;
`;

const Register = () => {
  const { isLoggedIn, handleIsLoggedIn } = useContext(GlobalContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      street: e.target.street.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zipCode: e.target.zipCode.value,
      description: e.target.description.value,
    };
    axios
      .post(`${server}${saveUser}`, userData)
      .then((res) => {
        console.log("save user: ", res.data);
        const { success, msg, userId } = res.data;
        if (success) {
          handleIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", userId);
          return <Redirect to="/profile" />;
        } else {
          console.log(msg);
        }
      })
      .catch((err) => {
        console.log("err occurred in saving user: ", err);
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <Redirect to={"/profile"} />
      ) : (
        <Styles>
          <Card>
            <Card.Header>
              <h4>Create An Account</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => handleOnSubmit(e)}>
                <Form.Row>
                  <Form.Group as={Col} controlId="firstName">
                    <Form.Control
                      required
                      type="firstName"
                      placeholder="First Name"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="lastName">
                    <Form.Control
                      required
                      type="lastName"
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="email">
                  <Form.Control required type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group controlId="street">
                  <Form.Control required placeholder="Address: 1234 Main St" />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="city">
                    <Form.Control required placeholder="City" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="state">
                    <Form.Control required as="select" defaultValue="Choose...">
                      <option>Choose...</option>
                      {stateList.map((d, i) => (
                        <option key={`${d}-${i}`}>{d.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="zipCode">
                    <Form.Control required placeholder="ZipCode" />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="description">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Introduce yourself (optional)"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Styles>
      )}
    </>
  );
};

export default Register;

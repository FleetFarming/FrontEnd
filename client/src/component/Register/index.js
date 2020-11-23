// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import { Form, Col, Card } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../config/apiCalls.js";
import stateList from "../../assets/constants/us-states.json";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState.js";
import BodyContainer from "../BodyContainer/index.js";
import AutoComplete from "./component/AutoComplete/index.js";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import SelectCountry from "./component/SelectCountry/index.js";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
const { server, saveUser } = API;
const api_key = process.env.REACT_APP_MAP;

const Styles = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 50px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    minWidth: "35vw",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    marginLeft: "-34vw",
    transition: "margin-left 100ms linear 0s",
    // marginLeft: "-30vw",
    // justifyContent: "flex-start",
    // marginLeft: "-35vw",
  },
  rootOpen: {
    position: "absolute",
    minWidth: "35vw",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    transition: "margin-left 100ms linear 0s",
    // marginLeft: "35vw",
  },
  drawer: {
    flexGrow: 1,
    minHeight: "80vh",
    zIndex: 3,
    background: "#ffff",
    border: "1px solid gray",
  },
  drawerBtn: {
    marginTop: "100px",
    minHeight: "80vh",
    zIndex: 3,
  },
  drawerOpen: {
    position: "absolute",
    minWidth: "35vw",
    marginLeft: "35vw",
    minHeight: "80vh",
    zIndex: 3,
  },
  gridContainer: {
    display: "flex",
    padding: "20px",
    flexDirection: "column",
    textAlign: "center",
  },
  textField: {
    marginRight: "10px",
  },
  txtContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  slider: {
    padding: "10px",
  },
  margin: {
    height: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  icon: {
    background: "black",
    fill: "white",
    cursor: "pointer",
  },
}));
const Register = () => {
  const { regAddress, isLoggedIn, handleIsLoggedIn } = useContext(
    GlobalContext
  );
  console.log("regAddress inside register: ", regAddress);
  const classes = useStyles();
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
      lat: regAddress.lat,
      lng: regAddress.lng,
    };
    console.log("handleOnSubmit: ", userData);

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
        <BodyContainer>
          <Styles>
            <Card>
              <Card.Header>
                <h4>Create An Account</h4>
              </Card.Header>
              <Card.Body>
                <Grid className={classes.gridContainer} container>
                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => handleOnSubmit(e)}
                  >
                    <div className={classes.txtContainer}>
                      <TextField
                        className={classes.textField}
                        label="First Name"
                        name="firstName"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        spacing={3}
                        fullWidth
                      />
                      <TextField
                        className={classes.textField}
                        label="Last Name"
                        name="lastName"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </div>
                    <br />
                    <div className={classes.txtContainer}>
                      <TextField
                        className={classes.textField}
                        label="Email"
                        name="email"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </div>
                    <br />
                    <div className={classes.txtContainer}>
                      <TextField
                        className={classes.textField}
                        label="Password"
                        name="password"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </div>
                    <br />
                    <div className={classes.txtContainer}>
                      <AutoComplete></AutoComplete>
                      <TextField
                        className={classes.textField}
                        label="City"
                        value={regAddress.city ? regAddress.city : ""}
                        name="city"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        spacing={3}
                        // fullWidth
                      />
                    </div>
                    <br />
                    <div className={classes.txtContainer}>
                      <TextField
                        className={classes.textField}
                        label="State"
                        name="state"
                        value={regAddress.state ? regAddress.state : ""}
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        spacing={3}
                        fullWidth
                      />
                      <TextField
                        className={classes.textField}
                        label="ZipCode"
                        name="zipCode"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        spacing={3}
                        fullWidth
                      />
                    </div>
                    <br />
                    <div className={classes.txtContainer}>
                      <TextField
                        className={classes.textField}
                        label="Description"
                        name="description"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        spacing={3}
                        multiline
                        rows={6}
                        required
                        fullWidth
                      />
                    </div>
                    <br />

                    <Button
                      type="submit"
                      variant="contained"
                      size="medium"
                      color="primary"
                      className={classes.button}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </form>
                </Grid>
                {/* <Form onSubmit={(e) => handleOnSubmit(e)}>
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
                    <Form.Control
                      required
                      placeholder="Address: 1234 Main St"
                    />
                    <AutoComplete></AutoComplete>
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="city">
                      <Form.Control required placeholder="City">

                      </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="state">
                      <Form.Control
                        required
                        as="select"
                        defaultValue="Choose..."
                      >
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
                </Form> */}
              </Card.Body>
            </Card>
          </Styles>
        </BodyContainer>
      )}
    </>
  );
};

export default Register;

// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState.js";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../config/apiCalls.js";
import BodyContainer from "../BodyContainer/index.js";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import avator from "../../assets/images/5.png";

const { server, getUserProfile } = API;
const Styles = styled.div`
  .card-header {
    text-align: right;
  }
  .imageContainer {
    margin: auto;
  }
  ,& img {
    min-width: 100px;
    min-height: 100px;
  }
  ,
`;

const Profile = () => {
  const { isLoggedIn, addProfileData, profileData } = useContext(GlobalContext);
  // if (!isLoggedIn) {
  //   return <Redirect to="/" />;
  // }

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    console.log("useEffect in profile: ", localStorage, userId);
    axios
      .get(`${server}${getUserProfile}/${localStorage.userId}`)
      .then((res) => {
        console.log("profile: ", res.data[0]);
        addProfileData({ ...res.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <Redirect to="/" />
      ) : (
        <BodyContainer>
          <Styles>
            <Row>
              <Col>
                <Card>
                  <Card.Header>Edit Profile</Card.Header>
                  <Card.Body className="imageContainer">
                    <Image src={`${avator}`} roundedCircle />
                  </Card.Body>
                  <Col>
                    <ListGroup>
                      {/* <ListGroupItem>{`Username: ${profileData.profile_name}`}</ListGroupItem> */}
                      <ListGroupItem>{`Full Name: ${profileData.firstName} ${profileData.lastName}`}</ListGroupItem>
                      <ListGroupItem>{`Email: ${profileData.email}`}</ListGroupItem>
                      <ListGroupItem>{`Description: ${profileData.description}`}</ListGroupItem>
                      <ListGroupItem>{`Address: ${profileData.street_name}    ${profileData.city}    ${profileData.state}    ${profileData.zipcode}`}</ListGroupItem>
                    </ListGroup>
                  </Col>
                </Card>
              </Col>
            </Row>
          </Styles>
        </BodyContainer>
      )}
    </>
  );
};

export default Profile;

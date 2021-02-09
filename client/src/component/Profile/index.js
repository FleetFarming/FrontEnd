// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState.js";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../config/apiCalls.js";
import BodyContainer from "../BodyContainer/index.js";
import ProfileInfo from "./Component/ProfileInfo/index.js";
import Button from "@material-ui/core/Button";
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

  ,& img {
    min-width: 150px;
    min-height: 150px;
  }
  .custom_card {
    margin: auto;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .header_left {
  }
  .header_right {
    display: flex;
  }
  .profile_name {
    margin-top: 5px;
    font-size: 20px;
  }
  .edit_profile {
  }
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
                  {/* <Card.Header>Edit Profile</Card.Header> */}
                  <Card.Body className="custom_card">
                    <Row>
                      <Header>
                        <div className="header_left">
                          <Image src={`${avator}`} roundedCircle />
                          <div className="edit_profile">
                            <Button variant="outlined">Edit Profile</Button>
                          </div>
                        </div>
                        <section className="header_right">
                          <p className="profile_name"> Anait's Profile</p>
                        </section>
                      </Header>
                    </Row>
                  </Card.Body>
                  {/* <Col>
                    <ListGroup>
                      <ListGroupItem>{`Username: ${profileData.profile_name}`}</ListGroupItem>
                      <ListGroupItem>{`Full Name: ${profileData.firstName} ${profileData.lastName}`}</ListGroupItem>
                      <ListGroupItem>{`Email: ${profileData.email}`}</ListGroupItem>
                      <ListGroupItem>{`Description: ${profileData.description}`}</ListGroupItem>
                      <ListGroupItem>{`Address: ${profileData.street_name}    ${profileData.city}    ${profileData.state}    ${profileData.zipcode}`}</ListGroupItem>
                    </ListGroup>
                  </Col> */}
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Card>
                  {/* <Card.Header>Edit Profile</Card.Header> */}
                  <Card.Body>
                    <ProfileInfo />
                  </Card.Body>
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

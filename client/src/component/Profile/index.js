// eslint-disable-next-line
import React, { useEffect, useContext, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalState.js";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../config/apiCalls.js";
import BodyContainer from "../BodyContainer/index.js";
import ProfileInfo from "./Component/ProfileInfo/index.js";
import Button from "@material-ui/core/Button";
import FormData from "form-data";
import EditProfile from "./Component/EditProfile/index.js";
import Avatar from "@material-ui/core/Avatar";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import avator from "../../assets/images/5.png";
import { set } from "lodash";

const { server, getUserProfile } = API;
const Styles = styled.div`
  .card-header {
    text-align: right;
  }

  ,
  & img {
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

const Profile = (props) => {
  const { isLoggedIn, addProfileData, profileData } = useContext(GlobalContext);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentProfilePic, setCurrentProfilePic] = useState("");
  const inputFile = useRef(null);

  // if (!isLoggedIn) {
  //   return <Redirect to="/" />;
  // }
  console.log("profileData: ", profileData);

  useEffect(() => {
    const userId = props.userId ? props.userId : localStorage.getItem("userId");
    console.log("useEffect in profile: ", localStorage, userId);
    setCurrentUserId(userId);
  }, []);

  useEffect(() => {
    fetchProfileData();
    fetchProfileImage();


  }, [currentUserId]);

  const fetchProfileData = () => {
    axios
      .get(`${server}${getUserProfile}/${currentUserId}`)
      .then((res) => {
        console.log("profile: ", res.data[0]);
        addProfileData({ ...res.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchProfileImage = () => {
    axios
      .get(`${server}${API.getProfilePicture}/${currentUserId}`)
      .then((res) => {
        console.log("profile image ", res);
        setCurrentProfilePic(res.data[0].photo_url);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUploadImage = () => {
    inputFile.current.click();
    let data = new FormData();
  };

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
                          <Avatar
                            style={{ width: "20vh", height: "20vh" }}
                            src={currentProfilePic}
                          />
                        </div>
                        <section className="header_right">
                          <p className="profile_name">{`${profileData.profile_name}'s profile`}</p>
                        </section>
                        <div className="edit_profile">
                          {/* <Button variant="outlined" onClick={handleUploadImage}>
                            Change Profile
                            <input ref={inputFile} type="file" hidden onChange={onImageChange} />
                          </Button> */}
                          <EditProfile fetchProfileImage={fetchProfileImage} profileData={profileData}></EditProfile>
                        </div>
                      </Header>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Card>
                  {/* <Card.Header>Edit Profile</Card.Header> */}
                  <Card.Body>
                    <ProfileInfo profileData={profileData} fetchProfileImage={fetchProfileImage}/>
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

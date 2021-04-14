import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../config/apiCalls.js";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Redirect, useHistory } from "react-router-dom";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ComposeMsg from "../ComposeMsg/index.js"
import "./styles.css";
const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  .chip {
    margin: 5px;
  }
`;

const UserPage = (props) => {
  const { userInfo, setViewUser, miniProfileData } = props;
  const [photos, setPhotos] = useState([]);
  const [bigPhoto, setBigPhoto] = useState([]);
  let history = useHistory();

  const redirect = (userId) => {
    const loginUserId = localStorage.getItem("userId");
    console.log("inside redirect: ", loginUserId, userId , loginUserId===userId)
    parseInt(userId) === parseInt(loginUserId)
      ? history.push("/Profile")
      : history.push(`/guestProfile/${userId}`);
  };

  const fetchGallery = (userId) => {
    const URL = `${API.server}${API.getGallery}/${userId}`;
    axios.get(URL).then((res) => {
      console.log("fetchGallery: ", res.data);
      const images = prepareImages(res.data);
      const bigImg = [];
      bigImg.push(images[0]);

      setPhotos(images.slice(1, 6));
      setBigPhoto(bigImg);
      console.log("bigImg: ", bigImg, images);
    });
  };

  useEffect(() => {
    const userId = miniProfileData.user_id;
    fetchGallery(userId);
  }, []);

  const prepareImages = (images) => {
    let temp = images.map((d, i) => {
      return {
        src: d.photo_url,
        thumbnail: d.photo_url,
        thumbnailWidth: 30,
        thumbnailHeight: 20,
      };
    });
    return temp;
  };

  return (
    <div className="info__container">
      <div className="info__row">
        <div style={{ cursor: "pointer" }} onClick={() => setViewUser(false)}>
          <KeyboardBackspaceIcon /> Go Back
        </div>
        <Divider style={{ marginBottom: "10px" }}></Divider>
      </div>
      <div className="info__row gallery">
        {photos.length > 0 ? (
          photos.map((d, i) => (
            <figure
              key={`gallery_item${i}`}
              className={`gallery__item gallery__item__${i + 1}`}
            >
              <img src={d.src} />
            </figure>
          ))
        ) : (
          <div> "Found no photos" </div>
        )}
      </div>
      <div
        className="info__row"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          style={{ margin: "10px" }}
          color="primary"
          variant="contained"
          size="medium"
          type="submit"
          fullWidth
          onClick={() => redirect(miniProfileData.user_id)}
        >
          View Profile
        </Button>
        {/* <Button
          style={{ margin: "10px" }}
          color="primary"
          variant="contained"
          size="medium"
          type="submit"
          fullWidth
        >
          Message
        </Button> */}
        <ComposeMsg profileData={miniProfileData}></ComposeMsg>
      </div>
      <Divider style={{ marginBottom: "10px" }}></Divider>
      <div className="info__row">
        <div>{miniProfileData.profile_name}'s farm</div>
        <div style={{ fontSize: "12px", padding: "10px 0px 10px 0px" }}>
          Founded in June 2020
        </div>
      </div>
      <Divider style={{ marginBottom: "10px" }}></Divider>
      <div className="info__row">
        {" "}
        <div>Background</div>
        <div style={{ fontSize: "12px", padding: "10px 0px 10px 0px" }}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum
        </div>
      </div>
      <Divider style={{ marginBottom: "10px" }}></Divider>
      <div className="info__row">
        <div>Available Crops</div>
        <ChipContainer style={{ margin: "15px 0px 15px 0px" }}>
          <Chip className="chip" size="small" label="Carrots" />
          <Chip className="chip" size="small" label="Tomatoes" />
          <Chip className="chip" size="small" label="Green Onions" />
          <Chip className="chip" size="small" label="Basils" />
          <Chip className="chip" size="small" label="Potatoes" />
          <Chip className="chip" size="small" label="Cabbage" />
        </ChipContainer>
      </div>
      <Divider style={{ marginBottom: "10px" }}></Divider>
      <div className="info__row">
        {" "}
        <div>How to Contact</div>
        <div style={{ fontSize: "12px", padding: "10px 0px 10px 0px" }}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor Contrary
          to popular belief, Lorem Ipsum is not simply random text. It has roots
          in a piece of classical Latin literature from 45 BC, making it over
          2000 years old. Richard McClintock, a Latin professor
        </div>
      </div>
      <Divider style={{ marginBottom: "10px" }}></Divider>
    </div>
  );
};

export default UserPage;

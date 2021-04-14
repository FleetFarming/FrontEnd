import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CreateIcon from "@material-ui/icons/Create";
import AlertBox from "../../../AlertBox/index.js";
import axios from "axios";
import { API } from "../../../../config/apiCalls.js";

const Container = styled.div`
  border-bottom: 1px solid lightgray;
`;

const Recipient = styled.input`
  flex: 0.5;
  margin-bottom: 0.5rem;
  height: 30px;
`;

const ComposeMsg = (props) => {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [showPop, setShowPop] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { profileData } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setShowPop(false);
    setShowError(false);
    setShowSuccess(false);
  };

  const handleSendMessage = (e) => {
    console.log("handleSendMessage", recipient, description, subject);
    // const {body, subject, recipient, isNewConversation} = req.body

    const newObj = {
      body: description,
      subject: subject,
      recipient: recipient,
      isNewConversation: true,
      recipientId: profileData.user_id,
      conversationId: null,
    };
    setShowPop(true);
    let userId = localStorage.getItem("userId");
    console.log("inside composeMsg ", profileData, newObj);
    axios
      .post(`${API.server}${API.createMessage}/${userId}`, newObj)
      .then((res) => {
        console.log("Success in Sending Message", res);
        setTimeout(() => {
          setShowPop(false);
          setShowError(false);
          setShowSuccess(true);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error in Sending Message: ", error);
        setTimeout(() => {
          setShowPop(false);
          setShowError(true);
          setShowSuccess(false);
        }, 3000);
      });
  };

  const handleOnChangeInput = (e) => {
    console.log("handleONchangeInput: ", e.target.name);
    let input = e.target.name;
    let value = e.target.value;
    switch (input) {
      case "recipient":
        setRecipient(value);
        break;
      case "subject":
        setSubject(value);
        break;
      case "description":
        setDescription(value);
        break;
    }
  };

  return (
    <>
      {/* <div className="message__btn"> */}
      <Button
        style={{ margin: "10px" }}
        color="primary"
        variant="contained"
        size="medium"
        type="submit"
        fullWidth
        onClick={handleClickOpen}
      >
        Message
      </Button>
      {/* </div> */}
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="lg">
        <Container>
          <DialogTitle id="form-dialog-title">Compose Message</DialogTitle>
        </Container>
        <DialogContent>
          <div className="message__compose">
            <div className=" message__compose__item message__recipient">
              <label>To:</label>
              <input
                type="text"
                name="recipient"
                disabled
                value={profileData.profile_name}
                onChange={handleOnChangeInput}
              />
            </div>
            <div className=" message__compose__item message__subject">
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                onChange={handleOnChangeInput}
              />
            </div>
          </div>
          <TextareaAutosize
            rowsMin={5}
            name="description"
            className="message__textarea"
            onChange={handleOnChangeInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <AlertBox
        showPop={showPop}
        showSuccess={showSuccess}
        showError={showError}
        handleCloseAlert={handleCloseAlert}
      />
    </>
  );
};

export default ComposeMsg;

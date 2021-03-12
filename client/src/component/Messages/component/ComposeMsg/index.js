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

const Container = styled.div`
  border-bottom: 1px solid lightgray;
`;

const Recipient = styled.input`
  flex: 0.5;
  margin-bottom: 0.5rem;
  height: 30px;
`;

const ComposeMsg = () => {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [showPop, setShowPop] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSucess, setShowSucess] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleCloseAlert = () => {
    setShowPop(false);
    setShowError(false);
    setShowSucess(false);
  }

  const handleSendMessage = (e) => {
    console.log("handleSendMessage", recipient, description, subject);
    setShowPop(true);
    setTimeout(() => {
      setShowPop(false);
      setShowError(false);
      setShowSucess(true);
    }, 3000);


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
    <div>
      <div className="message__btn">
        <Button variant="outlined" onClick={handleClickOpen}>
          <CreateIcon></CreateIcon>
        </Button>
      </div>
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
        showSucess={showSucess}
        showError={showError}
        handleCloseAlert={handleCloseAlert}
      />
    </div>
  );
};

export default ComposeMsg;

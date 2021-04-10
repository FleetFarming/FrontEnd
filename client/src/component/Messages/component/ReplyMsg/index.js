import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ReplyIcon from "@material-ui/icons/Reply";
import AlertBox from "../../../AlertBox/index.js";
import { API } from "../../../../config/apiCalls.js";
import axios from "axios";

const ReplyMsg = (props) => {
  const { cacheData, profileName } = props;
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
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
  };
  const handleOnChangeInput = (e) => {
    console.log("handleONchangeInput: ", e.target.name);

    let value = e.target.value;
    setDescription(value);
    console.log("des: ", value);
  };

  const handleReplyMsg = (e) => {
    // const {body, subject, recipient, isNewConversation} = req.body
    console.log("cache: ", cacheData, profileName);
    const newObj = {
      // body: cacheData.,
      body: description,
      subject: cacheData.subject,
      recipient:
        cacheData.recipient_name === profileName
          ? cacheData.sender_name
          : cacheData.recipient_name,
      isNewConversation: false,
    };

    let userId = localStorage.getItem("userId");
    console.log("hello : ", newObj);
    setShowPop(true);
    axios
      .post(`${API.server}${API.createMessage}/${userId}`, newObj)
      .then((res) => {
        console.log("Success in Sending Message", res);
        setTimeout(() => {
          setShowPop(false);
          setShowError(false);
          setShowSucess(true);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error in Sending Message: ", error);
        setTimeout(() => {
          setShowPop(false);
          setShowError(true);
          setShowSucess(false);
        }, 3000);
      });

    // setShowPop(true);
    // setTimeout(() => {
    //   setShowPop(false);
    //   setShowError(false);
    //   setShowSucess(true);
    // }, 3000);
  };

  return (
    <div>
      <div className="message__btn">
        <Button variant="outlined" onClick={handleClickOpen}>
          <ReplyIcon />
        </Button>
      </div>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="lg">
        <DialogTitle id="form-dialog-title">Reply Message</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            rowsMin={5}
            className="message__textarea"
            onChange={handleOnChangeInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReplyMsg} color="primary">
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

export default ReplyMsg;

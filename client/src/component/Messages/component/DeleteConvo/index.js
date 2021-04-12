import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AlertBox from "../../../AlertBox/index.js";
import { API } from "../../../../config/apiCalls.js";
import axios from "axios";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const DeleteMsg = (props) => {
  const { cacheData, profileName } = props;
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [showPop, setShowPop] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
  const handleOnChangeInput = (e) => {
    console.log("handleONchangeInput: ", e.target.name);

    let value = e.target.value;
    setDescription(value);
    console.log("des: ", value);
  };

  const handleDeleteMsg = (e) => {
    // const {body, subject, recipient, isNewConversation} = req.body
    console.log("cache: ", cacheData, profileName);
    const newObj = {
      // body: cacheData.,
      // body: description,
      // subject: cacheData.subject,
      // recipient:
      //   cacheData.recipient_name === profileName
      //     ? cacheData.sender_name
      //     : cacheData.recipient_name,
      // isNewConversation: false,
      // conversationId: cacheData.conversation_id,
      // recipientId: cacheData.recipient_id,
      messageId: cacheData.message_id
    };

    let userId = localStorage.getItem("userId");
    console.log("hello : ", newObj);
    setShowPop(true);
    axios
      .post(`${API.server}${API.deleteMessage}/${userId}`, newObj)
      .then((res) => {
        console.log("Success in Delete Message", res);
        setTimeout(() => {
          setShowPop(false);
          setShowError(false);
          setShowSuccess(true);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error in Delete Message: ", error);
        setTimeout(() => {
          setShowPop(false);
          setShowError(true);
          setShowSuccess(false);
        }, 3000);
      });

    setShowPop(true);
    setTimeout(() => {
      setShowPop(false);
      setShowError(false);
      setShowSuccess(true);
    }, 3000);
  };

  return (
    <div>
      <div className="message__btn">
        <Button variant="outlined" onClick={handleClickOpen}>
          <DeleteForeverIcon />
        </Button>
      </div>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="lg">
        <DialogTitle id="form-dialog-title">Delete Message</DialogTitle>
        <DialogContent>
          <p>Are you sure, you want to delete this message?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteMsg} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <AlertBox
        showPop={showPop}
        showSuccess={showSuccess}
        showError={showError}
        handleCloseAlert={handleCloseAlert}
      />
    </div>
  );
};

export default DeleteMsg;

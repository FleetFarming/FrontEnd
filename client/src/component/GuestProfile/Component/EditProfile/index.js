import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormData from "form-data";
import axios from "axios";
import {API} from "../../../../config/apiCalls.js";
import AlertBox from "../../../AlertBox/index.js";


export default function FormDialog(props) {
  const [showPop, setShowPop] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { profileData, fetchProfileImage } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [label, setLabel] = useState("Upload your image");
  const inputFile = useRef(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowPop(false);
    setShowSuccess(false);
    setShowError(false);
  };

  const onImageChange = (e) => {
    console.log("onImageChange: ", e.target.files[0]);
    const file = e.target.files[0];
    setSelectedFile(file);
    setLabel(file.name);
  };

  const handleUploadImage = () => {
    inputFile.current.click();
    // let data = new FormData();
  };

  const handleSaveImage = () => {
    const data = new FormData();
    if (!selectedFile) return;
    data.append("image", selectedFile);
    data.append("profilePicture", 1);
    console.log("saving profile image: ", selectedFile, data);

    setShowPop(true);
    axios.post(`${API.server}${API.saveImage}/${profileData.user_id}`, data).then(res => {
      console.log("res: ", res)
      setTimeout(() => {
        setShowPop(false);
        setShowSuccess(true);
        setShowError(false);
      }, 1000);
      fetchProfileImage();

    }).catch(e => {
      setTimeout(() => {
        setShowPop(false);
        setShowSuccess(false);
        setShowError(true);
      }, 1000);
    })
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={"sm"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <label style={{ fontSize: "13px", paddingRight: "10px" }}>
              {label}
            </label>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleUploadImage}
            >
              select file
            </Button>
            <input
              ref={inputFile}
              type="file"
              hidden
              onChange={onImageChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveImage} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      <AlertBox
        showPop={showPop}
        showSuccess={showSuccess}
        showError={showError}
        handleCloseAlert={handleClose}
      />
    </div>
  );
}

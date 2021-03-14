import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

 const AlertBox = (props) => {
  const [open, setOpen] = useState(false);
  // const [showPop, setShowPop] = useState(false);
  // const [showError, setShowError] = useState(false);
  // const [showSucess, setShowSucess] = useState(false);
  const{showPop, showSucess, showError, handleCloseAlert} = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={showPop}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please Wait..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Loading...
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showSucess}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The message has been sent!!
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showError}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Error in sending email!!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AlertBox;
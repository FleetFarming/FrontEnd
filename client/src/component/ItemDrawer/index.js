import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";
import DoubleArrowRounded from "@material-ui/icons/DoubleArrowRounded";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ItemLists from "../ItemLists/index.js";

const marks = [
  {
    value: 0,
    label: "0 mile",
  },
  {
    value: 20,
    label: "20 mile",
  },
  {
    value: 37,
    label: "37 mile",
  },
  {
    value: 100,
    label: "100 mile",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    minWidth: "35vw",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    marginLeft: "-34vw",
    transition: "margin-left 100ms linear 0s",
    // marginLeft: "-30vw",
    // justifyContent: "flex-start",
    // marginLeft: "-35vw",
  },
  rootOpen: {
    position: "absolute",
    minWidth: "35vw",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    transition: "margin-left 100ms linear 0s",
    // marginLeft: "35vw",
  },
  drawer: {
    flexGrow: 1,
    minHeight: "80vh",
    zIndex: 3,
    background: "#ffff",
    border: "1px solid gray",
  },
  drawerBtn: {
    marginTop: "100px",
    minHeight: "80vh",
    zIndex: 3,
  },
  drawerOpen: {
    position: "absolute",
    minWidth: "35vw",
    marginLeft: "35vw",
    minHeight: "80vh",
    zIndex: 3,
  },
  gridContainer: {
    display: "flex",
    padding: "20px",
    flexDirection: "column",
    textAlign: "center",
  },
  textField: {
    marginRight: "10px",
  },
  txtContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  slider: {
    padding: "10px",
  },
  margin: {
    height: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  icon: {
    background: "black",
    fill: "white",
    cursor: "pointer",
  },
}));

function valuetext(value) {
  return `${value}mil`;
}

const ItemDrawer = () => {
  const [open, setOpen] = useState(true);
  const [mile, setMile] = useState(0);
  const classes = useStyles();

  const toogleDrawer = () => {
    setOpen(!open);
  };

  const handleMiles = (value) => {
    setMile(value);
    return `${value}mile`;
  };

  return (
    <div className={!open ? classes.root : classes.rootOpen}>
      <div className={classes.drawer}>
        <Grid className={classes.gridContainer} container>
          <form noValidate autoComplete="off">
            <div className={classes.txtContainer}>
              <TextField
                className={classes.textField}
                label="Category"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                spacing={3}
                fullWidth
              />
              <TextField
                className={classes.textField}
                label="Location"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <br />
            <div className={classes.txtContainer}>
              <TextField
                className={classes.textField}
                label="Farm Name"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                fullWidth
              />
              <TextField
                className={classes.textField}
                label="Crop"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className={classes.slider}>
              <Typography
                style={{ textAlign: "right" }}
                id="discrete-slider-always"
                gutterBottom
              >
                {`< ${mile} miles`}
              </Typography>
              <Slider
                defaultValue={10}
                getAriaValueText={handleMiles}
                aria-labelledby="discrete-slider-always"
                step={10}
                valueLabelDisplay="auto"
              />
            </div>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className={classes.button}
              fullWidth
            >
              Search
            </Button>
          </form>
          <Divider style={{ marginBottom: "10px" }}></Divider>
          <div>
            <ItemLists></ItemLists>
          </div>
        </Grid>
      </div>
      <div className={classes.drawerBtn}>
        {/* <Button
          onClick={toogleDrawer}
          style={{ background: "rgba(0, 0, 0, 0.87)", padding:"none" }}
        > */}
        <div onClick={toogleDrawer}>
          {!open ? (
            <DoubleArrowRounded className={classes.icon} />
          ) : (
            <MenuOpenRoundedIcon className={classes.icon} />
          )}
        </div>
        {/* </Button> */}
      </div>
    </div>
  );
};

export default ItemDrawer;

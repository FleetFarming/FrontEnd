// eslint-disable-next-line
import React, { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";
import DoubleArrowRounded from "@material-ui/icons/DoubleArrowRounded";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ItemLists from "../ItemLists/index.js";
import { GlobalContext } from "../../context/GlobalState.js";
import { filterMapData } from "./helper.js";
import data from "../Map/data.json";
import UserPage from "./component/UserPage/index.js";

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
    maxWidth: "35vw",
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
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginRight: "10px",
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
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mile, setMile] = useState(0);
  const [miniProfileData, setMiniProfileData] = useState([]);
  const [viewUser, setViewUser] = useState(false);
  const {
    initialMapData,
    getMapData,
    isLoggedIn,
    currMapData,
    setCurMapData,
  } = useContext(GlobalContext);
  const [tempCurr, setTempCurr] = useState([]);
  const [tempCurr1, setTempCurr1] = useState([]);
  const toogleDrawer = () => {
    setOpen(!open);
  };

  const handleMiles = (value) => {
    setMile(value);
    return `${value}mile`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, location, farmName, crop } = e.target;
    const keywords = {
      category: category.value,
      location: location.value,
      farmName: farmName.value,
      crop: crop.value,
    };
    const result = filterMapData(tempCurr, keywords);
    setTempCurr1(result);
    console.log("after search", result);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setTempCurr1(tempCurr);
  };

  useEffect(() => {
    console.log("wtf is that ", currMapData);
    let tempData1 = data.features.map((d) => {
      let rand = Math.floor(Math.random() * (8 - 1) + 1);
      d.img = `./dummyList/${rand}.jpg`;
      d.author = d.properties.NAME.slice(0, 7);
      d.title = `${d.properties.NAME.slice(0, 7)}'s farm`;
      return { ...d };
    });
    let tempData2 = currMapData.map((d) => {
      let rand = Math.floor(Math.random() * (8 - 1) + 1);
      d.img = `./dummyList/${rand}.jpg`;
      d.author = d.firstName;
      d.title = `${d.firstName}'s farm`;
      return { ...d };
    });
    let final = [...tempData2, ...tempData1];
    console.log("final in itemList: ", final);
    setTempCurr(final);
    setTempCurr1(final.map((d) => ({ ...d })));
  }, [currMapData]);

  return (
    <div className={!open ? classes.root : classes.rootOpen}>
      <div className={classes.drawer}>
        {viewUser ? (
          <UserPage
            setViewUser={setViewUser}
            miniProfileData={miniProfileData}
          />
        ) : (
          <Grid className={classes.gridContainer} container>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={classes.txtContainer}>
                <TextField
                  className={classes.textField}
                  label="Category"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  spacing={3}
                  name="category"
                  fullWidth
                />
                <TextField
                  className={classes.textField}
                  label="Location"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  name="location"
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
                  name="farmName"
                  fullWidth
                />
                <TextField
                  className={classes.textField}
                  label="Crop"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  name="crop"
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
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  fullWidth
                >
                  Search
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  fullWidth
                  onClick={(e) => handleReset(e)}
                >
                  Reset
                </Button>
              </div>
            </form>
            <Divider style={{ marginBottom: "10px" }}></Divider>
            <div>
              <ItemLists
                tempCurr1={tempCurr1}
                setViewUser={setViewUser}
                setMiniProfileData={setMiniProfileData}
              ></ItemLists>
            </div>
          </Grid>
        )}
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

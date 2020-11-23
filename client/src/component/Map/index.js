// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import ItemDrawer from "../ItemDrawer/index.js";
import data from "./data.json";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { GlobalContext } from "../../context/GlobalState.js";
console.log("dummyData: ", data)

const api_key = process.env.REACT_APP_MAP;
const libraries = ["places"];
const mapContainerStyle = {
  width: "95vw",
  height: "92vh",
};
const center = {
  lat: 43.653225,
  lng: -79.383186,
};
const options = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Map = (props) => {
  const {
    initialMapData,
    getMapData,
    isLoggedIn,
    currMapData,
    setCurMapData,
  } = useContext(GlobalContext);
  const [markers, setMarkers] = useState({});


  const [mapSize, setMapSize] = useState(mapContainerStyle);
  const classes = useStyles();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: api_key,
    libraries,
  });

  useEffect(() => {
    console.log("data: ", data);
    getMapData();
    console.log("getMapdata in map useEffect: ", initialMapData);
  }, []);

  useEffect(() => {
    console.log("data: ", data);
    setMarkers(data);
    setCurMapData(initialMapData);
  }, [initialMapData, currMapData]);

  useEffect(() => {
    console.log(" isLoggedIn", isLoggedIn);
    let temp = { ...mapSize };
    if (isLoggedIn) {
      temp.width = "95vw";
    } else {
      temp.width = "99vw";
    }
    setMapSize({ ...temp });
    console.log("setMapSize: ", temp);
  }, [isLoggedIn]);

  if (loadError) return "Error In Loading Map";
  if (!isLoaded) return "Loading Maps";

  const generateMaker = () => {
    let temp = markers.features.map((d, i) => (
      <Marker
        key={`${d.properties.PARK_ID}_${i}`}
        position={{
          lat: d.geometry.coordinates[1],
          lng: d.geometry.coordinates[0],
        }}
      ></Marker>
    ));
    console.log("curMapData: ", currMapData);
    let temp2 =
      currMapData.length > 0
        ? currMapData.map((d, i) => (
            <Marker
              key={`user_${i}`}
              position={{
                lat: parseFloat(d.lat),
                lng: parseFloat(d.lng),
              }}
            ></Marker>
          ))
        : "";
    return [...temp, ...temp2];
  };

  return (
    <div className={classes.root}>
      <ItemDrawer
        className={classes.itemDrawer}
        currMapData={generateMaker()}
      ></ItemDrawer>
      <GoogleMap mapContainerStyle={mapSize} zoom={8} center={center}>
        {/* {markers.features.map((d, i) => (
          <Marker
            key={`${d.properties.PARK_ID}_${i}`}
            position={{
              lat: d.geometry.coordinates[1],
              lng: d.geometry.coordinates[0],
            }}
          ></Marker>
        ))}
        {currMapData
          ? currMapData.map((d, i) => (
              <Marker
                key={`user_${i}`}
                position={{
                  lat: d.lat,
                  lng: d.lng,
                }}
              ></Marker>
            ))
          : ""} */}
        {generateMaker()}
      </GoogleMap>
    </div>
  );
};

export default Map;

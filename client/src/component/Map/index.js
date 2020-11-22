// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import ItemDrawer from "../ItemDrawer/index.js";
import Toolbar from "@material-ui/core/Toolbar";
import data from "./data.json";
import { makeStyles, useTheme } from "@material-ui/core/styles";
const api_key = process.env.REACT_APP_MAP;
const libraries = ["places"];
const mapContainerStyle = {
  width: "99vw",
  height: "92vh",
};
const center = {
  lat: 43.653225,
  lng: -79.383186,
};
const options = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

}))

const Map = (props) => {
  const [markers, setMarkers] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: api_key,
    libraries,
  });
  const classes = useStyles()
  useEffect(() => {
    console.log("data: ", data);
    setMarkers(data);
  }, []);

  if (loadError) return "Error In Loading Map";
  if (!isLoaded) return "Loading Maps";

  return (
      <div className={classes.root}>
        <ItemDrawer className={classes.itemDrawer}></ItemDrawer>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
        >
          {markers.features.map((d) => (
            <Marker
              key={d.properties.PARK_ID}
              position={{
                lat: d.geometry.coordinates[1],
                lng: d.geometry.coordinates[0],
              }}
            ></Marker>
          ))}
        </GoogleMap>
      </div>
  );
};

export default Map;

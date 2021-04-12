// eslint-disable-next-line
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import MailOutline from "@material-ui/icons/MailOutline";
import { GlobalContext } from "../../context/GlobalState.js";
import data from "../Map/data.json";
// Math.floor(Math.random() * (8 - 1) + 1)
const tileData = [
  {
    img: "./dummyList/1.jpg",
    title: "title one",
    author: "author 1",
    cols: 1,
  },
  {
    img: "./dummyList/7.jpg",
    title: "title one",
    author: "author 1",
    cols: 2,
  },
  {
    img: "./dummyList/3.jpg",
    title: "title one",
    author: "author 1",
    cols: 3,
  },
  {
    img: "./dummyList/6.jpg",
    title: "title one",
    author: "author 1",
    cols: 1,
  },
  {
    img: "./dummyList/2.jpg",
    title: "title one",
    author: "author 1",
  },
  {
    img: "./dummyList/5.jpg",
    title: "title one",
    author: "author 1",
    cols: 1,
  },
  {
    img: "./dummyList/1.jpg",
    title: "title one",
    author: "author 1",
    cols: 2,
  },
  {
    img: "./dummyList/6.jpg",
    title: "title one",
    author: "author 1",
    cols: 3,
  },
  {
    img: "./dummyList/5.jpg",
    title: "title one",
    author: "author 1",
    cols: 1,
  },
  {
    img: "./dummyList/2.jpg",
    title: "title one",
    author: "author 1",
    cols: 2,
  },
  {
    img: "./dummyList/6.jpg",
    title: "title one",
    author: "author 1",
    cols: 3,
  },
  {
    img: "./dummyList/2.jpg",
    title: "title one",
    author: "author 1",
    cols: 3,
  },
  {
    img: "./dummyList/6.jpg",
    title: "title one",
    author: "author 1",
    cols: 1,
  },
  {
    img: "./dummyList/7.jpg",
    title: "title one",
    author: "author 1",
    cols: 1,
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: 'space-around',
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  gridList: {
    width: "30vw",
    height: "67vh",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  img: {
    cursor: "pointer",
  },
}));

const ItemLists = (props) => {
  const classes = useStyles();
  const { tempCurr1, setViewUser, setMiniProfileData } = props;

  const handleOnClick = (data)  => {
    console.log("image: ", data)
    setViewUser(true);
    setMiniProfileData(data);
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={3}>
        {tempCurr1.length > 0
          ? tempCurr1.map((tile, i) => (
              <GridListTile key={`${tile.img}_${i}`} cols={1}>
                <img
                  className={classes.img}
                  src={tile.img}
                  alt={tile.title}
                  onClick={() => handleOnClick(tile)}
                />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>by: {tile.author}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${tile.title}`}
                      className={classes.icon}
                    >
                      <MailOutline />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))
          : ""}
      </GridList>
    </div>
  );
};

export default ItemLists;

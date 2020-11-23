import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Button from "@material-ui/core/Button";
import MailIcon from "@material-ui/icons/Mail";
import { GlobalContext } from "../../context/GlobalState.js";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    marginTop: "7vh",
  },
  menuItem: {
    flexGrow: 1,
  },
  button: {
    color: "white",
  },
}));

const SideNav = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { isLoggedIn, handleIsLoggedIn } = useContext(GlobalContext);
  console.log("Props: ", props);
  const handleLogOut = (e) => {
    e.preventDefault();
    handleIsLoggedIn(false);
    return <Redirect to="/" />;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.clear();
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {Boolean(isLoggedIn) ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ""
          )}
          <Typography className={classes.menuItem} variant="h6" noWrap>
            Fleet Farming
          </Typography>
          {Boolean(isLoggedIn) ? (
            <>
              <Button color="parimary">
                <Link to="/profile">
                  <Typography className={classes.button}>Profile</Typography>
                </Link>
              </Button>
              <Button color="parimary">
                <Link to="/myfarm">
                  <Typography className={classes.button}>My Farm</Typography>
                </Link>
              </Button>
              <Button color="parimary" className={classes.button}>
                <Link to="/map">
                  <Typography className={classes.button}>Map</Typography>
                </Link>
              </Button>
              <Button color="parimary">
                <Link to="/messages">
                  <Typography className={classes.button}>Messages</Typography>
                </Link>
              </Button>
              <Button color="parimary">
                <Link to="/" onClick={handleLogOut}>
                  <Typography className={classes.button}>Log Out</Typography>
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="parimary">
                <Link to="/home">
                  <Typography className={classes.button}>Home</Typography>
                </Link>
              </Button>
              <Button color="parimary">
                <Link to="/map">
                  <Typography className={classes.button}>Map</Typography>
                </Link>
              </Button>
              <Button color="parimary" className={classes.button}>
                <Link to="/login">
                  <Typography className={classes.button}>Login</Typography>
                </Link>
              </Button>
              <Button color="parimary">
                <Link to="/register">
                  <Typography className={classes.button}>Register</Typography>
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {Boolean(isLoggedIn) === true ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
      ) : (
        ""
      )}
      {/* <Toolbar></Toolbar> */}
      <main className={classes.content}>
        <div className={classes.toolbar}>{props.children}</div>
      </main>
    </div>
  );
};

export default SideNav;

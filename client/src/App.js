import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./component/NavBar/index.js";
import SideNav from "./component/SideNav/index.js";
import Home from "./component/Home/index.js";
import Login from "./component/Login/index.js";
import Register from "./component/Register/index.js";
import Map from "./component/Map/index.js";
import Profile from "./component/Profile/index.js";
import MyFarm from "./component/MyFarm/index.js";
import Message from "./component/Messages/index.js";
import { GlobalProvider } from "./context/GlobalState.js";
import { AuthRoute } from "./component/AuthRoute/index.js";
import BodyContainer from "./component/BodyContainer/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      {/* <Layout> */}
      <GlobalProvider>
        <Router>
          <SideNav>
            <Switch>
              <Route path="/" exact component={Home} />
              <AuthRoute path="/home" render={Home} type="private"></AuthRoute>
              <AuthRoute path="/login" type="guest">
                <Login />
              </AuthRoute>
              <AuthRoute path="/profile" type="private">
                <Profile />
              </AuthRoute>
              <AuthRoute path="/myFarm" type="private">
                <MyFarm />
              </AuthRoute>
              <AuthRoute path="/messages" type="private">
                <Message />
              </AuthRoute>
              <Route path="/register" component={Register} />
              <Route path="/map" component={Map} />
            </Switch>
          </SideNav>
        </Router>
      </GlobalProvider>

      {/* </Layout> */}
    </>
  );
}

export default App;

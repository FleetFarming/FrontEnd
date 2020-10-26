import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./component/NavBar/index.js";
import Home from "./component/Home/index.js";
import Login from "./component/Login/index.js";
import Register from "./component/Register/index.js";
import Profile from "./component/Profile/index.js";
import { Container } from "react-bootstrap";
import { GlobalProvider } from "./context/GlobalState.js";
import { AuthRoute } from "./component/AuthRoute/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      {/* <Layout> */}
      <GlobalProvider>
        <Router>
          <NavigationBar />
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <AuthRoute path="/home" render={Home} type="private"></AuthRoute>
              <AuthRoute path="/login" type="guest">
                <Login/>
              </AuthRoute>
              <AuthRoute path="/profile" type="private">
                <Profile/>
              </AuthRoute>
              <Route path="/register" component={Register} />
            </Switch>
          </Container>
        </Router>
      </GlobalProvider>

      {/* </Layout> */}
    </>
  );
}

export default App;

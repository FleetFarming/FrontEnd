import React from "react";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
const BodyContainer = (props) => {
  return (
    <Container maxWidth="lg">
      <Toolbar />
      {props.children}
    </Container>
  );
};

export default BodyContainer;

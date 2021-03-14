import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import avator from "../../assets/images/5.png";
import "./style.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import ReplyMsg from "./component/ReplyMsg/index.js";
import ComposeMsg from "./component/ComposeMsg/index.js";

/*
  message__left
    search__bar
     list__of__email

*/
const Container = styled.div`
  border-bottom: 2px solid lightgray;
`;

const Message = () => {
  return (
    <div className="message__container">
      <div className="message__left">
        <Container>
          <div className="message__search">
            <input type="text"></input>
            <SearchIcon />
          </div>
        </Container>
        <div className="message__email">
          <img src={avator} />
          <div>
            <div className={"message__email__name"}>Mike</div>
            <div className={"message__email__title"}>Meeting Schedule</div>
            <div> hi my name is mike, I would like to...</div>
          </div>
        </div>
      </div>
      <div className="message__right">
        <Container>
          <div className="message__actionContainer">
            <ComposeMsg></ComposeMsg>
            <ReplyMsg></ReplyMsg>
            <div className="message__btn">
              <Button variant="outlined">
                <DeleteForeverIcon />
              </Button>
            </div>
          </div>
        </Container>
        <Container>
          <div className="message__title">This is message title</div>
        </Container>

        <div className="message__body">
          <div className="message__body__header">
            <img src={avator} />
            <div>Mike</div>
            <div>March 10, 2021 at 1:05pm</div>
          </div>
          <div className="message__text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

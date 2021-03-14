import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import avator from "../../assets/images/5.png";
import "./style.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import ReplyMsg from "./component/ReplyMsg/index.js";
import ComposeMsg from "./component/ComposeMsg/index.js";
import MessageBody from "./component/MessageBody/index.js";
import axios from "axios";
import { API } from "../../config/apiCalls.js";
/*
  message__left
    search__bar
     list__of__email

*/
const Container = styled.div`
  border-bottom: 2px solid lightgray;
`;

const Message = () => {
  const [totalMsg, setTotalMsg] = useState([]);
  const [currectMsgs, setCurrectMsgs] = useState([]);
  // useEffect(() => {
  //   generateMessages(totalMsg)
  // },[])

  const generateMessages = (data) => {
    const messages = data.map((d) => {
      const { sender_name, recipient_name, send_date, message } = d;
      return (
        <MessageBody
          avator={avator}
          senderName={sender_name}
          recipientName={recipient_name}
          sendDate={send_date}
          message={message}
        />
      );
    });
    console.log("inside generate message", messages)
    setCurrectMsgs(messages)
  };

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    console.log("inside messages useEffect");
    axios
      .get(`${API.server}${API.getMessages}/${userId}`)
      .then((res) => {
        console.log("fetch messages: ", res.data);
        const initialData = res.data.map((d) => ({ ...d }))
        setTotalMsg(initialData);
        generateMessages(initialData.map(d => ({...d})));
      })
      .catch((err) => {
        console.log("error in fetching messages: ", err);
      });
  }, []);

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
        {currectMsgs}
      </div>
    </div>
  );
};

export default Message;

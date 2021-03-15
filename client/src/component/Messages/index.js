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
import uniq from "lodash/uniq";
/*
  message__left
    search__bar
     list__of__email

*/
const Container = styled.div`
  border-bottom: 2px solid lightgray;
`;

const Message = () => {
  const [initData, setInitData] = useState([]);
  const [currectMsgs, setCurrectMsgs] = useState([]);
  const [totalConversation, setTotalConversation] = useState([]);
  const [curConversationId, setCurConversationId] = useState(null);
  const [curSubject, setCurSubject] = useState(null);
  const [cacheData, setCacheData] = useState({});
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
    setCurrectMsgs(messages);
  };

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    console.log("inside messages useEffect");
    axios
      .get(`${API.server}${API.getMessages}/${userId}`)
      .then((res) => {
        console.log("fetch messages: ", res.data);
        if (res.data.length === 0) return;
        const initialData = res.data.map((d) => ({ ...d }));
        const uniqConversation = [];
        const uniqConversationID = [];

        res.data.forEach((obj) => {
          const id = obj.conversation_id;
          if (!uniqConversationID.includes(id)) {
            uniqConversationID.push(id);
            uniqConversation.push({ ...obj });
          }
        });

        setInitData(initialData);
        setTotalConversation(uniqConversation);
        setCurConversationId(uniqConversation[0].conversation_id);
        setCurSubject(uniqConversation[0].subject);
        // generateMessages(initialData.map((d) => ({ ...d })));

        console.log("uniqConversation: ", uniqConversation);
        console.log("curConversationID: ", uniqConversation[0].conversation_id);
      })
      .catch((err) => {
        console.log("error in fetching messages: ", err);
      });
  }, []);

  useEffect(() => {
    let temp = initData.filter((d) => {
      return parseInt(d.conversation_id) === parseInt(curConversationId);
    });

    generateMessages(temp.map((d) => ({ ...d })));
  }, [curConversationId]);

  const handleSelectConversation = (e) => {
    console.log("handleSelectConversation: ");
    const curID = e.target.attributes.getNamedItem("cid").value;

    let tmp = "";
    let cache="";
    totalConversation.forEach((d) => {
      if (parseInt(d.conversation_id) === parseInt(curID)) {
        tmp = d.subject;
        cache = {...d}
      }
    });

    setCurConversationId(curID);
    setCurSubject(tmp);
    setCacheData(cache)
  };

  return (
    <div className="message__container">
      <div className="message__left">
        <Container>
          <div className="message__search">
            <input type="text"></input>
            <SearchIcon />
          </div>
        </Container>
        {totalConversation
          ? totalConversation.map((d, index) => {
              return (
                <div
                  className="message__email"
                  onClick={handleSelectConversation}
                  key={`c-${d.conversation_id}`}
                  cid={d.conversation_id}
                >
                  <img src={avator} />
                  <div cid={d.conversation_id}>
                    <div
                      className={"message__email__name"}
                      cid={d.conversation_id}
                      name="testing"
                    >
                      {d.sender_name}
                    </div>
                    <div
                      className={"message__email__title"}
                      cid={d.conversation_id}
                    >
                      {d.subject}
                    </div>
                    <div
                      className={"message__email__text"}
                      cid={d.conversation_id}
                    >
                      {d.message}
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <div className="message__right">
        <Container>
          <div className="message__actionContainer">
            <ComposeMsg></ComposeMsg>
            <ReplyMsg cacheData={cacheData}></ReplyMsg>
            <div className="message__btn">
              <Button variant="outlined">
                <DeleteForeverIcon />
              </Button>
            </div>
          </div>
        </Container>
        <Container>
          <div className="message__title">{curSubject}</div>
        </Container>
        {currectMsgs}
      </div>
    </div>
  );
};

export default Message;

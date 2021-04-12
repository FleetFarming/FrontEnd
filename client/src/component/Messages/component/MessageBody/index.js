import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import DeleteMsg from "../DeleteMsg/index.js"

const MessageBody = (props) => {
  const { message, sendDate, senderName, avator, messageId } = props;



  return (
    <div className="message__body">
      <div className="message__body__header">
        <img src={avator} />
        <div>{senderName}</div>
        <div style={{display: "flex", flexDirection:"row", alignItems: "center"}}>
          {sendDate}{" "}
          <DeleteMsg messageId={messageId}/>
        </div>
      </div>
      <div className="message__text">{message}</div>
    </div>
  );
};

export default MessageBody;

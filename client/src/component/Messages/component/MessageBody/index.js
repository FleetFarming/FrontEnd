import React from 'react';

const MessageBody = (props) => {
  const {message, sendDate, senderName, avator} = props
  return (

    <div className="message__body">
    <div className="message__body__header">
      <img src={avator} />
      <div>{senderName}</div>
      <div>{sendDate}</div>
    </div>
    <div className="message__text">
      {message}
    </div>
  </div>
  );
};

export default MessageBody;
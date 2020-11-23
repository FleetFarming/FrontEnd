import React from "react";

const UserPage = (props) => {
  const { userInfo, setViewUser } = props;
  return (
    <div>
      <div>This is userInfo Page. Coming Soon.</div>
      <br/>
      <div style={{cursor: "pointer"}} onClick={() => setViewUser(false)}>Go Back</div>
    </div>
  );
};

export default UserPage;

import React, {useState} from "react";

function User({Contributor}){
    const [username, count] = Contributor;
    return(
      <div>
          <h3>{username}: {count} Donations</h3>
      </div>
    );
}

export default User;
import React, {useState} from "react";

function Contributor({Contributor}){
    const [username, count] = Contributor;
    return(
      <div>
          <p>{username}: {count}</p>
      </div>
    );
}

export default Contributor;
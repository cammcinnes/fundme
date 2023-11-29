import React from "react";

function PersonalContribution({Contribution}){
    const [projectName, amount] = Contribution;
    return(
        <div style={{padding: "0.5em"}}>
            {projectName}: ${amount}
        </div>
    );
}

export default PersonalContribution;
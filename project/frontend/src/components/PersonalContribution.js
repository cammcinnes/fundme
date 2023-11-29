import React, {useState} from "react";

function PersonalContribution({Contribution}){
    const [projectName, amount] = Contribution;
    return(
        <div>
            {projectName}: ${amount}
        </div>
    );
}

export default PersonalContribution;
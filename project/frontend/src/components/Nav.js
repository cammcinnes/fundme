import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Welcome</Link></li>
                <li><Link to="/main">Projects</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/organizations">Organizations</Link></li>
                <li><Link to="/join">Project Donors</Link></li>
                <li><Link to="/selection">Project Searcher</Link></li>
                <li><Link to="/leaderboard">Top Contributors</Link></li>
                <li><Link to="/recurring">Recurring Contributors</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;

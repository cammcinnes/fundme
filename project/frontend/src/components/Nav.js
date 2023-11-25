import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Welcome</Link></li>
                <li><Link to="/main">Main</Link></li>
                <li><Link to="/organizations">Organizations</Link></li>
                <li><Link to="/projection">Projection</Link></li>
                <li><Link to="/join">Join</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;

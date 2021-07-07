import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        <Link to="/">Courses</Link>
                    </h1>
                    <nav>
                        <ul className="header--signedout">
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/signin">Sign In</Link></li>
                        </ul>
                    </nav>
                </div> 
            </header>
        )
    }
}

export default Header;
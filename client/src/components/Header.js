import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                <Link to="/">Courses</Link>
                </h1>
                <nav>
                    {/* {authUser ?
                    <React.Fragment>
                    <span>Welcom, {authUser.name}!</span>
                    <Link to="/signout">Sign Out</Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                    <Link className="signup" to="/signup">Sign Up</Link>
                    <Link className="signin" to="/signin">Sign In</Link>
                    </React.Fragment>
                    } */}
                </nav>
            </div>
        </header>
    )
}

export default Header;
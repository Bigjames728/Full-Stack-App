import React from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';

function NotFound() {
    return(
        <React.Fragment>
            <Header></Header>
            <main>
                <div className="wrap">
                    <h2>Not Found</h2>
                    <p>Sorry! We couldn't find the page you're looking for.</p>
                    <Link to="/">Back to home page.</Link>
                </div>
            </main>
        </React.Fragment>
    )
}

export default NotFound
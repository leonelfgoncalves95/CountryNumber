import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends React.Component{
    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    Country Number App
                </Link>
                <Nav className="mr-auto">
                      <Link to={"add"} className="nav-link">Add Number</Link>
                      <Link to={"list"} className="nav-link">List Numbers</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;
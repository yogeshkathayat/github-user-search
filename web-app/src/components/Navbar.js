import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{
    render(){
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
               <Link class="navbar-brand" to="/">Github Search Users</Link>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li class="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>

            </nav>

        )
    }
}


export default Navbar;
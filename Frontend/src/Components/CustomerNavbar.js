import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css'


import { Navbar,Nav,NavItem,Form,FormControl,Button,Modal} from 'react-bootstrap';
const CustomerNavbar = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand>Techies Airline</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/customer"> Home </Nav.Link>
                    <Nav.Link href=""> My Bookings  </Nav.Link>
                    <Nav.Link href=""> My Profile </Nav.Link>
                    <Nav.Link href=""> Logout </Nav.Link>
                </Nav>
                </Navbar>
        </div>
    )
}

export default CustomerNavbar

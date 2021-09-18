import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { setLogin } from '../Actions/LoginAction';
import { connect } from 'react-redux';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        localStorage.removeItem('Token');
        this.props.setLogin(false);
    }

    render() {

        return (
            <>
                <Link id='GoToMain' style={{ display: 'none' }} to="/">a</Link>

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link ><div onClick={() => { document.getElementById('GoToMain').click(); }}>Main</div></Nav.Link>
                        </Nav>
                        <Nav>
                                <NavDropdown title={'Token?'} id="collasible-nav-dropdown">
                                <NavDropdown.Item className="" onClick={this.handleClick}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

const mapStateToProps = state => ({
    Login: state.Login
});

export default connect(mapStateToProps, { setLogin })(Navigation);
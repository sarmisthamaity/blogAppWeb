import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';


const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to='/login' activeStyle>
                        Login
                    </NavLink>
                    <NavLink to='/signup' activeStyle>
                        Signup
                    </NavLink>
                    <NavLink to='/' activeStyle>
                        Homepage
                    </NavLink>
                    <NavLink to='/blog' activeStyle>
                        Blog
                    </NavLink>
                    <NavLink to='/blogComments' activeStyle>
                        ShowPost
                    </NavLink>
                    {/* <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>  */}
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                {/* <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn> */}
            </Nav>
        </>
    );
};

export default Navbar;
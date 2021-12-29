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
                    <NavLink to='/sign' activeStyle>
                        Signup
                    </NavLink>
                    <NavLink to='/profileimg' activeStyle>
                        CreateProfile
                    </NavLink>
                    <NavLink to='/blog' activeStyle>
                        CreateBlog
                    </NavLink>
                    <NavLink to='/' activeStyle>
                        AllBlogs
                    </NavLink>
                   
                    <NavLink to='/userprofile' activeStyle>
                        getProfile
                    </NavLink>



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
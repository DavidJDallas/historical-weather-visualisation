import React from 'react'
import {Link, NavLink, NavLinkProps} from 'react-router-dom'
import {Row, Col, Container} from 'react-bootstrap'
import './Dashboard.css'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon
  } from 'mdb-react-ui-kit';
  import {useState} from 'react';
  


const NavBar: React.FC = () => {
    const [showNav, setShowNav] = useState(false);
    
    interface CustomNavLinkProps extends NavLinkProps{
        activeClassName: string;
    }

    return(
        <>
        

  
        
        <MDBNavbar expand='lg' light >
           
            <MDBContainer fluid>
                <MDBNavbarNav style={{ display: 'flex', justifyContent: 'center' }}>
                <MDBNavbarItem>
                    <MDBNavbarLink>
                    <NavLink
                        to='/rain'
                        className='nav-link'
                        style={({ isActive, isPending }) => ({
                        color: isActive ? '#fd7f6f': 'black',
                        // backgroundColor: isActive ? '#7eb0d5' : 'black',
                        borderBottom: isActive ? '2px solid #7eb0d5' : '2px solid transparent',
                        fontSize: '2rem'
                        })}
                    >
                        Rain
                    </NavLink>
                    </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                    <MDBNavbarLink>
                    <NavLink
                        to='/temp'
                        className='nav-link'
                        style={({ isActive, isPending }) => ({
                        color: isActive ? '#fd7f6f' : 'black',
                        borderBottom: isActive ? '2px solid #7eb0d5' : '2px solid transparent',
                        fontSize: '2rem'
                        })}
                    >
                        Temperature
                    </NavLink>
                    </MDBNavbarLink>
                </MDBNavbarItem>              
                </MDBNavbarNav>
            </MDBContainer>
            </MDBNavbar>

          </>
    )
}

export default NavBar
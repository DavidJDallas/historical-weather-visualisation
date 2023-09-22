import React from 'react'
import {Link, NavLink, NavLinkProps} from 'react-router-dom'
import {Row, Col, Container} from 'react-bootstrap'
import './Dashboard.css'


const NavBar: React.FC = () => {

    interface CustomNavLinkProps extends NavLinkProps{
        activeClassName: string;
    }

    return(
        <div>
            <Container fluid={true}>
            <Row>
                <Col>
                <NavLink
                    className={({isActive, isPending}) =>
                    isPending ? 'Link-button' : isActive ? 'active-link' : 'Link-button'                
                }
                    to='/rain'
                >
                    Rain
                </NavLink>
              
               
                
                </Col>    
                <Col>
                   <NavLink
                    className={({isActive, isPending}) =>
                    isPending ? 'Link-button' : isActive ? 'active-link' : 'Link-button'                 
                    }
                    to='/temp'
                >
                    Temperature
                </NavLink>
                </Col>  
                <Col>
                <NavLink
                    className={({isActive, isPending}) =>
                    isPending ? 'Link-button' : isActive ? 'active-link' : 'Link-button'                 
                    }
                    to='/wind'
                >
                    Wind
                </NavLink>
                </Col>          
            </Row>
            </Container>
      
                
             
        </div>
    )
}

export default NavBar
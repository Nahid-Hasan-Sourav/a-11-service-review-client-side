import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { HiOutlineCamera } from 'react-icons/hi';

function Navbars() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to='/home' >
         <span className='fs-2 fw-bold me-2'>
         <HiOutlineCamera className='text-primary'></HiOutlineCamera>
         </span>
          <span className='text-danger fw-bold'>
           Flytographer
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-danger'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link className='text-white' as={Link} to='/home'>Home</Nav.Link>
            <Nav.Link  className='text-white' as={Link} to='/blog'>Blog</Nav.Link>
            <Nav.Link  className='text-white' as={Link} to='/login'>Login</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
import {Container,Nav,Navbar,Form} from 'react-bootstrap';
import { logout } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
function Navigation() {

    const navigate = useNavigate();
    const signout = async() => {
        try{
          await logout();
          navigate("/login");
        }catch(e)
        {
           console.log(e);
        }
        
    }

    return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Freelancer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Projects</Nav.Link>
            <Nav.Link href="#features">Profile</Nav.Link>
            
         

          </Nav>
          <Nav>
          <Nav.Link onClick={signout}>Logout</Nav.Link>
            </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default Navigation;
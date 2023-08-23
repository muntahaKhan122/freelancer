import { Container,Col,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { useState } from 'react';
import { login } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
function Login() {

    const navigate= useNavigate();
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    const signin = async(e) =>{
        e.preventDefault();

          try{
            const user= await login(email,pass);
            
             setEmail('');
             setPass('');

             navigate(`/profile/${user.uid}`); 
          } 
          catch(e)
          {
            console.log(e);
          }            
    }
  return (
<Container className="d-flex justify-content-center align-items-center vh-100">
      <Col xs={12} md={6} lg={4}>
        <div className="login-form">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
            </Form.Group>
            <Button variant="secondary" type="submit" onClick={signin} style={{marginTop:'20px'}}>
              Login
            </Button>
          </Form>
          <div className='link'>Don't already have an account? <Link to="/signup">Sign up</Link></div>

        </div>
      </Col>
    </Container>
  );
}

export default Login    ;
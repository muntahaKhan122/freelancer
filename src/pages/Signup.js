import { Container,Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { useState } from 'react';
import { signup } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
function Signup() {

    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [fName,setFName] = useState('');
    const [lName,setLName] = useState('');
    const navigate = useNavigate();

    const submitForm = async(e) =>{
        e.preventDefault();

       try{
        const user =await signup(email,pass,fName,lName);
        setEmail('');
        setPass('');
        setFName('');
        setLName('');
        navigate(`/profile-setup/${user.uid}`);            
       }
       catch(e){
        console.log(e);
       }
    }

return (
<Container className="d-flex justify-content-center align-items-center vh-100">
      <Col xs={12} md={6} lg={4}>
        <div className="login-form">

<Form onSubmit={submitForm}>

<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Alex" value={fName} onChange={(e)=>setFName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Russo" value={lName} onChange={(e)=>setLName(e.target.value)}/>
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitForm} >
        Signup
      </Button>
      <div className='link'>Already have an account? <Link to="/login">Log In</Link></div>
    </Form>
    </div>
      </Col>
    </Container>
  );
}

export default Signup;
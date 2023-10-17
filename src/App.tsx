import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type fields = {
  email: string,
  password: string
}

function App() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    let loginData = Object.assign({}, data); 
    console.log(loginData);

    axios.post("https://localhost:44309/api/Auth/Login", loginData).then(response=>{
      console.log(response)
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("expiration", response.data.data.expiration);

        navigate("/home");
      }else{
        alert(response.data.message);
      }
    }).catch(error=>{
      console.log(error)
      alert("Something went wrong :(");
    });
  };

  return (
    <div className="App">
      {/* <Button variant="warning">Primary</Button> */}

      <Container className="d-flex vh-100">
        <Row className='m-auto align-self-center'>
          <Col>
            <Card style={{ width: '27rem', backgroundColor: "#F4F6F6" }}>
              <Card.Body>
                <Card.Title className='mb-5'><h3>Login</h3></Card.Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className='d-flex align-self-start'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" {...register("email", { required: true })} />
                    <br />
                    {errors.email && <span style={{color:"red"}}>This field is required</span>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className='d-flex align-self-start'>Password</Form.Label>
                    <Form.Control type='password' {...register("password", { required: true })} />
                    <br />
                    {errors.password && <span style={{color:"red"}}>This field is required</span>}
                  </Form.Group>
                  <Button variant="primary" type='submit'>Login</Button>
                  
                </Form>


              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;

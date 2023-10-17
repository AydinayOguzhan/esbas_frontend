import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../navbarComponent";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

function CourseAddComponent() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    data.status = true;
    axios.post("https://localhost:44309/api/Courses/Add",data).then(response => {
      if (response.data.success) {
        navigate("/courses");
      } else {
        alert(response.data.message);
      }
    }).catch(error => {
      console.log(error);
      alert("Something went wrong :(");
    });
  }

  return (
    <div>
      <Navbar></Navbar>

      {
        <Container className="d-flex mt-5">
        <Row className='m-auto align-self-center'>
          <Col>
            <Card style={{ width: '80rem', backgroundColor: "#F4F6F6" }}>
              <Card.Body>
                <Card.Title className='mb-5'><h3>Update Student Details</h3></Card.Title>

                <Form onSubmit={handleSubmit(onSubmit)}>

                  <Row>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <Form.Group className="" controlId="name">
                        <Form.Label className='d-flex align-self-start'>Name</Form.Label>
                        <Form.Control type="text" placeholder="Example Name" {...register("name", { required: true })} />
                        <br />
                        {errors.name && <span style={{ color: "red" }}>This field is required</span>}
                      </Form.Group>

                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <Form.Group className="" controlId="description">
                        <Form.Label className='d-flex align-self-start'>Description</Form.Label>
                        <Form.Control type="text" placeholder="Example Name" {...register("description", { required: true })} />
                        <br />
                        {errors.description && <span style={{ color: "red" }}>This field is required</span>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" type='submit'>Save</Button>

                </Form>


              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      }


    </div>
  );
}

export default CourseAddComponent;

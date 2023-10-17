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
import { StudentDetails } from '../../models/studentDetails';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { Gender } from '../../models/gender';
import { MaritalStatus } from '../../models/maritalStatus';

//empty objects for init 
const sd: StudentDetails = {} as StudentDetails;

function StudentUpdateComponent() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [studentDetails, setStudentDetails] = useState<StudentDetails>(sd);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
  const [load, setLoad] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = (data: any) => {
    console.log(data)
    axios.put("https://localhost:44309/api/Auth/UpdateUser", data).then(response => {
      console.log(response);
      if (response.data.success) {
        navigate("/home");
      } else {
        alert(response.data.message);
      }
    }).catch(error => {
      console.log(error);
      alert("Something went wrong :(");
    });
  }

  useEffect(() => {
    getAllGenders();
    getAllMaritalStatuses();
    getStudentById();
  }, [])


  const getStudentById = () => {
    axios.get(`https://localhost:44309/api/Students/GetStudentDetailsByStudentId?studentId=${studentId}`).then(response => {
      console.log("student: ", response);
      if (response.data.success) {
        setStudentDetails(response.data.data);
        setLoad(true);
        return true;
      } else {
        alert(response.data.message);
        setLoad(false);
      }
    }).catch(error => {
      console.log(error);
      setLoad(false);
      alert("Something went wrong :(");
    });
  }

  const getAllGenders = () => {
    axios.get(`https://localhost:44309/api/Genders/GetAll`).then(response => {
      console.log("genders: ", response);
      if (response.data.success) {
        setGenders(response.data.data);
      } else {
        alert(response.data.message);
      }
    }).catch(error => {
      console.log(error);
      alert("Something went wrong :(");
    });
  }

  const getAllMaritalStatuses = () => {
    axios.get(`https://localhost:44309/api/MaritalStatuses/GetAll`).then(response => {
      console.log("marital statuses: ", response);
      if (response.data.success) {
        setMaritalStatuses(response.data.data);
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

      {load &&
        <Container className="d-flex mt-5">
          <Row className='m-auto align-self-center'>
            <Col>
              <Card style={{ width: '80rem', backgroundColor: "#F4F6F6" }}>
                <Card.Body>
                  <Card.Title className='mb-5'><h3>Update Student Details</h3></Card.Title>

                  <Form onSubmit={handleSubmit(onSubmit)}>

                    <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="" controlId="firstName">
                          <Form.Label className='d-flex align-self-start'>First Name</Form.Label>
                          <Form.Control defaultValue={studentDetails.firstName} type="text" placeholder="Example Name" {...register("firstName", { required: true })} />
                          <br />
                          {errors.firstName && <span style={{ color: "red" }}>This field is required</span>}
                        </Form.Group>

                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="" controlId="lastName">
                          <Form.Label className='d-flex align-self-start'>Last Name</Form.Label>
                          <Form.Control defaultValue={studentDetails.lastName} type="text" placeholder="Example Name" {...register("lastName", { required: true })} />
                          <br />
                          {errors.lastName && <span style={{ color: "red" }}>This field is required</span>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={4} md={4} sm={12} xs={12}>
                        <Form.Group className="" controlId="username">
                          <Form.Label className='d-flex align-self-start'>Username</Form.Label>
                          <Form.Control defaultValue={studentDetails.username} type="text" placeholder="Example Username" {...register("username", { required: true })} />
                          <br />
                          {errors.username && <span style={{ color: "red" }}>This field is required</span>}
                        </Form.Group>

                      </Col>
                      <Col lg={4} md={4} sm={12} xs={12}>
                        <Form.Group className="" controlId="email">
                          <Form.Label className='d-flex align-self-start'>Email</Form.Label>
                          <Form.Control defaultValue={studentDetails.email} type="email" placeholder="example@gmail.com" {...register("email", { required: true })} />
                          <br />
                          {errors.email && <span style={{ color: "red" }}>This field is required</span>}
                        </Form.Group>
                      </Col>

                      <Col lg={4} md={4} sm={12} xs={12}>
                        <Form.Group className="" controlId="contactNumber">
                          <Form.Label className='d-flex align-self-start'>Contact Number</Form.Label>
                          <Form.Control defaultValue={studentDetails.contactNumber} type="number" placeholder="05578483293" {...register("contactNumber", { required: true })} />
                          <br />
                          {errors.contactNumber && <span style={{ color: "red" }}>This field is required</span>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="" controlId="gender">
                          <Form.Label className='d-flex align-self-start'>First Name</Form.Label>
                          <Form.Select aria-label="Default select example" {...register("genderId", { required: true })}>
                            {/* <option>Select Gender</option> */}
                            {genders.length > 0 && genders.map(gender => (
                              <option selected={gender.id === studentDetails.genderId} value={gender.id}>{gender.name}</option>
                            ))}
                          </Form.Select>

                          <br />
                          {errors.gender && <span style={{ color: "red" }}>This field is required</span>}
                        </Form.Group>

                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="" controlId="maritalStatus">
                          <Form.Label className='d-flex align-self-start'>Marital Status</Form.Label>

                          <Form.Select aria-label="Default select example" {...register("maritalStatusId", { required: true })}>
                            {/* <option>Select Marital Status</option> */}
                            {maritalStatuses.length > 0 && maritalStatuses.map(maritalStatus => (
                              <option selected={maritalStatus.id === studentDetails.maritalStatusId} value={maritalStatus.id}>{maritalStatus.name}</option>
                            ))}
                          </Form.Select>
                          <br />
                          {errors.maritalStatus && <span style={{ color: "red" }}>This field is required</span>}
                        </Form.Group>
                      </Col>
                    </Row>


                    <Button variant="primary" type='submit'>Save</Button>

                  </Form>


                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>}


    </div>
  );
}

export default StudentUpdateComponent;

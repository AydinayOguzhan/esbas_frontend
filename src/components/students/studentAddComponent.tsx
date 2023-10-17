import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../navbarComponent";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Gender } from '../../models/gender';
import { MaritalStatus } from '../../models/maritalStatus';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";


function StudentAdd() {
    const navigate = useNavigate();

    const [genders, setGenders] = useState<Gender[]>([]);
    const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
    const [genderLoad, setGenderLoad] = useState(false);
    const [maritalStatusLoad, setMaritalStatusLoad] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        console.log(data)
        if (data.password === data.passwordAgain) {
            setPasswordError(false);
            delete data["passwordAgain"];
            axios.post("https://localhost:44309/api/Auth/Register", data).then(response=> {
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
        }else{
            setPasswordError(true);
        }
    }

    useEffect(() => {
        getAllGenders();
        getAllMaritalStatuses();
    }, [])

    const getAllGenders = () => {
        axios.get(`https://localhost:44309/api/Genders/GetAll`).then(response => {
            console.log("genders: ", response);
            if (response.data.success) {
                setGenders(response.data.data);
                setGenderLoad(true);
            } else {
                alert(response.data.message);
                setGenderLoad(false);
            }
        }).catch(error => {
            console.log(error);
            alert("Something went wrong :(");
            setGenderLoad(false);
        });
    }

    const getAllMaritalStatuses = () => {
        axios.get(`https://localhost:44309/api/MaritalStatuses/GetAll`).then(response => {
            console.log("marital statuses: ", response);
            if (response.data.success) {
                setMaritalStatuses(response.data.data);
                setMaritalStatusLoad(true);
            } else {
                alert(response.data.message);
                setMaritalStatusLoad(false);
            }
        }).catch(error => {
            console.log(error);
            alert("Something went wrong :(");
            setMaritalStatusLoad(false);
        });
    }

    return (
        <div>
            <Navbar></Navbar>

            {genderLoad && maritalStatusLoad &&
                <Container className="d-flex mt-5">
                    <Row className='m-auto align-self-center'>
                        <Col>
                            <Card style={{ width: '80rem', backgroundColor: "#F4F6F6" }}>
                                <Card.Body>
                                    <Card.Title className='mb-5'><h3>Add New Student</h3></Card.Title>

                                    <Form onSubmit={handleSubmit(onSubmit)}>

                                        <Row>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Form.Group className="" controlId="firstName">
                                                    <Form.Label className='d-flex align-self-start'>First Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Example Name" {...register("firstName", { required: true })} />
                                                    <br />
                                                    {errors.firstName && <span style={{ color: "red" }}>This field is required</span>}
                                                </Form.Group>

                                            </Col>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Form.Group className="" controlId="lastName">
                                                    <Form.Label className='d-flex align-self-start'>Last Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Example Name" {...register("lastName", { required: true })} />
                                                    <br />
                                                    {errors.lastName && <span style={{ color: "red" }}>This field is required</span>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={4} md={4} sm={12} xs={12}>
                                                <Form.Group className="" controlId="username">
                                                    <Form.Label className='d-flex align-self-start'>Username</Form.Label>
                                                    <Form.Control type="text" placeholder="Example Username" {...register("username", { required: true })} />
                                                    <br />
                                                    {errors.username && <span style={{ color: "red" }}>This field is required</span>}
                                                </Form.Group>

                                            </Col>
                                            <Col lg={4} md={4} sm={12} xs={12}>
                                                <Form.Group className="" controlId="email">
                                                    <Form.Label className='d-flex align-self-start'>Email</Form.Label>
                                                    <Form.Control type="email" placeholder="example@gmail.com" {...register("email", { required: true })} />
                                                    <br />
                                                    {errors.email && <span style={{ color: "red" }}>This field is required</span>}
                                                </Form.Group>
                                            </Col>

                                            <Col lg={4} md={4} sm={12} xs={12}>
                                                <Form.Group className="" controlId="contactNumber">
                                                    <Form.Label className='d-flex align-self-start'>Contact Number</Form.Label>
                                                    <Form.Control type="number" placeholder="05578483293" {...register("contactNumber", { required: true })} />
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
                                                        <option value={0}>Select Gender</option>
                                                        {genders.length > 0 && genders.map(gender => (
                                                            <option value={gender.id}>{gender.name}</option>
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
                                                        <option value={0}>Select Marital Status</option>
                                                        {maritalStatuses.length > 0 && maritalStatuses.map(maritalStatus => (
                                                            <option value={maritalStatus.id}>{maritalStatus.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                    <br />
                                                    {errors.maritalStatus && <span style={{ color: "red" }}>This field is required</span>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Form.Group className="" controlId="password">
                                                    <Form.Label className='d-flex align-self-start'>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="password" {...register("password", { required: true })} />
                                                    <br />
                                                    {errors.password && <span style={{ color: "red" }}>This field is required</span>}
                                                </Form.Group>

                                            </Col>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Form.Group className="" controlId="passwordAgain">
                                                    <Form.Label className='d-flex align-self-start'>Password Again</Form.Label>
                                                    <Form.Control type="password" placeholder="Example Name" {...register("passwordAgain", { required: true })} />
                                                    <br />
                                                    {errors.passwordAgain && <span style={{ color: "red" }}>This field is required</span>}
                                                </Form.Group>
                                            </Col>

                                            {passwordError && <span style={{ color: "red" }}>Passwords not match</span>}
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

export default StudentAdd;

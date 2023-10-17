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
import Table from 'react-bootstrap/Table';
import { Student } from '../../models/student';


function Home() {
    const navigate = useNavigate();
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        getAllStudents();
    }, [])


    const getAllStudents = () => {
        axios.get("https://localhost:44309/api/Students/GetAll").then(response => {
            console.log(response);
            if (response.data.success) {
                setStudents(response.data.data);
            } else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.log(error);
            alert("Something went wrong :(");
        });
    }

    const deleteStudent = (studentId: number) => {
        axios.delete(`https://localhost:44309/api/Students/Delete?studentId=${studentId}`).then(response => {
            console.log(response);
            if (response.data.success) {
                window.location.reload();
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

            <div className='d-flex'>
                <Button variant='success' className='m-2' onClick={() => navigate("/studentAdd")}>Add New Student</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Update</th>
                        <th>Select Course</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 && students.map(student => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.username}</td>
                            <td>{student.email}</td>
                            <td><Button variant='success' onClick={() => navigate(`/studentUpdate/${student.id}`)}>Update</Button></td>
                            <td><Button variant='primary' onClick={() => navigate(`/courseSelection/${student.id}`)}>Select</Button></td>
                            <td><Button variant='danger' onClick={() => deleteStudent(student.id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>
    );
}

export default Home;

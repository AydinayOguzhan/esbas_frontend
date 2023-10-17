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
import { Course } from '../../models/course';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Table from 'react-bootstrap/Table';


function StudentCourseAddComponent() {
    const navigate = useNavigate();
    const { studentId } = useParams();

    const [courses, setCourses] = useState<Course[]>([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        getCourses();
    }, [])

    const getCourses = () => {
        axios.get(`https://localhost:44309/api/Courses/GetAll`).then(response => {
            if (response.data.success) {
                setCourses(response.data.data);
                setLoad(true);
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

    const selectCourse = (courseId: number) => {
        const data = { studentId: studentId, courseId: courseId };
        axios.post("https://localhost:44309/api/StudentCourses/Add", data).then(response => {
            console.log(response);
            if (response.data.success) {
                navigate(`/courseSelection/${studentId}`);
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
                <>
                    <h3>Select Course</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length > 0 && courses.map(course => (
                                <tr key={course.id}>
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>
                                    <td><Button variant='success' onClick={() => {selectCourse(course.id)}} >Select</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            }



        </div>
    );
}

export default StudentCourseAddComponent;
